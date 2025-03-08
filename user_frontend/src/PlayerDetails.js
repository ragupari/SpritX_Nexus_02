import React, { useState, useEffect } from 'react';

function PlayerDetails() {
    const [player, setPlayer] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDetails, setShowDetails] = useState(false);  // State to track detail visibility

    useEffect(() => {
        const fetchPlayerData = async () => {
            try {
                const response = await fetch('https://api.example.com/players/1'); // URL of your API
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setPlayer(data);
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchPlayerData();
    }, []);

    const toggleDetails = () => {
        setShowDetails(!showDetails);  // Toggle the visibility of player details
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading player: {error}</p>;

    return (
        <div>
            <h1>Player Details</h1>
            {player ? (
                <div>
                    <h2 onClick={toggleDetails}>Varun</h2>
                    {showDetails && (
                        <div>
                            <p>Team: RCB</p>
                            <p>Position: Bater</p>
                            <p>Number of Goals: 22</p>
                        </div>
                    )}
                </div>
            ) : (
                <p>No player data available.</p>
            )}
        </div>
    );
}

export default PlayerDetails;
