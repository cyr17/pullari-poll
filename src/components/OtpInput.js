import React, { useState } from 'react';
import axios from 'axios';

const OtpInput = ({ onVerify }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState('');
  const API_BASE_URL='https://pullaripollserver.vercel.app';
  const sendOtp = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/results`);
      console.log('Fetched results:', response.data);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
    try {
      await axios.post(
        `${API_BASE_URL}/send-otp`,
        { phoneNumber },
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }
      );
      setIsOtpSent(true);
      setError('');
    } catch (error) {
      console.error('Error sending OTP:', error);
      setError('Failed to send OTP. Please try again.');
    }
  };
  
  const verifyOtp = async () => {
    try {
      await axios.post(
        `${API_BASE_URL}/verify-otp`,
        { phoneNumber, otp },
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json', // Ensure content type is set to JSON
            'Access-Control-Allow-Origin': 'https://pullari-poll.vercel.app', // Replace with your front-end URL
            // 'Access-Control-Allow-Origin': '*', // Usually set on the server
            // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization', // Usually set on the server
            // 'Access-Control-Request-Method': 'POST', // Usually set on the server
            // Add any other headers you need for your API here
          }
        }
      );
      onVerify(phoneNumber);
      setError('');
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setError('Invalid OTP. Please try again.');
    }
  };

  return (
    <div>
      <h2>Verify Your Phone Number</h2>
      <input
        type="text"
        placeholder="Enter phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={sendOtp}>Send OTP</button>
      {isOtpSent && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default OtpInput;