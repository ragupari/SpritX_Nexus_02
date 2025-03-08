import express from "express";
import { playerController } from "../controllers/playerController.js";

const playerRouter = express.Router();

// Log incoming requests
playerRouter.use((req, res, next) => {
  console.log(`${req.method} route request to ${req.url}`); // Logs method and URL
  next(); // Proceed to the next middleware or route handler
});

// Link routes to controller methods
playerRouter.get("/", playerController.getAllPlayers); // Get all players
playerRouter.get("/:playerId", playerController.getPlayerById); // Get player by ID
playerRouter.post("/", playerController.addPlayer); // Create new player
playerRouter.put("/:playerId", playerController.updatePlayer); // Update player
playerRouter.delete("/:playerId", playerController.deletePlayer); // Delete player

export default playerRouter;
