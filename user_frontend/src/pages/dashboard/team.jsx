import { useState, useEffect } from "react";
import { NoOfPlayers, PointsPlayers } from "@/widgets/cards";
import { fetchId } from "../../../Login";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

export function Team() {
  const [id, setId] = useState(null);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [budget, setBudget] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const userId = await fetchId();
      setId(userId);
    };
    fetchUserId();
  }, []); // Runs only once when the component mounts

  useEffect(() => {
    if (!id) return; // Ensure we have an ID before making the request

    const fetchPlayers = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/api/teams/${id}/players`);
        if (!response.ok) throw new Error("Failed to fetch players");
        const data = await response.json();
        setPlayers(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    const fetchBudget = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/api/teams/${id}/players`);
        if (!response.ok) throw new Error("Failed to fetch players");
        const data = await response.json();
        setBudget(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBudget();
    fetchPlayers();
  }, [id]); // Fetch players only when id is available

  const handleRemovePlayer = async (playerId) => {
    if (!id) return; // Ensure user ID is available

    try {
      const response = await fetch(`http://localhost:3000/api/teams/remove-player`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          playerId: playerId,
          userId: id,
        }),
      });

      if (!response.ok) throw new Error("Failed to remove player");

      setPlayers((prevPlayers) => prevPlayers.filter((player) => player.Player_ID !== playerId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading players...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-2">
        <NoOfPlayers count={players.length} />
        {players.length === 11 && <PointsPlayers budget="457.666" />}
      </div>

      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            My Team Players {id}
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Player", "University", "Category", "Actions"].map((el) => (
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
              </tr>
            </thead>
            <tbody>
              {players.length > 0 ? (
                players.map((player) => (
                  <tr key={player.Player_ID}>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold cursor-pointer"
                      >
                        {player.Name}
                      </Typography>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {player.University}
                      </Typography>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {player.Category}
                      </Typography>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <Button
                        size="sm"
                        color="red"
                        onClick={() => handleRemovePlayer(player.Player_ID)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-3 px-5 text-center text-gray-500">
                    No players available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Team;
