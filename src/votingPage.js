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
    {
      "id": 1,
      "title": "Spadikam",
      "url": "https://www.youtube.com/embed/349z-tk5RUM?si=X1eaf7_0YzI-HTX9",
      "director": "Bhadran",
      "cast": "Mohanlal, Urvashi, Thilakan",
      "synopsis": "Thomas leaves his village after constantly clashing with his heavy-handed father. Fourteen years later, Thomas returns home as the owner of a stone quarry and a small-time criminal. Father and son vow never to reconcile, causing immense distress to Thomas’ mother and younger sister."
    },
    {
      "id": 2,
      "title": "New Delhi",
      "url": "https://www.youtube.com/embed/uB_S8Uf0n4U?si=zjQTGBf170V2aWGX",
      "director": "Sibi Malayil",
      "cast": "Mohanlal, Shobana, Thilakan",
      "synopsis": "A suspenseful story about a man who gets caught in a web of intrigue and danger. He fights to clear his name and protect his loved ones. "
    },
    {
      "id": 3,
      "title": "Narasimham",
      "url": "https://www.youtube.com/embed/Z3g5qGQK7eI?si=_VMGz8gExpZbXuW1",
      "director": "Sibi Malayil",
      "cast": "Mohanlal, Shobana, Thilakan",
      "synopsis": "A powerful story of a man who seeks revenge on those who have wronged him. He uses his skills and intelligence to bring them down. "
    },
    {
      "id": 4,
      "title": "Amaram",
      "url": "https://www.youtube.com/embed/Xqn4QaDz1Wo?si=Of0l7WQirryNpW8G",
      "director": "Bharathan",
      "cast": "Mohanlal, Parvathy, Thilakan",
      "synopsis": "A man struggles to balance his love for two women. He faces a moral dilemma and must choose between his heart and his head. "
    },
    {
      "id": 5,
      "title": "Devaadoothan",
      "url": "https://www.youtube.com/embed/jb5FMCr1rSc?si=Y3yNVb9eF_Y0A72T",
      "director": "Sibi Malayil",
      "cast": "Mohanlal, Shobana, Thilakan",
      "synopsis": "A man falls in love with a woman who is already married. He faces many challenges in his quest for love. "
    },
    {
      "id": 6,
      "title": "Premam",
      "url": "https://www.youtube.com/embed/yjaFvFuQ-QM?si=GzjXcLTxr8rpGxQI",
      "director": "Alphonse Puthren",
      "cast": "Nivin Pauly, Sai Pallavi, Madonna Sebastian",
      "synopsis": "A coming-of-age story about a man who falls in love at different stages of his life. He learns about love, loss, and life. "
    },
    {
      "id": 7,
      "title": "Kumbalangi Nights",
      "url": "https://www.youtube.com/embed/bNyKd0PUx04?si=A-8wRwQ54z6HdxZ1",
      "director": "Madhu C. Narayanan",
      "cast": "Shane Nigam, Soubin Shahir, Sreenath Bhasi",
      "synopsis": "A story about four brothers who face a crisis in their lives. They must learn to work together to overcome their problems. "
    },
    {
      "id": 8,
      "title": "Drishyam",
      "url": "https://www.youtube.com/embed/iGCkQi-QziE?si=3rJ3S_7M0NIoFGmF",
      "director": "Jeethu Joseph",
      "cast": "Mohanlal, Meena, Asha Sarath",
      "synopsis": "A man is accused of murder and he must use his intelligence and cunning to protect his family from the police. "
    },
    {
      "id": 9,
      "title": "New Delhi",
      "url": "https://www.youtube.com/embed/uB_S8Uf0n4U?si=zjQTGBf170V2aWGX",
      "director": "Sibi Malayil",
      "cast": "Mohanlal, Shobana, Thilakan",
      "synopsis": "A suspenseful story about a man who gets caught in a web of intrigue and danger. He fights to clear his name and protect his loved ones. "
    },
  
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
      toast.success('OTP Sent Successfully');
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
      <div className='bg-gray-100 py-8 px-10'>
        <div className='container mx-auto'>
          <img
            className="w-full max-w-full rounded-lg shadow-lg"
            src="/banner.PNG"
            alt="banner"
          />
          <div className="flex flex-col items-center p-4 sm:p-6 md:p-8 lg:p-10">
            <a href="https://app.orgnyse.com.au/121/short-flim-dinner-night" className="bg-blue-600 text-white font-bold py-2 px-8 rounded-full mt-2">Book Tickets</a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-0.5 sm:px-10 ">
            {films.map((film) => (
              <div key={film.id} className="flex flex-col h-full">
     
              <DialogBasicFilm key={film.id} film={film} onVote={openModal} votedFilm={selectedFilmId} voteForFilm={voteForFilm}/>
              </div>
            ))}
          </div>
          <Modal show={isModalOpen} onClose={closeModal}>
          <Modal.Header>Pulari Short Film Festival -PSFF 2024</Modal.Header>
                <Modal.Body>
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h1 className='text-2xl font-bold '>Voting Conditions</h1>
                    <p className='text-lg font-normal mt-4'>
                      1. Most voted film online will be selected as 'Audience Choice' category winner.<br />		
                      2. Voting is limited to Australian mobile numbers only.<br />	
                      3. A user can only vote for a single film, only the latest vote would be counted<br />	
                      4. Pulari Short Film Festival committee holds the right to make any changes at any point of time.	<br />	
                      5. In case of any disputes, Pulari Short Film Festival committee's decision will be final.		<br />	

                    </p>
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