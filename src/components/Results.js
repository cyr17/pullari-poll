import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { filmsList } from '../components/FilmList'; // Adjust the path as necessary
import { exportToExcel } from './exportCsv';

const getYouTubeThumbnail = (url) => {
    const videoId = url.split('/embed/')[1]?.split('?')[0];
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

const API_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;
const Results = () => {
  const [entries, setEntries] = useState([]);
  
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [userName, setUserName] = useState('');
const [password, setPassword] = useState('');
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/results`,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
          }
        );
        if (response.status === 200) {
          const results = response.data.results;
          const updatedEntries = filmsList.map(film => ({
            ...film,
            votes: results[String(film.id)] || 0
          }));
          setEntries(updatedEntries);
        } else {
          console.error(`Error fetching results: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.error(`Error fetching results: ${error}`);
      }
    };

    fetchResults();
  }, []);

  // Find the winner
  const winner = entries.reduce((max, current) => max.votes > current.votes ? max : current, { votes: 0 });

  // find total votes
  const totalVotes = entries.reduce((acc, entry) => acc + entry.votes, 0);
  console.log(totalVotes);

  // Sort the entries by votes in descending order
  const sortedEntries = [...entries].sort((a, b) => b.votes - a.votes);

  const validateUser = async () => {
    if (!userName || !password) {
      alert('Please enter your name and password');
      return;
    }

    if (userName === process.env.REACT_APP_ADMIN_NAME && password === process.env.REACT_APP_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  }
  return (
    <div className="container mx-auto p-4">
      {isAuthenticated ?(
        <>
      <div className="winner mb-8">
        <h1 className="text-3xl font-bold mb-4">Total Votes: {totalVotes}</h1>
        <h1 className="text-3xl font-bold mb-4">Winner:</h1>

        {winner.votes > 0 && (
          <div className="winner-card flex items-center bg-gray-100 p-4 rounded-lg shadow-md">
            <img src={getYouTubeThumbnail(winner.url)} alt={winner.title} className="w-32 h-32 object-cover rounded-lg mr-4" />
            <div>
              <h2 className="text-2xl font-bold mb-2">{winner.title}</h2>
              <p className="text-lg">Votes: {winner.votes}</p>
            </div>
          </div>
        )}
      </div>
      <div className="rankings">
        <h1 className="text-3xl font-bold mb-4">Rankings:</h1>
        <ul className="list-none p-0 m-0">
          {sortedEntries.map((entry) => (
            <li key={entry.id} className="mb-4">
              <div className="card flex items-center bg-gray-100 p-4 rounded-lg shadow-md">
                <img src={getYouTubeThumbnail(entry.url)} alt={entry.title} className="w-24 h-24 object-cover rounded-lg mr-4" />
                <div>
                  <h2 className="text-lg font-bold mb-2">{entry.title}</h2>
                  <p className="text-md">Votes: {entry.votes}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      </>
      ) : (
      <div className="flex items-center justify-center h-screen">
        <form  className="space-y-6">
        
        <h1 className="text-3xl font-bold">Welcome Back!</h1>  
        <h1 className="text-3xl font-bold">Please log in to view the results</h1>
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
                          Password
                        </label>
                      </div>
                      <div className="mt-2">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          required
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                <button onClick={validateUser} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type="submit">Submit</button>
              </form>
        </div> 
      )}
    </div>
  );
};

export default Results;