import React, { useState } from 'react';
import axios from 'axios';

const OtpInput = ({ onVerify }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState('');
  const API_BASE_URL='https://pullariserver.vercel.app';
  const sendOtp = async () => {
    try {
      await axios.post(`${API_BASE_URL}/send-otp`, { phoneNumber });
      setIsOtpSent(true);
      setError('');
    } catch (error) {
      console.error('Error sending OTP:', error);
      setError('Failed to send OTP. Please try again.');
    }
  };

  const verifyOtp = async () => {
    try {
      await axios.post(`${API_BASE_URL}/verify-otp`, { phoneNumber, otp });
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