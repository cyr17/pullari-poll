import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const App = () => {
  const [films, setFilms] = useState([
    { id: 1, title: 'BARCA VS REAL', url: 'https://www.youtube.com/embed/tpIyMNGK07g?si=LyjDFHT7k188gVQV' },
    { id: 2, title: 'CITY VS CHELSEA', url: 'https://www.youtube.com/embed/I-dHFeNM6pI?si=YLxToue6NkMf5vQN' },
    // Add more films here
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOtpStage, setIsOtpStage] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [selectedFilmId, setSelectedFilmId] = useState(null);
  const API_BASE_URL = 'https://pullaripollserver.vercel.app';

  const handleSendOtp = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/send-otp`, { phoneNumber });
      console.log(response.data);
      setIsOtpStage(true);
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/verify-otp`, { phoneNumber, otp });
      if (response.data.success) {
        setIsModalOpen(false);
        toast.success('Verification successful!');
        handleVote(selectedFilmId);
      } else {
        console.error('OTP verification failed');
        toast.error('OTP verification failed');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error('Error verifying OTP');
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

  const openModal = (filmId) => {
    setSelectedFilmId(filmId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsOtpStage(false);
    setPhoneNumber('');
    setOtp('');
  };

  return (
    <div>
      <h1>Film Voting</h1>
      <div>
        {films.map((film) => (
          <div key={film.id}>
            <h2>{film.title}</h2>
            <iframe src={film.url} title={film.title} width="560" height="315" frameBorder="0" allowFullScreen></iframe>
            <button onClick={() => openModal(film.id)}>Vote</button>
          </div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="OTP Verification">
        {!isOtpStage ? (
          <div>
            <h2>Enter Phone Number</h2>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
            />
            <button onClick={handleSendOtp}>Send OTP</button>
          </div>
        ) : (
          <div>
            <h2>Enter OTP</h2>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
            />
            <button onClick={handleVerifyOtp}>Verify OTP</button>
          </div>
        )}
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default App;