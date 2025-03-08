import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import HomePage from './HomePage';
import PlayerDetails from './PlayerDetails';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/" element={<LoginPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/player-details" element={<PlayerDetails />} />
                
            </Routes>
        </Router>
    );
}

export default App;
