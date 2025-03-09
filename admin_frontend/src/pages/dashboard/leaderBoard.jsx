import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

export function LeaderBoard() {
  const [usersTableData, setUsersTableData] = useState([]);
  const [currentUsername, setCurrentUsername] = useState(""); // Set this dynamically if needed

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/teams/leaderboard"); // Adjust API URL if needed
        const data = await response.json();
        console.log("Leaderboard data:", data);
        console.log("Leaderboard data.data:", data.data); 
        if (data.data) {
          setUsersTableData(
            data.data.map((user, index) => ({
              username: user.user_name,
              points: user.total_points,
              rank: index + 1, // Assign rank based on sorted order
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  // Find the current user object based on currentUsername
  const currentUser = usersTableData.find((user) => user.username === currentUsername);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between items-center">
          <Typography variant="h6" color="white">
            Leaderboard
          </Typography>
          {currentUser && (
            <div className="flex items-center gap-2">
              <Typography variant="h6" color="white">
                Rank: {currentUser.rank}
              </Typography>
              <Typography variant="h6" color="white">
                Points: {currentUser.points}
              </Typography>
            </div>
          )}
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Username", "Points", "Rank"].map((el) => (
                  <th key={el} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {usersTableData.map(({ username, points, rank }, key) => {
                const className = `py-3 px-5 ${key === usersTableData.length - 1 ? "" : "border-b border-blue-gray-50"}`;
                const highlightClass = username === currentUsername ? "bg-blue-100" : "";

                return (
                  <tr key={username} className={highlightClass}>
                    <td className={className}>
                      <Typography variant="small" color="blue-gray" className="font-semibold">
                        {username}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">{points}</Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">{rank}</Typography>
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

export default LeaderBoard;
