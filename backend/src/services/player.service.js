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
        // Calculate derived values in JavaScript
        const Batting_Strike_Rate = playerData.Balls_Faced > 0 ? (playerData.Total_Runs * 100.0 / playerData.Balls_Faced) : 0;
        const Batting_Average = playerData.Innings_Played > 0 ? (playerData.Total_Runs * 1.0 / playerData.Innings_Played) : 0;
        const Bowling_Strike_Rate = playerData.Wickets > 0 ? (playerData.Overs_Bowled * 6.0 / playerData.Wickets) : 0;
        const Economy_Rate = playerData.Overs_Bowled > 0 ? (playerData.Runs_Conceded / playerData.Overs_Bowled) : 0;

        const Player_Points = 
            (playerData.Balls_Faced > 0 ? (Batting_Strike_Rate / 5.0) : 0) + 
            ((playerData.Innings_Played > 0 ? Batting_Average : 0) * 0.8) + 
            (playerData.Wickets > 0 ? (500.0 / Bowling_Strike_Rate) : 0) + 
            (playerData.Overs_Bowled > 0 ? (140.0 / Economy_Rate) : 0);

        const Value_in_Rupees = Math.round(((9 * Player_Points) + 100) * 1000 / 50000) * 50000;

        // SQL Query
        const query = `
        INSERT INTO players 
        (Name, University, Category, Total_Runs, Balls_Faced, Innings_Played, Wickets, Overs_Bowled, Runs_Conceded, 
        Batting_Strike_Rate, Batting_Average, Bowling_Strike_Rate, Economy_Rate, Player_Points, Value_in_Rupees)  
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;

        // Values array
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
            Batting_Strike_Rate,
            Batting_Average,
            Bowling_Strike_Rate,
            Economy_Rate,
            Player_Points,
            Value_in_Rupees
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
            // Calculate derived values
            const Batting_Strike_Rate = playerData.Balls_Faced > 0 ? (playerData.Total_Runs * 100.0 / playerData.Balls_Faced) : 0;
            const Batting_Average = playerData.Innings_Played > 0 ? (playerData.Total_Runs * 1.0 / playerData.Innings_Played) : 0;
            const Bowling_Strike_Rate = playerData.Wickets > 0 ? (playerData.Overs_Bowled * 6.0 / playerData.Wickets) : null;
            const Economy_Rate = playerData.Overs_Bowled > 0 ? (playerData.Runs_Conceded / playerData.Overs_Bowled) : null;
    
            const Player_Points = 
                (playerData.Balls_Faced > 0 ? (Batting_Strike_Rate / 5.0) : 0) + 
                ((playerData.Innings_Played > 0 ? Batting_Average : 0) * 0.8) + 
                (playerData.Wickets > 0 && Bowling_Strike_Rate ? (500.0 / Bowling_Strike_Rate) : 0) + 
                (playerData.Overs_Bowled > 0 && Economy_Rate ? (140.0 / Economy_Rate) : 0);
    
            const Value_in_Rupees = Math.round((((9 * Player_Points) + 100) * 1000) / 50000) * 50000;
    
            // SQL Query to update player details along with derived values
            const query = `
              UPDATE ${this.tableName} 
              SET 
                Name = ?, University = ?, Category = ?, Total_Runs = ?, Balls_Faced = ?, 
                Innings_Played = ?, Wickets = ?, Overs_Bowled = ?, Runs_Conceded = ?, 
                Batting_Strike_Rate = ?, Batting_Average = ?, Bowling_Strike_Rate = ?, Economy_Rate = ?, 
                Player_Points = ?, Value_in_Rupees = ?
              WHERE Player_ID = ?
            `;
    
            // Values array to update the player data along with the derived values
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
              Batting_Strike_Rate,
              Batting_Average,
              Bowling_Strike_Rate,
              Economy_Rate,
              Player_Points,
              Value_in_Rupees,
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