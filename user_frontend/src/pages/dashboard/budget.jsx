import { BudgetRemaining } from "@/widgets/cards";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";



export function Budget() {
  
  const [playersData, setPlayersData] = useState([]);
  const [remainingBudget, setRemainingBudget] = useState(9000000);
  const playerCount = playersData.length;

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/teams/17/players');
        const data = await response.json();
        setPlayersData(data.data);
        calculateRemainingBudget(data.data);
      } catch (error) {
        console.error('Failed to fetch team players:', error);
      }
    };

    fetchPlayers();
  }, []);

  const calculateRemainingBudget = (players) => {
    const totalSpent = players.reduce((acc, player) => acc + player.Value_in_Rupees, 0);
    setRemainingBudget(remainingBudget - totalSpent);
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-2">
        <BudgetRemaining budget={remainingBudget} /> {/* Convert string to number */}
      </div>

      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            My Team Players
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Player", "University", "Category", "Amount Spent"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {playersData.map((player) => {
                const className = `py-3 px-5 ${
                  player === playersData.length - 1 ? "" : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={player.Player_ID}> {/* Name used as key */}
                    <td className={className}>
                      <div className="flex items-center gap-4">
                        <Typography variant="small" color="blue-gray" className="font-semibold">
                          {player.Name}
                        </Typography>
                      </div>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {player.University}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {player.Category}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        LKR {player.Value_in_Rupees}
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Budget;
