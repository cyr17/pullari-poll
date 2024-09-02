// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import VotingPage from './votingPage';
import LandingPage from './landingPage'; // Import the LandingPage component
import { About } from './components/About';
import { Contact } from './components/Contact';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/voting" element={<VotingPage  />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};
export default App;