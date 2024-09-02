import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { filmsList } from '../components/FilmList'; // Adjust the path as necessary


const getYouTubeThumbnail = (url) => {
    const videoId = url.split('/embed/')[1]?.split('?')[0];
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

const Results = () => {
  const [entries, setEntries] = useState([]);

    const API_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/results`);
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

  // Sort the entries by votes in descending order
  const sortedEntries = [...entries].sort((a, b) => b.votes - a.votes);

  return (
    <div className="container mx-auto p-4">
      <div className="winner mb-8">
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
    </div>
  );
};

export default Results;