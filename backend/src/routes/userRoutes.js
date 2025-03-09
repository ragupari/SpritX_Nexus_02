import express from "express";
import userController from "../controllers/userController.js"; // Import userController

const userRouter = express.Router();

// Log incoming requests
userRouter.use((req, res, next) => {
  console.log(`${req.method} route request to ${req.url}`); // Logs method and URL
  next(); // Proceed to the next middleware or route handler
});

// Link routes to controller methods
userRouter.get("/", userController.getAllUsers); // Get all users
userRouter.get("/:id", userController.getUserById); // Get user by ID
userRouter.post("/tokenauth", userController.tokenAuth); // Get user by ID
userRouter.post("/", userController.createUser); // Create new user
userRouter.post("/login", userController.login); // Login user
userRouter.delete("/:id", userController.deleteUser); // Delete user

export default userRouter;
