import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import PropTypes from "prop-types";

export function CreatePlayer({ isOpen, onClose, onSave }) {
  const [playerData, setPlayerData] = useState({
    Name: "",
    University: "",
    Category: "",
    Total_Runs: "",
    Balls_Faced: "",
    Innings_Played: "",
    Wickets: "",
    Overs_Bowled: "",
    Runs_Conceded: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlayerData({
      ...playerData,
      [name]: value,
    });
  };

  const handleSelectChange = (value) => {
    setPlayerData({
      ...playerData,
      Category: value,
    });
  };

  const handleSave = () => {
    const {
      Name,
      University,
      Category,
      Total_Runs,
      Balls_Faced,
      Innings_Played,
      Wickets,
      Overs_Bowled,
      Runs_Conceded,
    } = playerData;

    if (!Name || !University || !Category) {
      alert("Name, University, and Category are required!");
      return;
    }

    const newPlayer = {
      ...playerData,
      modifiedTime: new Date(),
      Total_Runs: Number(Total_Runs) || 0,
      Balls_Faced: Number(Balls_Faced) || 0,
      Innings_Played: Number(Innings_Played) || 0,
      Wickets: Number(Wickets) || 0,
      Overs_Bowled: Number(Overs_Bowled) || 0,
      Runs_Conceded: Number(Runs_Conceded) || 0,
    };

    onSave(newPlayer);
    setPlayerData({
      Name: "",
      University: "",
      Category: "",
      Total_Runs: "",
      Balls_Faced: "",
      Innings_Played: "",
      Wickets: "",
      Overs_Bowled: "",
      Runs_Conceded: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <Card className="max-w-lg w-full p-4">
        <CardHeader variant="gradient" color="gray" className="p-4">
          <Typography variant="h6" color="white">
            Create New Player
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            label="Player Name"
            name="Name"
            value={playerData.Name}
            onChange={handleInputChange}
            required
          />
          <Input
            label="University"
            name="University"
            value={playerData.University}
            onChange={handleInputChange}
            required
          />

          <Select
            label="Category"
            value={playerData.Category}
            onChange={handleSelectChange}
            required
          >
            <Option value="Batsman">Batsman</Option>
            <Option value="Bowler">Bowler</Option>
            <Option value="All-Rounder">All-Rounder</Option>
          </Select>

          {["Total_Runs", "Balls_Faced", "Innings_Played", "Wickets", "Overs_Bowled", "Runs_Conceded"].map((field) => (
            <Input
              key={field}
              label={field.replace("_", " ")}
              name={field}
              value={playerData[field]}
              onChange={handleInputChange}
              type="number"
            />
          ))}

          <div className="flex justify-end gap-4">
            <Button color="gray" onClick={onClose}>
              Cancel
            </Button>
            <Button color="black" onClick={handleSave}>
              Save
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

CreatePlayer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default CreatePlayer;
