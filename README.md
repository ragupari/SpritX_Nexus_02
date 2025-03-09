Project Title 
# SpritX 11

## Overview
SpritX Nexus is a fantasy cricket game platform where users can create their dream cricket teams by selecting players from various universities. The platform combines the excitement of fantasy sports with competitive cricket management.

## Features
- User Authentication System
- Player Management
  - View detailed player statistics
  - Player valuation based on performance metrics
  - Dynamic player points calculation
- Team Management
  - Create and manage cricket teams
  - Add/remove players from teams
  - Team budget management
- Real-time Updates
  - Live team updates
  - Player performance tracking

## Technical Stack
### Backend
- Node.js
- Express.js
- MySQL Database
- JWT Authentication
- WebSocket for real-time updates

### Frontend
- React.js
- Material UI Components
- Protected Routes
- State Management

## Database Structure
The application uses MySQL with the following main tables:
- Users
- Players
- Teams

## Getting Started

### Prerequisites
- Node.js
- MySQL
- npm/yarn

### Installation
1. Clone the repository
2. Navigate to project directory
   ```bash
   cd SpritX_Nexus_02
   ```

3. Install backend dependencies
   ```bash
   cd backend
   npm install
   ```

4. Install frontend dependencies
   ```bash
   cd ../user_frontend
   npm install
   ```

5. Set up environment variables
   - Create `.env` file in backend directory
   - Add required environment variables:
     JWT_SECRET=your_jwt_secret

     ```
6. Initialize Database

         ```
     PORT=
     DB_HOST=
     DB_USER=
     DB_PASSWORD=
     DB_NAME=

          ```````
7. Start the servers
   ```bash
   # Start backend server (from backend directory)
   npm run dev

   # Start frontend server (from user_frontend directory)
   npm start
   ```




