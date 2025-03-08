import PlayerService from "../services/player.service.js"; // Import the service

// import playerService from "../services/player.service.js";

// Fetch all players
const getAllPlayers = async (req, res) => {
  try {
    const players = await PlayerService.getAllPlayers();
    res.status(200).json({ data: players });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPlayerById = async (req, res) => {
    try {
      const playerId = req.params.playerId; // Get Player_ID from URL params
      const player = await PlayerService.getPlayerById(playerId);
  
      if (!player) {
        // If no player is found
        res.status(404).json({ message: "Player not found." });
      } else {
        // If player is found
        res.status(200).json({ data: player });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Add a new player
const addPlayer = async (req, res) => {
    try {
        const playerData = req.body;// Get player data from the request body
        const result = await PlayerService.addPlayer(playerData);
        res.status(201).json({ message: "Player added successfully.", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an existing player
const updatePlayer = async (req, res) => {
  try {
    const playerId = req.params.playerId; // Get Player_ID from URL params
    const playerData = req.body; // Get updated player data from the request body
    const result = await PlayerService.updatePlayer(playerId, playerData);
    res.status(200).json({ message: "Player updated successfully.", data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a player
const deletePlayer = async (req, res) => {
  try {
    const playerId = req.params.playerId; // Get Player_ID from URL params
    const result = await PlayerService.deletePlayer(playerId);
    res.status(200).json({ message: "Player deleted successfully.", data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export the controller methods
export const playerController = {
  getAllPlayers,
  getPlayerById,
  addPlayer,
  updatePlayer,
  deletePlayer,
};