// HomePage.js
import React from 'react';
import NavBar from './NavBar';  // Assuming NavBar is a separate component

function HomePage() {
    return (
        <div>
            <NavBar />
            <h1 className='home-page-title'>Welcome to the Home Page</h1>
            <p>This is the starting point of our sports management application.</p>
        </div>
    );
}

export default HomePage;
