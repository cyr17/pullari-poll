require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const twilio = require('twilio');

const app = express();


const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    phoneNumber: {type: String, required: true, unique: true},
    otp: {type: String, default: ''},
    vote: {type: String, default: ''},
    isVerified: {type: Boolean, default: false}
}, 
{collection: 'users'}
);

const User = mongoose.model('User', userSchema);

const {ObjectId} = mongoose.Schema.Types;

const voteSchema = new mongoose.Schema({
    user: {type: ObjectId, ref: 'User'},
    filmId: {type: String, required: true}
});

const Vote = mongoose.model('Vote', voteSchema);

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
  const { userName,phoneNumber } = req.body;
  
  //changing phone number format to +61 replace the first char if 0 with +61
  const formattedPhoneNumber = phoneNumber.startsWith('0') ? phoneNumber.replace('0', '+61') : phoneNumber;
  console.log("LOGIN",formattedPhoneNumber,userName);
  
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const message = `Your OTP to verify your vote is ${otp}`;

  try{
    
      const user = await User.findOne({phoneNumber: phoneNumber});
      if(user){
        user.otp = otp;
        await user.save();
        console.log("UPDATED",user);
      }
      else{
        const newUser = new User();
        newUser.name = userName;
        newUser.phoneNumber= formattedPhoneNumber,
        newUser.otp = otp;
        await newUser.save();
        console.log("SAVEDD",newUser);
      }

    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: formattedPhoneNumber
    });
    
    res.send({success:true});
  }
  catch(error){
    console.log(error);
    res.status(500).send({success:false,error});
  }
});

app.post('/verify-otp', cors(corsOptions), async (req, res) => {
  const { phoneNumber, otp } = req.body;

    try {
      const user = await User.findOne({phoneNumber: phoneNumber});
      if ( user.otp === otp ) {
        user.isVerified = true;
        await user.save();
        res.send({ success: true });
      } else {
        res.send({ success: false, error: 'Invalid OTP' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false, error });
    }
});

app.get('/is-verified', cors(corsOptions), async (req, res) => {
  const { phoneNumber } = req.query;
  try {
    const user = await User.findOne({ phoneNumber: phoneNumber });
    res.send({ success: true, verified: user.isVerified });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error });
  }
}
);

app.post('/vote', cors(corsOptions), async (req, res) => {
  const { phoneNumber, filmId } = req.body;
  try {
    const user = await User.findOne({ phoneNumber: phoneNumber });
    if (user.isVerified) {
      user.vote = filmId;
      await user.save();

      const vote = new Vote();
      vote.user = user._id;
      vote.filmId = filmId;
      await vote.save();

      res.send({ success: true });
    } else {
      res.send({ success: false, error: 'User not verified' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error });
  }
}
);

app.get('/results', cors(corsOptions), async (req, res) => {
  try {
    const votes = await Vote.find({});
    const results = {};
    votes.forEach(vote => {
      if (results[vote.filmId]) {
        results[vote.filmId]++;
      } else {
        results[vote.filmId] = 1;
      }
    });
    res.send({ success: true, results });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error });
  }
}
);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});