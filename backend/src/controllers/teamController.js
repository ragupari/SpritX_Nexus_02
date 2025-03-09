import TeamService from "../services/teams.service.js";

// Get all teams
const getAllTeams = async (req, res) => {
  try {
    const teams = await TeamService.getAllTeams();
    res.status(200).json({ data: teams });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all players from a particular team
const getPlayersByTeamId = async (req, res) => {
    try {
      const userId = req.params.userId; // Get userId from URL params
      const players = await TeamService.getPlayersByTeamId(userId);
      res.status(200).json({ data: players });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Add a player to a team
const addPlayerToTeam = async (req, res) => {
    try {
      const { userId, playerId } = req.body; // Get userId and playerId from request body
      const result = await TeamService.addPlayerToTeam(userId, playerId);
      res.status(201).json({ message: "Player added to team successfully.", data: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Remove a player from a team
  const removePlayerFromTeam = async (req, res) => {
    try {
      const { userId, playerId } = req.body; // Get userId and playerId from request body
      const result = await TeamService.removePlayerFromTeam(userId, playerId);
      res.status(200).json({ message: "Player removed from team successfully.", data: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const getAllLeaderboardTeams = async (req, res) => {
    try {
      const teams = await TeamService.getAllLeaderboardTeams();
      res.status(200).json({ data: teams });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

// Export the controller methods
export const teamController = {
  getAllTeams,
  getPlayersByTeamId,
  addPlayerToTeam,
  removePlayerFromTeam,
  getAllLeaderboardTeams,
};