import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import PropTypes from "prop-types";

export function ViewPlayer({ isOpen, onClose, player }) {
  const [playerData, setPlayerData] = useState(player || {}); // Handle null player

  useEffect(() => {
    if (player) {
      setPlayerData(player);
    }
  }, [player]);

  // Render a fallback value of "-" if a field is null or undefined
  const renderValue = (value) => (value ? value : "-");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <Card className="max-w-lg w-full p-4">
        <CardHeader variant="gradient" color="gray" className="p-4">
          <Typography variant="h6" color="white">
            View Player Details
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          {/* Basic Player Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Typography variant="body1">Player Name:</Typography>
              <Typography variant="body1" className="font-semibold">
                {renderValue(playerData.Name)}
              </Typography>
            </div>
            <div>
              <Typography variant="body1">University:</Typography>
              <Typography variant="body1" className="font-semibold">
                {renderValue(playerData.University)}
              </Typography>
            </div>
            <div>
              <Typography variant="body1">Category:</Typography>
              <Typography variant="body1" className="font-semibold">
                {renderValue(playerData.Category)}
              </Typography>
            </div>
          </div>

          {/* First Row: Primary Stats */}
          <div className="grid grid-cols-2 gap-4 border-t pt-2">
            {["Total_Runs", "Balls_Faced", "Innings_Played", "Wickets", "Overs_Bowled", "Runs_Conceded"].map((field) => (
              <div key={field}>
                <Typography variant="body1">{field.replace(/_/g, " ")}</Typography>
                <Typography variant="body1" className="font-semibold">
                  {renderValue(playerData[field])}
                </Typography>
              </div>
            ))}
          </div>

          {/* Second Row: Additional Stats */}
          <div className="grid grid-cols-2 gap-4 border-t pt-2">
            {["Batting_Strike_Rate", "Batting_Average", "Bowling_Strike_Rate", "Economy_Rate", "Player_Points", "Value_in_Rupees"].map((field) => (
              <div key={field}>
                <Typography variant="body1">{field.replace(/_/g, " ")}</Typography>
                <Typography variant="body1" className="font-semibold">
                  {renderValue(playerData[field])}
                </Typography>
              </div>
            ))}
          </div>

          {/* Close Button */}
          <div className="flex justify-end gap-4">
            <Button color="gray" onClick={onClose}>
              Close
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

ViewPlayer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  player: PropTypes.object,
};

export default ViewPlayer;
