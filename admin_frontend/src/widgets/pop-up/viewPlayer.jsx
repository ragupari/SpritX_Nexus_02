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
          <div className="flex justify-between">
            <Typography variant="body1">Player Name:</Typography>
            <Typography variant="body1">{renderValue(playerData.Name)}</Typography>
          </div>
          <div className="flex justify-between">
            <Typography variant="body1">University:</Typography>
            <Typography variant="body1">{renderValue(playerData.University)}</Typography>
          </div>
          <div className="flex justify-between">
            <Typography variant="body1">Category:</Typography>
            <Typography variant="body1">{renderValue(playerData.Category)}</Typography>
          </div>

          {["Total_Runs", "Balls_Faced", "Innings_Played", "Wickets", "Overs_Bowled", "Runs_Conceded"].map((field) => (
            <div key={field} className="flex justify-between">
              <Typography variant="body1">{field.replace("_", " ")}</Typography>
              <Typography variant="body1">{renderValue(playerData[field])}</Typography>
            </div>
          ))}

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
