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
  const API_BASE_URL='https://pullaripollserver.vercel.app';
  useEffect(() => {
    if (isVerified) {
      fetchResults();
    }
  }, [isVerified]);

  const handleVote = async (filmId) => {
    try {
      console.log(`Voting for filmId: ${filmId}`);
      const response = await axios.post(
        `${API_BASE_URL}/vote`,
        { filmId, phoneNumber },
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json', // Axios defaults to this, but it's good to be explicit
            'Access-Control-Allow-Origin': 'https://pullari-poll.vercel.app', // Replace with your front-end URL
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',// Replace with actual auth if needed
          }
        }
      );
      fetchResults();
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  const fetchResults = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/results`);
      console.log('Fetched results:', response.data);
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  return (
    <div>
      <h1>Short Film Competition</h1>
      {!isVerified ? (
        <OtpInput onVerify={(phone) => { setIsVerified(true); setPhoneNumber(phone); }} />
      ) : (
        <>
          {films.map(film => (
            <Film key={film.id} film={film} onVote={(filmId) => handleVote(filmId)} />
          ))}
          <h2>Results</h2>
          <ul>
            {Object.keys(results).map(filmId => (
              <li key={filmId}>Film {filmId}: {results[filmId]} votes</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default App;