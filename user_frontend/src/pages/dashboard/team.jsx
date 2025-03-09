import { NoOfPlayers, PointsPlayers } from "@/widgets/cards";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

const playersData = [
  {
    img: "https://via.placeholder.com/40", // Replace with actual image URL
    name: "John Doe",
    university: "University of Moratuwa",
    category: "Bowler",
  },
  {
    img: "https://via.placeholder.com/40",
    name: "Jane Smith",
    university: "University of Colombo",
    category: "Batsman",
  },
  {
    img: "https://via.placeholder.com/40",
    name: "Alex Johnson",
    university: "University of Peradeniya",
    category: "All-Rounder",
  },
  {
    img: "https://via.placeholder.com/40",
    name: "Sarah Lee",
    university: "University of Moratuwa",
    category: "Batsman",
  },
  {
    img: "https://via.placeholder.com/40",
    name: "Michael Brown",
    university: "University of Colombo",
    category: "Bowler",
  },
  {
    img: "https://via.placeholder.com/40",
    name: "Chris Green",
    university: "University of Peradeniya",
    category: "All-Rounder",
  },
  {
    img: "https://via.placeholder.com/40",
    name: "Emily White",
    university: "University of Moratuwa",
    category: "Bowler",
  },
  {
    img: "https://via.placeholder.com/40",
    name: "Daniel Black",
    university: "University of Colombo",
    category: "Batsman",
  },
  {
    img: "https://via.placeholder.com/40",
    name: "Sophia Blue",
    university: "University of Peradeniya",
    category: "All-Rounder",
  },
  {
    img: "https://via.placeholder.com/40",
    name: "William Gray",
    university: "University of Moratuwa",
    category: "Bowler",
  },
  {
    img: "https://via.placeholder.com/40",
    name: "Olivia Red",
    university: "University of Colombo",
    category: "Batsman",
  }
];


export function Team() {
  const playerCount = playersData.length;


  return (

    <div className="mt-12 mb-8 flex flex-col gap-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-2">
      <NoOfPlayers count={playerCount} />
        {playerCount == 11 && <PointsPlayers budget="457.666" />}
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
                {["Player", "University", "Category"].map((el) => (
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
              {playersData.map(({ name, university, category }, key) => {
                const className = `py-3 px-5 ${
                  key === playersData.length - 1 ? "" : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={name}>
                    <td className={className}>
                      <div className="flex items-center gap-4">
                        <Typography variant="small" color="blue-gray" className="font-semibold">
                          {name}
                        </Typography>
                      </div>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {university}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {category}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography as="a" href="#" className="text-xs font-semibold text-red-600">
                        Remove
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

export default Team;
