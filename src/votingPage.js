// VotingPage.js
import React, { useState } from 'react';
import { Modal, Navbar, Button } from 'flowbite-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Film from './components/Film'; // Import the Film component

const VotingPage = () => {
  const [films, setFilms] = useState([
    { id: 1, title: 'BARCA VS REAL', url: 'https://www.youtube.com/embed/tpIyMNGK07g?si=LyjDFHT7k188gVQV' },
    { id: 2, title: 'CITY VS CHELSEA', url: 'https://www.youtube.com/embed/I-dHFeNM6pI?si=YLxToue6NkMf5vQN' },
    { id: 3, title: 'PREMAM', url: 'https://www.youtube.com/embed/yjaFvFuQ-QM?si=GzjXcLTxr8rpGxQI"' },
    { id: 4, title: 'KUMBALANGI NIGHTS', url: 'https://www.youtube.com/embed/bNyKd0PUx04?si=A-8wRwQ54z6HdxZ1' },
    { id: 5, title: 'DRISHYAM', url: 'https://www.youtube.com/embed/AuuX2j14jms?si=Q9J9Z9JzQ9K9J9'},
    { id: 6, title: 'KALY', url: 'https://www.youtube.com/embed/1Q0Z5Y4Y4Zo?si=Q9J9Z9JzQ9K9J9'},
    { id: 7, title: 'ANGAMALY DIARIES', url: 'https://www.youtube.com/embed/9mRG1GVxtkY?si=Cku0LwmHIjIeAC34'},
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
    <div className='bg-gray-100 py-8'>
      <div className='container mx-auto mt-8'>
        <Navbar fluid rounded className='bg-gray-200'>
          <Button>Vote</Button>
        </Navbar>
        <img
          className="w-full max-w-full rounded-lg shadow-lg mt-4"
          src="/PSFF Banner.jpg"
          alt="Sponsor"
        />
        <div className="text-center">
          <p className="text-lg text-center text-gray-600 mb-8">
            Step into a world of cinematic wonders and cast your vote for the most captivating film!
          </p>
          <a
            className="inline-block text-blue-700 font-bold py-2 px-4 hover:underline transition duration-300"
            href="/gallery/967205/ranking/111448"
            target="_self"
          >
            View Ranking
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {films.map((film) => (
            <Film key={film.id} film={film} onVote={openModal} /> // Use the Film component
          ))}
        </div>
        <Modal show={isModalOpen} onClose={closeModal}>
          <Modal.Header>User Verification</Modal.Header>
          <Modal.Body>
            {!isVerified ? (
              <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <img
                    alt="Pullari Short Film Competition"
                    src="/Logo-embossed.jpg"
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
                    {!isOtpStage || !phoneNumber ? (
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

export default VotingPage;