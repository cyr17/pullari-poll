// VotingPage.js
import React, { useState } from 'react';
import { Modal, Navbar, Button } from 'flowbite-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import NavbarComponent from './NavbarComponent';
import { DialogBasicFilm } from './components/dialogBasicFilm';
const VotingPage = () => {
  const [films, setFilms] = useState([
    { id: 1, title: 'SPADIKAM', url: 'https://www.youtube.com/embed/349z-tk5RUM?si=X1eaf7_0YzI-HTX9' ,description: 'A Cult Classic of a movie '},
    { id: 2, title: 'NEW DELHI', url: 'https://www.youtube.com/embed/uB_S8Uf0n4U?si=zjQTGBf170V2aWGX', description: 'A gripping thriller that keeps you guessing until the very end.' },
    { id: 3, title: 'NARASIMHAM', url: 'https://www.youtube.com/embed/Z3g5qGQK7eI?si=_VMGz8gExpZbXuW1', description: 'A high-stakes football match between two fierce rivals.' },
    { id: 4, title: 'AMARAM', url: 'https://www.youtube.com/embed/Xqn4QaDz1Wo?si=Of0l7WQirryNpW8G', description: 'A romantic drama that explores the highs and lows of a passionate relationship.' },
    { id: 5, title: 'DEVADOOTHAN', url: 'https://www.youtube.com/embed/jb5FMCr1rSc?si=Y3yNVb9eF_Y0A72T', description: 'A romantic drama that explores the highs and lows of a passionate relationship.' },
    { id: 6, title: 'PREMAM', url: 'https://www.youtube.com/embed/yjaFvFuQ-QM?si=GzjXcLTxr8rpGxQI"', description: 'A romantic drama that explores the highs and lows of a passionate relationship.' },
    { id: 7, title: 'KUMBALANGI NIGHTS', url: 'https://www.youtube.com/embed/bNyKd0PUx04?si=A-8wRwQ54z6HdxZ1' , description: 'A heartwarming tale of family, love, and redemption.'},
    { id: 8, title: 'DRISHYAM', url: 'https://www.youtube.com/embed/iGCkQi-QziE?si=3rJ3S_7M0NIoFGmF', description: 'A gripping thriller that keeps you guessing until the very end.' },
    { id: 9, title: 'NEW DELHI', url: 'https://www.youtube.com/embed/uB_S8Uf0n4U?si=zjQTGBf170V2aWGX', description: 'A gripping thriller that keeps you guessing until the very end.' },
    // Add more films here
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOtpStage, setIsOtpStage] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userName, setUserName] = useState('');
  const [otp, setOtp] = useState('');
  const [selectedFilmId, setSelectedFilmId] = useState(null);
  const API_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

  const handleSendOtp = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/send-otp`, { userName, phoneNumber });
      console.log(response.data);
      setIsOtpStage(true);
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast.error('Error Sending OTP');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/verify-otp`, { phoneNumber, otp });
      if (response.data.success) {
        setIsModalOpen(false);
        toast.success('Verification successful!');
        
        toast.success('Your vote has been recorded!');
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

  const voteForFilm = async (filmId) => {
    try {
      if (isVerified) {
        // Directly change the vote if the user is verified
        console.log(`Voting for filmId: ${filmId}`,isVerified);
        setSelectedFilmId(filmId);
        toast.success('Your vote has been changed!');
      } else {
        // Open modal for verification
        setSelectedFilmId(filmId);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  return (
    <div>
      <NavbarComponent></NavbarComponent>
      <div className='bg-gray-100 py-8 px-10'>
        <div className='container mx-auto mt-8'>
          <img
            className="w-full max-w-full rounded-lg shadow-lg mt-4"
            src="https://firebasestorage.googleapis.com/v0/b/ballistiks-cyr17.appspot.com/o/PSFF%20Banner.JPG?alt=media&token=ca1a5fbc-76d6-465c-aa92-39e492ed62b1"
            alt="Sponsor"
          />
          <div className="text-center">
            <p className="text-lg text-center text-black mb-8">
              Step into a world of cinematic wonders and cast your vote for the most captivating film!
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-0.5 sm:px-10 ">
            {films.map((film) => (
              <div key={film.id} className="flex flex-col h-full">
     
              <DialogBasicFilm key={film.id} film={film} onVote={openModal} votedFilm={selectedFilmId} voteForFilm={voteForFilm}/>
              </div>
            ))}
          </div>
          <Modal show={isModalOpen} onClose={closeModal}>
          <Modal.Header>User Verification</Modal.Header>
                <Modal.Body>
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                      alt="Pullari Short Film Competition"
                      src="https://firebasestorage.googleapis.com/v0/b/ballistiks-cyr17.appspot.com/o/Logo-embossed.jpg?alt=media&token=6b22c355-355b-4919-a130-1c8f36584e79"
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
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
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
                            <div className="flex items-center justify-between">
                              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                Enter OTP
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
                          <div className='mt-6'>
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
                
            </Modal.Body>
            
          </Modal>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default VotingPage;