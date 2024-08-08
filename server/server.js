require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const twilio = require('twilio');

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'https://pullari-poll.vercel.app', // your front-end URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// mongoose.connect('mongodb://localhost:27017/votingApp', { useNewUrlParser: true, useUnifiedTopology: true });

// const userSchema = new mongoose.Schema({
//   name: String,
//   phoneNumber: String,
//   vote: String,
//   otp: String
// });

// const User = mongoose.model('User', userSchema);

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

let otpStore = {};
let votes = {};
let verifiedUsers = {};

// Track the last vote cast by each verified user
const userVotes = {};

// Define routes
app.options('*', cors(corsOptions)); // preflight requests

app.post('/send-otp', cors(corsOptions), (req, res) => {
  const { phoneNumber } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[phoneNumber] = otp;

  client.messages.create({
    body: `Your OTP is ${otp}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phoneNumber
  }).then(message => res.send({ success: true, messageSid: message.sid }))
    .catch(error => res.status(500).send({ success: false, error }));
});

app.post('/verify-otp', cors(corsOptions), (req, res) => {
  const { phoneNumber, otp } = req.body;
  if (otpStore[phoneNumber] === otp) {
    delete otpStore[phoneNumber];
    verifiedUsers[phoneNumber] = true; // Mark user as verified
    console.log(`User verified: ${phoneNumber}`); // Log verification
    res.send({ success: true });
  } else {
    res.status(400).send({ success: false, message: 'Invalid OTP' });
  }
});

app.get('/is-verified', cors(corsOptions), (req, res) => {
  const { phoneNumber } = req.query;
  if (verifiedUsers[phoneNumber]) {
    res.send({ success: true, verified: true });
  } else {
    res.send({ success: false, verified: false });
  }
});

app.post('/vote', cors(corsOptions), (req, res) => {
  const { phoneNumber, filmId } = req.body;
  console.log(`Vote request from: ${phoneNumber} for filmId: ${filmId}`);
  
  if (!verifiedUsers[phoneNumber]) {
    console.log(`User not verified: ${phoneNumber}`);
    return res.status(403).send({ success: false, message: 'User not verified' });
  }

  // If the user has already voted, decrement the previous vote
  if (userVotes[phoneNumber]) {
    const previousVote = userVotes[phoneNumber];
    votes[previousVote] -= 1;
  }

  // Record the new vote
  userVotes[phoneNumber] = filmId;
  if (!votes[filmId]) {
    votes[filmId] = 0;
  }
  votes[filmId] += 1;
  console.log(votes);

  res.send({ success: true });
});

app.get('/results', cors(corsOptions), (req, res) => {
  res.send(votes);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
