// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import VotingPage from './votingPage';
import LandingPage from './landingPage'; // Import the LandingPage component
import Temp from './temp';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/voting" element={<VotingPage />} />
      </Routes>
    </Router>
  );
};
export default App;