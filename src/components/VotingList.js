import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

const VotingList = () => {
    const [votes, setVotes] = useState([]);
    
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [userName, setUserName] = useState('');
const [password, setPassword] = useState('');
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

    const validateUser = async () => {
        if (!userName || !password) {
          alert('Please enter your name and password');
          return;
        }
        console.log(userName+password,process.env.REACT_APP_ADMIN_NAME,process.env.REACT_APP_ADMIN_PASSWORD);
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
      <div>
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
    )
};

export default VotingList;