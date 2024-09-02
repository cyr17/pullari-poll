import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

const VotingList = () => {
    const [votes, setVotes] = useState([]);

    useEffect(() => {
        const fetchVotes = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/votes`, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                });
                if (response.status === 200) {
                    console.log(response.data.votes);
                    setVotes(response.data.votes);

                } else {
                    console.error(`Error fetching votes: ${response.status} ${response.statusText}`);
                }
            } catch (error) {
                console.error(`Error fetching votes: ${error}`);
            }
        };

        fetchVotes();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Votes:</h1>
            <ul className="list-none p-0 m-0">
                {votes.map((vote) => (
                    <li key={vote._id} className="mb-4">
                        <div className="card flex items-center bg-gray-100 p-4 rounded-lg shadow-md">
                            <h2 className="text-lg font-bold mb-2">{vote.userName} </h2>
                            <p className="text-md"> Vote to filmId: {vote.filmId} </p>
                            <p className="text-md"> Phone Number: {vote.phoneNumber} </p>
                            <p className='text-md'> timeStamp: {vote.timeStamp} </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VotingList;