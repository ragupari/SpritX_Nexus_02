import express from "express";
import { teamController } from "../controllers/teamController.js";

const router = express.Router();

// Define routes
router.get("/", teamController.getAllTeams); // Get all teams
router.get("/:userId/players", teamController.getPlayersByTeamId); // Get all players from a team
router.post("/add-player", teamController.addPlayerToTeam); // Add a player to a team
router.delete("/remove-player", teamController.removePlayerFromTeam); // Remove a player from a team
router.get("/leaderboard", teamController.getAllLeaderboardTeams); // Get all teams for the leaderboard

// Export the router
export default router;