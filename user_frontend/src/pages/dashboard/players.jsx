import React, { useState , useEffect} from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Button,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon, ArrowUpIcon } from "@heroicons/react/24/outline";


export function Players() {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [playersData, setPlayersData] = useState([]);

  

  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await fetch('http://localhost:3000/api/players');
        const data = await response.json();
        setPlayersData(data.data);

      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
      }

    };
  
    fetchData();
  }, []);


  return (
    <div className="mt-12">
      <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
        <Typography variant="h6" color="white">
          All Available Players
        </Typography>
      </CardHeader>
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
          <CardHeader floated={false} shadow={false} color="transparent" className="m-0 flex items-center justify-between p-6">
            <Typography variant="h6" color="blue-gray">
              Players
            </Typography>
            <Menu placement="left-start">
              <MenuHandler>
                <IconButton size="sm" variant="text" color="blue-gray">
                  <EllipsisVerticalIcon strokeWidth={3} fill="currenColor" className="h-6 w-6" />
                </IconButton>
              </MenuHandler>
              <MenuList>
                <MenuItem>Action</MenuItem>
                <MenuItem>Another Action</MenuItem>
                <MenuItem>Something else here</MenuItem>
              </MenuList>
            </Menu>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["Name", "University", "Category", "View"].map((el) => (
                    <th key={el} className="border-b border-blue-gray-50 py-3 px-6 text-left">
                      <Typography variant="small" className="text-[11px] font-medium uppercase text-blue-gray-400">
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {playersData.map((player) => (
                  <tr key={player.Player_ID}>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <Typography variant="small" color="blue-gray" className="font-bold">
                        {player.Name}
                      </Typography>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <Typography variant="small" color="blue-gray">
                        {player.University}
                      </Typography>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      
                      <Typography variant="small" color="blue-gray">
                        {player.Category}
                      </Typography>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <Button size="sm" onClick={() => {setSelectedPlayer(player)}}>
                        View
                      </Button>
                       
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        </Card>
        <Card className="border border-blue-gray-100 shadow-sm">
          <CardHeader floated={false} shadow={false} color="transparent" className="m-0 p-6">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Player Stats
            </Typography>
          </CardHeader>
          <CardBody className="pt-0">
              {selectedPlayer ? (
                <div>
                  <table className="w-full text-left text-blue-gray-700">
                    <tbody>
                      <tr>
                        <td className="font-medium text-blue-gray-500">Name:</td>
                        <td className="text-lg font-medium">{selectedPlayer.Name}</td>
                      </tr>
                      <tr>
                        <td className="font-medium text-blue-gray-500">University:</td>
                        <td className="text-lg font-medium">{selectedPlayer.University}</td>
                      </tr>
                      <tr>
                        <td className="font-medium text-blue-gray-500">Category:</td>
                        <td className="text-lg font-medium">{selectedPlayer.Category}</td>
                      </tr>
                      <tr>
                        <td className="font-medium text-blue-gray-500">Total Runs:</td>
                        <td className="text-lg font-medium">{selectedPlayer.Total_Runs}</td>
                      </tr>
                      <tr>
                        <td className="font-medium text-blue-gray-500">Balls Faced:</td>
                        <td className="text-lg font-medium">{selectedPlayer.Balls_Faced}</td>
                      </tr>
                      <tr>
                        <td className="font-medium text-blue-gray-500">Innings Played:</td>
                        <td className="text-lg font-medium">{selectedPlayer.Innings_Played}</td>
                      </tr>
                      <tr>
                        <td className="font-medium text-blue-gray-500">Wickets:</td>
                        <td className="text-lg font-medium">{selectedPlayer.Wickets}</td>
                      </tr>
                      <tr>
                        <td className="font-medium text-blue-gray-500">Overs Bowled:</td>
                        <td className="text-lg font-medium">{selectedPlayer.Overs_Bowled}</td>
                      </tr>
                      <tr>
                        <td className="font-medium text-blue-gray-500">Runs Conceded:</td>
                        <td className="text-lg font-medium">{selectedPlayer.Runs_Conceded}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                    ) : (
                      <Typography variant="small" color="blue-gray">
                        Select a player to view stats.
                      </Typography>
                    )}
            </CardBody>

        </Card>
      </div>
    </div>
  );
}

export default Players;
