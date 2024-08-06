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

  useEffect(() => {
    if (isVerified) {
      fetchResults();
    }
  }, [isVerified]);

  const handleVote = async (filmId) => {
    try {
      console.log(`Voting for filmId: ${filmId}`);
      await axios.post('http://localhost:5000/vote', { filmId, phoneNumber });
      fetchResults();
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  const fetchResults = async () => {
    try {
      const response = await axios.get('http://localhost:5000/results');
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