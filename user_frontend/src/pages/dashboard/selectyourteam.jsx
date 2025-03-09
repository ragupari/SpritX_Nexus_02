import React, { useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { StatisticsCard } from "@/widgets/cards";
import "bootstrap-icons/font/bootstrap-icons.css";

export function SelectYourTeam() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [playersData, setPlayersData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/players');
        const data = await response.json();
        setPlayersData(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Uncomment setError if you have defined it elsewhere in your code
        // setError('Failed to fetch data');
      }
    };
  
    fetchData();
  }, []);

  const categories = ["All", "Bowler", "Batsman", "All-Rounder"];
  const filteredPlayers = playersData
    .filter((player) => {
      return selectedCategory === "All" || player.Category === selectedCategory;
    })
    .filter((player) => {
      return player.Name.toLowerCase().includes(searchTerm.toLowerCase());
    });

  return (
    <div className="mt-12">
      <div className="flex justify-between items-center mb-6">
        <div>
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
        <div  className="relative max-w-sm w-full">
          <input
            type="text"
            placeholder="Search by name..."
            className="w-full p-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {filteredPlayers.map((player) => (
          <StatisticsCard key={player.Name} name={player.Name} uni={player.University} price={player.Value_in_Rupees} />
        ))}
      </div>
    </div>
  );
}

export default SelectYourTeam;
