require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const twilio = require('twilio');

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.ALLOWED_ORIGIN, // your front-end URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
  name: String,
  phoneNumber: { type: String, unique: true }
});

const otpSchema = new mongoose.Schema({
  phoneNumber: { type: String, unique: true },
  otp: String
});

const verifiedUserSchema = new mongoose.Schema({
  phoneNumber: { type: String, unique: true }
});

const voteSchema = new mongoose.Schema({
  phoneNumber: { type: String, unique: true },
  filmId: String
});

const User = mongoose.model('User', userSchema);
const Otp = mongoose.model('Otp', otpSchema);
const VerifiedUser = mongoose.model('VerifiedUser', verifiedUserSchema);
const Vote = mongoose.model('Vote', voteSchema);

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Define routes
app.options('*', cors(corsOptions)); // preflight requests

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow all origins, change '*' to specific origin if needed
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  res.send('Connected to Server!');
});

app.post('/send-otp', cors(corsOptions), async (req, res) => {
  const { phoneNumber } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    await Otp.findOneAndUpdate({ phoneNumber }, { otp }, { upsert: true, new: true });
    await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber
    });
    res.send({ success: true });
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
});

app.post('/verify-otp', cors(corsOptions), async (req, res) => {
  const { phoneNumber, otp } = req.body;

  try {
    const otpRecord = await Otp.findOne({ phoneNumber });
    if (otpRecord && otpRecord.otp === otp) {
      await Otp.deleteOne({ phoneNumber });
      await VerifiedUser.findOneAndUpdate({ phoneNumber }, {}, { upsert: true, new: true });
      console.log(`User verified: ${phoneNumber}`);
      res.send({ success: true });
    } else {
      res.status(400).send({ success: false, message: 'Invalid OTP' });
    }
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
});

app.get('/is-verified', cors(corsOptions), async (req, res) => {
  const { phoneNumber } = req.query;

  try {
    const verifiedUser = await VerifiedUser.findOne({ phoneNumber });
    if (verifiedUser) {
      res.send({ success: true, verified: true });
    } else {
      res.send({ success: false, verified: false });
    }
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
});

app.post('/vote', cors(corsOptions), async (req, res) => {
  const { phoneNumber, filmId } = req.body;
  console.log(`Vote request from: ${phoneNumber} for filmId: ${filmId}`);

  try {
    const verifiedUser = await VerifiedUser.findOne({ phoneNumber });
    if (!verifiedUser) {
      console.log(`User not verified: ${phoneNumber}`);
      return res.status(403).send({ success: false, message: 'User not verified' });
    }

    const existingVote = await Vote.findOne({ phoneNumber });
    if (existingVote) {
      await Vote.updateOne({ phoneNumber }, { filmId });
    } else {
      await Vote.create({ phoneNumber, filmId });
    }

    res.send({ success: true });
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
});

app.get('/results', cors(corsOptions), async (req, res) => {
  try {
    const votes = await Vote.aggregate([
      { $group: { _id: "$filmId", count: { $sum: 1 } } }
    ]);
    res.send(votes);
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});