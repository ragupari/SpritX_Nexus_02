// NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
    return (
        <nav>
            <ul>
                <li><Link to="/select-team">Select Team</Link></li>
                <li><Link to="/player-details">Player Details</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;
