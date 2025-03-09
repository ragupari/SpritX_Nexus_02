
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
  PencilIcon,
  PlusIcon,
  TrashIcon
} from "@heroicons/react/24/solid";
import CreatePlayer from "../../widgets/pop-up/createPlayer"; // Adjust the path if needed
import UpdatePlayer from "../../widgets/pop-up/updatePlayer";
import ViewPlayer from "../../widgets/pop-up/viewPlayer";
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
  const [isCreatePlayerOpen, setIsCreatePlayerOpen] = useState(false);
  const [playerToEdit, setPlayerToEdit] = useState(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [playerToView, setPlayerToView] = useState(null); // State for the player to view
  const [isViewPopupOpen, setIsViewPopupOpen] = useState(false); // State to control the view popup
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/players"); // Directly fetch from API
        if (!response.ok) {
          throw new Error("Failed to fetch players");
        }
        const result = await response.json(); // Parse the JSON response
        // console.log(result.data);
        if (Array.isArray(result.data)) { // Access the players array within the 'data' property
          setPlayers(result.data); // Set the players
          setFilteredPlayers(result.data); // Set filtered players
        } else {
          console.error("Expected an array, but got:", result.data);
          setFilteredPlayers([]); // Set to an empty array in case of invalid data
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch players:", error);
        setIsLoading(false);
      }
    };


    fetchPlayers(); // Call the fetch function on mount
  }, [players]); // Empty dependency array ensures this runs only once when the component mounts

  const handleCreatePlayer = async (newPlayer) => {
    try {
      const response = await fetch("http://localhost:3000/api/players", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPlayer),
      });

      if (!response.ok) {
        throw new Error("Failed to create player");
      }

      const createdPlayer = await response.json();

      setPlayers((prevPlayers) => [
        createdPlayer, // Add the new player to the list
        ...(prevPlayers || []),
      ]);

      setFilteredPlayers((prevPlayers) => [
        createdPlayer,
        ...(prevPlayers || []),
      ]);
    } catch (error) {
      console.error("Failed to create player:", error);
      alert("An error occurred while creating the player. Please try again.");
    }
  };


  const handleViewClick = (player) => {
    setPlayerToView(player); // Set the player to view
    setIsViewPopupOpen(true); // Open the view player popup
  };

  const closeViewPopup = () => {
    setIsViewPopupOpen(false); // Close the view player popup
    setPlayerToView(null); // Clear the player data
  };
  

  const handleEditClick = (player) => {
    console.log("on edit click",player);
    setPlayerToEdit(player);
    setIsEditPopupOpen(true);
    // setCategoryToDelete(category);
  };
  const handleUpdatePlayer = (updatedPlayer) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.playerId === updatedPlayer.playerId ? updatedPlayer : player,
      ),
    );
    setIsEditPopupOpen(false);
  };

  const handleDeleteClick = (playerId) => {
    setPlayerToDelete(playerId);
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/players/${playerToDelete}`, {
        method: "DELETE", // HTTP DELETE method
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete player");
      }
  
      // Remove the deleted player from the state
      setPlayers((prevPlayers) =>
        prevPlayers.filter((player) => player.Player_ID !== playerToDelete)
      );
  
      setFilteredPlayers((prevPlayers) =>
        prevPlayers.filter((player) => player.Player_ID !== playerToDelete)
      );
  
      setShowDeletePopup(false);
    } catch (error) {
      console.error("Failed to delete player:", error);
      alert("An error occurred while deleting the player. Please try again.");
    }
  };  

  const cancelDelete = () => {
    setPlayerToDelete(null);
    setShowDeletePopup(false);
  };

  const filterByPlayerCategories = async (category) => {
    setIsLoading(true);
    try {
      if (category === "all") {
        setFilteredPlayers(players);
      } else {
        // Corrected to match the exact casing from the object structure
        const categoryFilteredPlayers = players.filter((player) => player.Category === category);
        setFilteredPlayers(categoryFilteredPlayers);
      }
    } catch (error) {
      console.error("Failed to filter players:", error);
      alert("Failed to filter players");
    } finally {
      setIsLoading(false);
    }
  };


  // Pagination Logic
  const indexOfLastPlayer = currentPage * playersPerPage;
  console.log("indexOfLastPlayer", indexOfLastPlayer);
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  console.log("indexOfFirstPlayer", indexOfFirstPlayer);
  const currentPlayers = filteredPlayers.slice(indexOfFirstPlayer, indexOfLastPlayer);

  const totalPages = Math.ceil(filteredPlayers.length / playersPerPage);

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
            onClick={() => setIsCreatePlayerOpen(true)}
            className="bg-white text-black rounded-md p-2 ml-7 hover:bg-gray-400 active:bg-gray-500"
          >
            <PlusIcon className="h-6 w-6" />
          </IconButton>
        </CardHeader>
        <CreatePlayer
          isOpen={isCreatePlayerOpen}
          onClose={() => setIsCreatePlayerOpen(false)}
          onSave={(newPlayer) => handleCreatePlayer(newPlayer)}
        />
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
                filterByPlayerCategories(value);
              }}
              className="bg-white text-gray-700 border border-gray-300 rounded-md "
            >
              <Option value="all" className="bg-white text-gray-700 hover:bg-gray-100">
                All
              </Option>
              <Option
                value="Batsman"
                className="bg-white text-gray-700 hover:bg-gray-100"
              >
                Batsman
              </Option>
              <Option
                value="Bowler"
                className="bg-white text-gray-700 hover:bg-gray-100"
              >
                Bowler
              </Option>
              <Option
                value="All-Rounder"
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
                          {player.Name}
                        </Typography>
                      </td>
                      <td className="py-3 px-5">
                        <Typography
                          variant="small"
                          className="font-semibold text-blue-gray-600"
                        >
                          {player.University}
                        </Typography>
                      </td>
                      <td className="py-3 px-5">
                        <Typography
                          className={`text-sm ${player.Category === "Batsman" ? "font-semibold text-green-500" :
                            player.Category === "Bowler" ? "font-semibold text-yellow-700" :
                              player.Category === "All-Rounder" ? "font-semibold text-red-500" : "text-blue-gray-700"}`}
                        >
                          {player.Category === "Batsman" ? "Batsman" :
                            player.Category === "Bowler" ? "Bowler" :
                              player.Category === "All-Rounder" ? "All-Rounder" : player.Category}
                        </Typography>
                      </td>
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-4">
                        <IconButton onClick={() => handleViewClick(player)} size="sm" variant="text">
                            <EyeIcon className="h-5 w-5 text-gray-600" />
                          </IconButton>
                          <IconButton
                              onClick={() => handleEditClick(player)}
                              size="sm"
                              variant="text"
                            >
                              <PencilIcon className="h-5 w-5 text-gray-600" />
                            </IconButton>
                          <IconButton
                            onClick={() => handleDeleteClick(player.Player_ID
                            )}
                            size="sm"
                            variant="text"
                          >
                            <TrashIcon className="h-5 w-5 text-gray-600" />
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
      <UpdatePlayer
        isOpen={isEditPopupOpen}
        onClose={() => setIsEditPopupOpen(false)}
        player={playerToEdit}
        onSave={handleUpdatePlayer}
      />
      <ViewPlayer isOpen={isViewPopupOpen} onClose={closeViewPopup} player={playerToView} />
    </div>
  );
}

export default Players;
