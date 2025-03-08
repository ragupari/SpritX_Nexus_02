
import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  IconButton,
  Select,
  Option,
  Button,
} from "@material-tailwind/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
// import { FiEye, FiEdit, FiTrash, FiPlus } from "react-icons/fi";
import {
  EyeIcon,
} from "@heroicons/react/24/solid";
// import PlayerService from "../../services/player.service"; // Update this to match your player service
// import { formatDateAndTime, calculateTimeRemaining } from "../../utils/date"; // Adjust these if necessary

export function Players() {
  const [players, setPlayers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [playersPerPage, setPlayersPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [playerToDelete, setPlayerToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/players"); // Directly fetch from API
        if (!response.ok) {
          throw new Error("Failed to fetch players");
        }
        const data = await response.json(); // Parse the JSON response
        setPlayers(data);
        setFilteredPlayers(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch players:", error);
        setIsLoading(false);
      }
    };

    fetchPlayers(); // Call the fetch function on mount
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const handleViewClick = (playerId) => {
    navigate(`../view-player/${playerId}`);
  };

  const handleEditClick = (playerId) => {
    navigate(`../edit-player/${playerId}`);
  };

  const handleDeleteClick = (playerId) => {
    setPlayerToDelete(playerId);
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    try {
      await PlayerService.delete(playerToDelete);
      setPlayers((prevPlayers) =>
        prevPlayers.filter((player) => player.id !== playerToDelete)
      );
      setFilteredPlayers((prevPlayers) =>
        prevPlayers.filter((player) => player.id !== playerToDelete)
      );
      setShowDeletePopup(false);
    } catch (error) {
      console.error("Failed to delete player:", error);
    }
  };

  const cancelDelete = () => {
    setPlayerToDelete(null);
    setShowDeletePopup(false);
  };

  const filterByPlayerStatus = async (status) => {
    setIsLoading(true);
    try {
      if (status === "all") {
        setFilteredPlayers(players);
      } else {
        const statusFilteredPlayers = players.filter((player) => player.status === status);
        setFilteredPlayers(statusFilteredPlayers);
      }
    } catch (error) {
      console.error("Failed to fetch players:", error);
      alert("Failed to fetch players");
    } finally {
      setIsLoading(false);
    }
  };

  // Pagination Logic
  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = filteredPlayers.slice(indexOfFirstPlayer, indexOfLastPlayer);

  const totalPages = Math.ceil(players.length / playersPerPage);

  const next = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-8 p-6 flex justify-between relative"
        >
          <Typography variant="h6" color="white">
            Player Table
          </Typography>

          <IconButton
            size="sm"
            variant="text"
            onClick={() => navigate("../create-player")}
            className="bg-white text-black rounded-md p-2 ml-7 hover:bg-gray-400 active:bg-gray-500"
          >
            <EyeIcon className="h-6 w-6" />
          </IconButton>
        </CardHeader>

        <div className="flex items-center justify-between gap-4 px-6 max-w-md">
          <div
            className={`relative z-10 flex-grow`}
            style={{
              opacity: showDeletePopup ? 0.2 : 1,
              pointerEvents: showDeletePopup ? "none" : "auto",
            }}
          >
            <Select
              label="Filter by Player Category"
              onChange={(value) => {
                filterByPlayerStatus(value);
              }}
              className="bg-white text-gray-700 border border-gray-300 rounded-md "
            >
              <Option value="all" className="bg-white text-gray-700 hover:bg-gray-100">
                All
              </Option>
              <Option
                value="batsman"
                className="bg-white text-gray-700 hover:bg-gray-100"
              >
                Batsman
              </Option>
              <Option
                value="baller"
                className="bg-white text-gray-700 hover:bg-gray-100"
              >
                Baller
              </Option>
              <Option
                value="all-rounder"
                className="bg-white text-gray-700 hover:bg-gray-100"
              >
                All-Rounder
              </Option>
            </Select>
          </div>
          <Select
            label="Select players per page"
            value={playersPerPage.toString()}
            className="bg-white text-gray-700 border border-gray-300 rounded-md"
            onChange={(value) => {
              setPlayersPerPage(Number(value));
              setCurrentPage(1);
            }}
            menuPlacement="bottom"
            menuPosition="fixed"
          >
            <Option
              className="bg-white text-gray-700 hover:bg-gray-100"
              value="10"
            >
              10
            </Option>
            <Option
              className="bg-white text-gray-700 hover:bg-gray-100"
              value="50"
            >
              20
            </Option>
            <Option
              className="bg-white text-gray-700 hover:bg-gray-100"
              value="100"
            >
              30
            </Option>
            <Option
              className="bg-white text-gray-700 hover:bg-gray-100"
              value="500"
            >
              100
            </Option>
          </Select>
        </div>

        <CardBody className="px-2 pt-0 pb-2">
          <div className="min-w-full overflow-x-auto">
            <table className="w-full min-w-[640px] table-auto border-collapse">
              <thead>
                <tr>
                  {["Player Name", "University", "Category", "Actions"].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-sm font-bold uppercase text-blue-gray-700"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {isLoading
                  ? Array.from({ length: playersPerPage }).map((_, index) => (
                      <tr
                        key={index}
                        className="border-b border-blue-gray-50 animate-pulse"
                      >
                        <td className="py-3 px-5">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </td>
                        <td className="py-3 px-5">
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </td>
                        <td className="py-3 px-5">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </td>
                        <td className="py-3 px-5">
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </td>
                      </tr>
                    ))
                  : currentPlayers.length > 0 ? currentPlayers.map((player, key) => (
                      <tr
                        key={player.id}
                        className={`${key === currentPlayers.length - 1
                            ? ""
                            : "border-b border-blue-gray-50 text-xs"
                          }`}
                      >
                        <td className="py-3 px-5">
                          <Typography
                            variant="small"
                            className="font-semibold text-blue-gray-600"
                          >
                            {player.name}
                          </Typography>
                        </td>
                        <td className="py-3 px-5">
                          <Typography
                            className={`text-sm ${player.category === "batsman" ? "font-semibold text-green-500" :
                              player.category === "baller" ? "font-semibold text-yellow-700" :
                                player.category === "all-rounder" ? "font-semibold text-red-500" : "text-blue-gray-700"}`}
                          >
                            {player.category === "batsman" ? "Batsman" :
                              player.category === "baller" ? "Baller" :
                                player.category === "all-rounder" ? "All-Rounder" : player.category}
                          </Typography>
                        </td>
                        <td className="py-3 px-5">
                          <div className="flex items-center gap-4">
                            <IconButton
                              onClick={() => handleViewClick(player.id)}
                              size="sm"
                              variant="text"
                            >
                              <EyeIcon className="h-5 w-5 text-gray-600" />
                            </IconButton>
                            <IconButton
                              onClick={() => handleEditClick(player.id)}
                              size="sm"
                              variant="text"
                            >
                              <EyeIcon className="h-5 w-5 text-gray-600" />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDeleteClick(player.id)}
                              size="sm"
                              variant="text"
                            >
                              <EyeIcon className="h-5 w-5 text-gray-600" />
                            </IconButton>
                          </div>
                        </td>
                      </tr>
                    )) : <div className="w-full text-center mt-6">No Players to show</div>
                }
              </tbody>
            </table>
          </div>
          <div
            className={`flex justify-center items-center gap-4 my-4 ${isLoading ? "hidden" : ""
              }`}
          >
            <Button
              variant="text"
              className="flex items-center gap-2 rounded-full"
              onClick={prev}
              disabled={currentPage === 1}
            >
              <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;
                return (
                  <IconButton
                    key={page}
                    variant={currentPage === page ? "filled" : "text"}
                    color={currentPage === page ? "black" : "gray"}
                    onClick={() => setCurrentPage(page)}
                    className="rounded-full"
                  >
                    {page}
                  </IconButton>
                );
              })}
            </div>

            <Button
              variant="text"
              className="flex items-center gap-2 rounded-full"
              onClick={next}
              disabled={currentPage === totalPages}
            >
              Next
              <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </Button>
          </div>
        </CardBody>
        {showDeletePopup && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <Card className="max-w-md">
              <CardBody className="text-center">
                <Typography color="blue-gray" variant="h5" className="mb-6">
                  Are you sure you want to delete this player?
                </Typography>
                <div className="flex justify-center gap-4">
                  <Button color="red" onClick={confirmDelete}>
                    Yes
                  </Button>
                  <Button color="gray" onClick={cancelDelete}>
                    No
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        )}
      </Card>
    </div>
  );
}

export default Players;
