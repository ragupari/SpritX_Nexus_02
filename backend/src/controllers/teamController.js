import TeamService from "../services/teams.service.js";
import pool from "../configs/mysql.js";

// Get all teams
const getAllTeams = async (req, res) => {
  try {
    const teams = await TeamService.getAllTeams();
    res.status(200).json({ data: teams });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getBudget = async (req, res) => {
  const { userId } = req.params;
  try {
    const query = `
      SELECT cash 
      FROM users 
      WHERE id = ?
    `;
    const [results] = await pool.query(query, [userId]);
    
    if (results.length === 0) {
      return res.status(404).json({ message: "User not found", req:req });
    }

    res.status(200).json({ budget: results[0].cash });
  } catch (err) {
    console.error("Error fetching budget by user ID:", err.stack);
    res.status(500).json({ error: "Error fetching budget by user ID" , req:req});
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
  
  const removePlayerFromTeam = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        const { userId, playerId } = req.body;

        // Basic input validation
        if (!userId || !playerId) {
            return res.status(400).json({ error: "userId and playerId are required." });
        }

        await connection.beginTransaction(); // Start a transaction

        // Step 1: Fetch the player's value
        const [player] = await connection.query(
            `SELECT Value_in_Rupees FROM players WHERE Player_ID = ?`,
            [playerId]
        );
        if (!player || player.length === 0) {
            throw new Error("Player not found.");
        }
        const playerValue = player[0].Value_in_Rupees;

        // Step 2: Fetch the user's current cash and count
        const [user] = await connection.query(
            `SELECT Cash, Count FROM users WHERE id = ?`,
            [userId]
        );
        if (!user || user.length === 0) {
            throw new Error("User not found.");
        }
        const userCash = user[0].Cash;
        const userCount = user[0].Count;

        // Step 3: Update user's cash and count
        const updatedUserCash = userCash + playerValue;
        const updatedUserCount = userCount - 1;

        await connection.query(
            `UPDATE users SET Cash = ?, Count = ? WHERE id = ?`,
            [updatedUserCash, updatedUserCount, userId]
        );

        // Step 4: Remove the player from the team
        const deleteQuery = `DELETE FROM teams WHERE user_id = ? AND player_id = ?`;
        const [deleteResult] = await connection.query(deleteQuery, [userId, playerId]);

        if (deleteResult.affectedRows === 0) {
            throw new Error("Player not found in team.");
        }

        await connection.commit(); // Commit the transaction

        res.status(200).json({ message: "Player removed from team successfully." });
    } catch (error) {
        await connection.rollback(); // Rollback the transaction on error
        console.error("Error removing player from team:", error.message);
        res.status(500).json({ error: error.message });
    } finally {
        connection.release(); // Release the connection
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
  getBudget,
};