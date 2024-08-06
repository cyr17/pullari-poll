const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

let otpStore = {};
let votes = {};
let verifiedUsers = {};
// verified users. append '+61420988443'


const userVotes = {}; // Track the last vote cast by each verified user

app.post('/send-otp', (req, res) => {
  const { phoneNumber } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[phoneNumber] = otp;

  client.messages.create({
    body: `Your OTP is ${otp}`,
    from: '+12512612372',
    to: phoneNumber
  }).then(message => res.send({ success: true, messageSid: message.sid }))
    .catch(error => res.status(500).send({ success: false, error }));
});

app.post('/verify-otp', (req, res) => {
  const { phoneNumber, otp } = req.body;
  if (otpStore[phoneNumber] === otp) {
    delete otpStore[phoneNumber];
    verifiedUsers[phoneNumber] = true; // Mark user as verified
    res.send({ success: true });
  } else {
    res.status(400).send({ success: false, message: 'Invalid OTP' });
  }
});

app.post('/vote', (req, res) => {
    const { phoneNumber, filmId } = req.body;
    console.log(`Vote request from: ${phoneNumber} for filmId: ${filmId}`);
    console.log(votes);
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

  res.send({ success: true });
});

app.get('/results', (req, res) => {
  // Your code for handling /results route
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});