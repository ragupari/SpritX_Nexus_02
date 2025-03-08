import express from 'express';
import cors from 'cors';
import userRouter from './src/routes/userRoutes.js'; // Import your user routes
import playerRouter from './src/routes/playerRoutes.js'

const app = express();

// Middleware to log each incoming request
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`); // Logs method and URL
  next(); // Call the next middleware or route handler
});

app.use(cors()); // Middleware for handling CORS
app.use(express.json()); // Middleware for JSON parsing

// Set up the routes
app.use('/api/users', userRouter);
 // Use your user routes for /api prefix
 app.use('/api/players', playerRouter);

// Test route to ensure the server is receiving requests
app.get('/test', (req, res) => {
  console.log("Test route hit!");
  res.send('Test route is working!');
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
