import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

// Replace authorsTableData with the new users JSON array
const usersTableData = [
  {
    username: "User One",
    points: 1200,
    rank: 1,
  },
  {
    username: "User Two",
    points: 1100,
    rank: 2,
  },
  {
    username: "User Three",
    points: 1000,
    rank: 3,
  },
  {
    username: "User Four",
    points: 900,
    rank: 4,
  },
  {
    username: "User Five",
    points: 850,
    rank: 5,
  },
  {
    username: "User Six",
    points: 800,
    rank: 6,
  },
  {
    username: "User Seven",
    points: 750,
    rank: 7,
  },
  {
    username: "User Eight",
    points: 700,
    rank: 8,
  },
  {
    username: "User Nine",
    points: 650,
    rank: 9,
  },
  {
    username: "User Ten",
    points: 600,
    rank: 10,
  },
];

// Replace this with the current username (can be passed as prop or state)
const currentUsername = "User Three"; // For example, this can be dynamically set

// Find the current user object based on currentUsername
const currentUser = usersTableData.find(user => user.username === currentUsername);

export function LeaderBoard() {
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between items-center">
          <Typography variant="h6" color="white">
            Leaderboard
          </Typography>
          {/* Display current user's rank and points on the right end of the header */}
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
                {["username", "points", "rank"].map((el) => (
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
              {usersTableData.map(({ username, points, rank }, key) => {
                const className = `py-3 px-5 ${
                  key === usersTableData.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                }`;

                // Highlight the row if the current username matches the username in the table
                const highlightClass = username === currentUsername ? 'bg-blue-100' : '';

                return (
                  <tr key={username} className={highlightClass}>
                    <td className={className}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold"
                      >
                        {username}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {points}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {rank}
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

export default LeaderBoard;
