import React, { useState, useEffect } from 'react';
import OtpInput from './components/OtpInput';
import Film from './components/Film';
import axios from 'axios';

const App = () => {
  const [films, setFilms] = useState([
    { id: 1, title: 'BARCA VS REAL', url: 'https://www.youtube.com/embed/tpIyMNGK07g?si=LyjDFHT7k188gVQV' },
    { id: 2, title: 'CITY VS CHELSEA', url: 'https://www.youtube.com/embed/I-dHFeNM6pI?si=YLxToue6NkMf5vQN' },
    // Add more films here
  ]);
  const [results, setResults] = useState({});
  const [isVerified, setIsVerified] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [selectedFilmId, setSelectedFilmId] = useState(null);
  const API_BASE_URL = 'https://pullaripollserver.vercel.app';

  useEffect(() => {
    if (isVerified && selectedFilmId) {
      handleVote(selectedFilmId);
    }
  }, [isVerified, selectedFilmId]);

  const handleSendOtp = async (filmId) => {
    try {
      console.log(`Sending OTP for filmId: ${filmId}`);
      const response = await axios.post(`${API_BASE_URL}/send-otp`, { phoneNumber });
      console.log(response.data);
      setSelectedFilmId(filmId);
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/verify-otp`, { phoneNumber, otp });
      if (response.data.success) {
        setIsVerified(true);
      } else {
        console.error('OTP verification failed');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  const handleVote = async (filmId) => {
    try {
      console.log(`Voting for filmId: ${filmId}`);
      const response = await axios.post(`${API_BASE_URL}/vote`, { filmId, phoneNumber });
      console.log(response.data);
      // Update results or handle response as needed
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  return (
    <div>
      <h1>Film Voting</h1>
      <div>
        {films.map((film) => (
          <div key={film.id}>
            <h2>{film.title}</h2>
            <iframe src={film.url} title={film.title} width="560" height="315" frameBorder="0" allowFullScreen></iframe>
            <button onClick={() => handleSendOtp(film.id)}>Vote</button>
          </div>
        ))}
      </div>
      <div>
        <h2>Enter Phone Number</h2>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter your phone number"
        />
      </div>
      {selectedFilmId && (
        <div>
          <h2>Enter OTP</h2>
          <OtpInput value={otp} onChange={setOtp} />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        </div>
      )}
    </div>
  );
};

export default App;