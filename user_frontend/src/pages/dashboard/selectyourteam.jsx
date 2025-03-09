import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";
import { StatisticsCard } from "@/widgets/cards";
import "bootstrap-icons/font/bootstrap-icons.css";

const playersData = [
  { name: "John Doe", university: "University of Moratuwa", category: "Bowler" },
  { name: "Jane Smith", university: "University of Colombo", category: "Batsman" },
  { name: "Alice Brown", university: "University of Peradeniya", category: "All-rounder" },
  { name: "Bob White", university: "University of Jaffna", category: "Bowler" },
];

export function SelectYourTeam() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Bowler", "Batsman", "All-rounder"];

  const filteredPlayers =
    selectedCategory === "All"
      ? playersData
      : playersData.filter((player) => player.category === selectedCategory);

  return (
    <div className="mt-12">
      <div className="mb-6">
        <label className="mr-3 font-bold">Select Category:</label>
        <select
          className="p-2 border rounded-lg"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {filteredPlayers.map(({ name, university, category }) => (
          <StatisticsCard key={name} name={name} uni={university} price={"7000"} />
        ))}
      </div>
    </div>
  );
}

export default SelectYourTeam;