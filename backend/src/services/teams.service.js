import pool from "../configs/mysql.js";
import { broadcastUpdate } from "../../server.js"; 
import dotenv from 'dotenv';

dotenv.config();

class TeamService {
  constructor() {
    this.pool = pool;
    this.tableName = "teams";
  }

  // Get all teams
  async getAllTeams() {
    try {
      const [results] = await this.pool.query(`SELECT * FROM ${this.tableName}`);
      console.log("Teams fetched successfully");
      return results;
    } catch (err) {
        throw new Error("Error fetching Teams: " + err.stack);
    }
  }

  // Get all players from a particular team
  async getPlayersByTeamId(userId) {
    try {
      const query = `
        SELECT p.* 
        FROM players p
        JOIN ${this.tableName} t ON p.player_id = t.player_id
        WHERE t.user_id = ?
      `;
      const [results] = await this.pool.query(query, [userId]);
      console.log("Team players fetched successfully.");
      return results; // Return all players in the user's team
    } catch (err) {
      console.error("Error fetching team players by user ID:", err.stack);
      throw new Error("Error fetching team players by user ID: " + err.stack);
    }
  }

  // Add a player to a team
  async addPlayerToTeam(userId, playerId) {
    const connection = await this.pool.getConnection();
    try {
      await connection.beginTransaction(); // Start a transaction
  
      // Step 1: Fetch the player's points
      const [player] = await connection.query(
        `SELECT Value_in_Rupees FROM players WHERE Player_ID = ?`,
        [playerId]
      );
      if (!player || player.length === 0) {
        throw new Error("Player not found.");
      }
      const playerValue = player[0].Value_in_Rupees;
  
      // Step 2: Fetch the user's current points
      const [user] = await connection.query(
        `SELECT Cash, Count FROM users WHERE id = ?`,
        [userId]
      );
      if (!user || user.length === 0) {
        throw new Error("User not found.");
      }
      const userCash = user[0].Cash;
      const userCount = user[0].Count;
  
      // Step 3: Check if the user has enough points
      if (userCash < playerValue) {
        throw new Error("Insufficient points to add this player.");
      }
  
      // Step 4: Deduct the player's points from the user's points
      const updatedUserCash = userCash - playerValue;
      const updatedUserCount = userCount + 1;
      await connection.query(
        `UPDATE users SET Cash = ?, Count = ? WHERE id = ?`,
        [updatedUserCash, updatedUserCount, userId]
      );
  
      // Step 5: Add the player to the team
      const query = `
        INSERT INTO ${this.tableName} (user_id, Player_ID) 
        VALUES (?, ?)
      `;
      const [result] = await connection.query(query, [userId, playerId]);

      // Step 6: Fetch the updated team data
      const updatedTeam = await this.getPlayersByTeamId(userId);

      // Step 7: Broadcast the updated team data
      broadcastUpdate({ type: "teamUpdate", data: updatedTeam });
  
      await connection.commit(); // Commit the transaction
      console.log("Player added to team successfully.");
      return result;
    } catch (err) {
      await connection.rollback(); // Rollback the transaction on error
      console.error("Error adding player to team:", err.message);
      throw new Error("Error adding player: " + err.stack);
    } finally {
      connection.release(); // Release the connection
    }
  }

  // Remove a player from a team
  async removePlayerFromTeam(userId, playerId) {
    const connection = await this.pool.getConnection();
    try {
      await connection.beginTransaction(); // Start a transaction
  
      // Step 1: Fetch the player's points
      const [player] = await connection.query(
        `SELECT Value_in_Rupees FROM players WHERE Player_ID = ?`,
        [playerId]
      );
      if (!player || player.length === 0) {
        throw new Error("Player not found.");
      }
      const playerValue = player[0].Value_in_Rupees;
  
      // Step 2: Fetch the user's current points
      const [user] = await connection.query(
        `SELECT Cash FROM users WHERE id = ?`,
        [userId]
      );
      if (!user || user.length === 0) {
        throw new Error("User not found.");
      }
      const userCash = user[0].Cash;
      const userCount = user[0].Count;
  
      // Step 3: Return the player's points to the user
      const updatedUserCash = userCash + playerValue;
      const updatedUserCount = userCount - 1;

      await connection.query(
        `UPDATE users SET Cash = ?, Count = ?, WHERE id = ?`,
        [updatedUserCash,updatedUserCount, userId]
      );
  
      // Step 4: Remove the player from the team
      const query = `
        DELETE FROM ${this.tableName} 
        WHERE user_id = ? AND player_id = ?
      `;
      const [result] = await connection.query(query, [userId, playerId]);

      // Step 5: Fetch the updated team data
      const updatedTeam = await this.getPlayersByTeamId(userId);

      // Step 6: Broadcast the updated team data
      broadcastUpdate({ type: "teamUpdate", data: updatedTeam });
  
      await connection.commit(); // Commit the transaction
      console.log("Player removed from team successfully.");
      return result;
    } catch (err) {
      await connection.rollback(); // Rollback the transaction on error
      console.error("Error removing player from team:", err.message);
      throw new Error("Error removing player: " + err.stack);
    } finally {
      connection.release(); // Release the connection
    }
  }
}

export default new TeamService();