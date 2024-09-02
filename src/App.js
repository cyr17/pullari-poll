// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import VotingPage from './votingPage';
import LandingPage from './landingPage'; // Import the LandingPage component
import { About } from './components/About';
import { Contact } from './components/Contact';
import NavbarComponent from './NavbarComponent'; // Import the NavbarComponent component
import Results from './components/Results';
const App = () => {
  return (
    <Router>
    <div>
      <NavbarComponent /> {/* NavbarComponent is rendered here */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/voting" element={<VotingPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path='/results' element={<Results />} />
      </Routes>
    </div>
  </Router>
  );
};
export default App;