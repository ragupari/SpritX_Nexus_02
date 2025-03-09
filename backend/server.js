import express from 'express';
import cors from 'cors';
import http from 'http'; // Import the HTTP module
import { WebSocketServer } from 'ws'; // Import the WebSocket library
import userRouter from './src/routes/userRoutes.js'; // Import your user routes
import playerRouter from './src/routes/playerRoutes.js';
import teamsRouter from './src/routes/teamRoutes.js';

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
app.use('/api/teams', teamsRouter);

// Test route to ensure the server is receiving requests
app.get('/test', (req, res) => {
  console.log("Test route hit!");
  res.send('Test route is working!');
});

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Create a WebSocket server
const wss = new WebSocketServer({ server });

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('New client connected');

  // Send a welcome message to the client
  ws.send(JSON.stringify({ type: 'welcome', message: 'Connected to WebSocket server' }));

  // Handle messages from the client
  ws.on('message', (message) => {
    console.log('Received message:', message.toString());
  });

  // Handle client disconnection
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Function to broadcast updates to all connected clients
function broadcastUpdate(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

// Export the broadcast function (optional, if needed in other files)
export { broadcastUpdate };

// Start the server
server.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});

// Start the server
// app.listen(3000, () => {
//   console.log('Server running on http://localhost:3000');
// });
