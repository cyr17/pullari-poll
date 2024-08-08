import React, { useState, useEffect } from 'react';
import {Modal,Navbar} from 'flowbite-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import { Button } from 'flowbite-react';

const App = () => {
  const [films, setFilms] = useState([
    { id: 1, title: 'BARCA VS REAL', url: 'https://www.youtube.com/embed/tpIyMNGK07g?si=LyjDFHT7k188gVQV' },
    { id: 2, title: 'CITY VS CHELSEA', url: 'https://www.youtube.com/embed/I-dHFeNM6pI?si=YLxToue6NkMf5vQN' },
    // Add more films here
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOtpStage, setIsOtpStage] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [selectedFilmId, setSelectedFilmId] = useState(null);
  const API_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

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
    setIsVerified(true);
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
    <div className='p-8'>
      <div className='container mx-auto pl-0'>
      
      <Navbar fluid rounded className='bg-gray-200'>
        <Navbar.Brand className='cursor-pointer'> 
          <img alt="Pullari Short Film Competition" src= "/Logo-embossed.jpg" className="mr-3 h-8 sm:h-12 rounded-full"/>
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                Pullari Short Film Competition
          </span>

        </Navbar.Brand>
        
      </Navbar>
      <div>
        {films.map((film) => (
          <div key={film.id}>
            <h2>{film.title}</h2>
            <iframe src={film.url} title={film.title} width="560" height="315" frameBorder="0" allowFullScreen></iframe>
            <Button onClick={() => openModal(film.id)}>Vote</Button>
          </div>
        ))}
      </div>
      <Modal show={isModalOpen} onClose={closeModal}>
        <Modal.Header>User Verification</Modal.Header>
        <Modal.Body>
        {!isVerified? (
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Pullari Short Film Competition"
              src= "/Logo-embossed.jpg" 
              className="mx-auto h-15 sm:h-48 rounded-full "
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" method="POST" className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Full name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                    Phone Number
                  </label>
                  
                </div>
                <div className="mt-2">
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter your phone number"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              
              {!isOtpStage || !phoneNumber? (
              
              <div>
                <Button
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={handleSendOtp}
                >
                  Verify Number

                </Button>
              </div>
              ) : (
                <div>
                  <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                    Enter OtP
                  </label>
                  
                </div>
                <div className="mt-2">
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <Button
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={handleVerifyOtp}
                >
                  Verify OTP

                </Button>
              </div>
                </div>
                  
              )}
            </form>
          </div>
        </div>
        ) : (
          <div className="flex flex-col items-center">
            <h1 className='text-2xl font-bold'>Verified User</h1>
          </div>
        )}
        </Modal.Body>
      </Modal>
      <ToastContainer />
      </div>
    </div>
  );
};

export default App;