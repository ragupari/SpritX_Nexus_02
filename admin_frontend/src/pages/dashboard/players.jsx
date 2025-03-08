import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Button,
} from "@material-tailwind/react";

const players = [
  {
    name: "John Doe",
    university: "University of Moratuwa",
    category: "Batsman",
    stats: {
      totalRuns: 1200,
      ballsFaced: 950,
      inningsPlayed: 45,
      wickets: 0,
      oversBowled: 0,
      runsConceded: 0,
    },
  },
  {
    name: "Jane Smith",
    university: "University of Colombo",
    category: "Bowler",
    stats: {
      totalRuns: 300,
      ballsFaced: 220,
      inningsPlayed: 38,
      wickets: 65,
      oversBowled: 140,
      runsConceded: 890,
    },
  },
  {
    name: "Mike Johnson",
    university: "University of Peradeniya",
    category: "Allrounder",
    stats: {
      totalRuns: 750,
      ballsFaced: 600,
      inningsPlayed: 40,
      wickets: 30,
      oversBowled: 80,
      runsConceded: 600,
    },
  },
  {
    name: "Emily Davis",
    university: "University of Kelaniya",
    category: "Bowler",
    stats: {
      totalRuns: 150,
      ballsFaced: 120,
      inningsPlayed: 25,
      wickets: 40,
      oversBowled: 100,
      runsConceded: 750,
    },
  },
];

export function Players() {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {/* Players Table */}
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Players Table
          </Typography>
        </CardHeader>
        <CardBody className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
          {players.map((player, index) => (
            <Card
              key={index}
              className="p-4 flex flex-col items-center cursor-pointer hover:shadow-lg transition"
              onClick={() => setSelectedPlayer(player)}
            >
              <Avatar
                src={
                  player.category === "Batsman"
                    ? "/img/bat.png"
                    : player.category === "Bowler"
                    ? "/img/bowl.png"
                    : "/img/all.png"
                }
                size="xl"
                alt={player.name}
                className="mb-4"
              />
              <Typography variant="h5" color="blue-gray" className="font-bold">
                {player.name}
              </Typography>
              <Typography variant="small" color="gray" className="mb-2">
                {player.university}
              </Typography>
              <Chip value={player.category} variant="outlined" />
            </Card>
          ))}
        </CardBody>
      </Card>

      {/* Player Stats Card (Visible only when a player is selected) */}
      {selectedPlayer && (
        <Card>
          <CardHeader variant="gradient" color="blue" className="mb-6 p-6">
            <Typography variant="h6" color="white">
              {selectedPlayer.name} - Stats
            </Typography>
          </CardHeader>
          <CardBody className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Typography variant="h6" color="blue-gray">
              Total Runs: {selectedPlayer.stats.totalRuns}
            </Typography>
            <Typography variant="h6" color="blue-gray">
              Balls Faced: {selectedPlayer.stats.ballsFaced}
            </Typography>
            <Typography variant="h6" color="blue-gray">
              Innings Played: {selectedPlayer.stats.inningsPlayed}
            </Typography>
            <Typography variant="h6" color="blue-gray">
              Wickets: {selectedPlayer.stats.wickets}
            </Typography>
            <Typography variant="h6" color="blue-gray">
              Overs Bowled: {selectedPlayer.stats.oversBowled}
            </Typography>
            <Typography variant="h6" color="blue-gray">
              Runs Conceded: {selectedPlayer.stats.runsConceded}
            </Typography>
          </CardBody>
          <div className="p-4 flex justify-end">
            <Button color="red" onClick={() => setSelectedPlayer(null)}>
              Close
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}

export default Players;
