import pool from "../configs/mysql.js";
// import { broadcastUpdate } from "../server.js"; 
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Player Service
class PlayerService {
  constructor() {
    this.pool = pool;
    this.tableName = "players";
  }

  // Example: Fetch all players
  async getAllPlayers() {
    try {
        const [results] = await this.pool.query(`SELECT * FROM ${this.tableName}`);
        console.log("Players fetched successfully.");
        return results;
      } catch (err) {
        throw new Error("Error fetching players: " + err.stack);
      }
    }

  async getPlayerById(playerId) {
    try {
        const query = `SELECT * FROM ${this.tableName} WHERE Player_ID = ?`;
        const [results] = await this.pool.query(query, [playerId]);
        console.log("Player fetched successfully.");
        return results.length ? results[0] : null;
      } catch (err) {
        throw new Error("Error fetching player by ID: " + err.stack);
      }
    }

  async addPlayer(playerData) {
    try {
        const query = `
          INSERT INTO ${this.tableName} 
          (Name, University, Category, Total_Runs, Balls_Faced, Innings_Played, Wickets, Overs_Bowled, Runs_Conceded) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
          playerData.Name,
          playerData.University,
          playerData.Category,
          playerData.Total_Runs,
          playerData.Balls_Faced,
          playerData.Innings_Played,
          playerData.Wickets,
          playerData.Overs_Bowled,
          playerData.Runs_Conceded
        ];
        console.log('hiihhiihih',playerData)
        const [result] = await this.pool.query(query, values);
        console.log("Player added successfully.");
        return result;
      } catch (err) {
        throw new Error("Error adding player: " + err.stack);
      }
    }
  
  async updatePlayer(playerId, playerData) {
    try {
        const query = `
          UPDATE ${this.tableName} 
          SET 
            Name = ?, University = ?, Category = ?, Total_Runs = ?, Balls_Faced = ?, 
            Innings_Played = ?, Wickets = ?, Overs_Bowled = ?, Runs_Conceded = ?
          WHERE Player_ID = ?
        `;
        const values = [
          playerData.Name,
          playerData.University,
          playerData.Category,
          playerData.Total_Runs,
          playerData.Balls_Faced,
          playerData.Innings_Played,
          playerData.Wickets,
          playerData.Overs_Bowled,
          playerData.Runs_Conceded,
          playerId
        ];
        const [result] = await this.pool.query(query, values);
        console.log("Player updated successfully.");
        return result;
      } catch (err) {
        throw new Error("Error updating player: " + err.stack);
      }
    }

  async deletePlayer(playerId) {
    try {
        const query = `DELETE FROM ${this.tableName} WHERE Player_ID = ?`;
        const [result] = await this.pool.query(query, [playerId]);
        console.log("Player deleted successfully.");
        return result;
      } catch (err) {
        throw new Error("Error deleting player: " + err.stack);
      }
    }

  // Other player-related methods...
}

export default new PlayerService();

// export default playerService;