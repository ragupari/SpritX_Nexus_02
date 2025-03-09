import { BudgetRemaining } from "@/widgets/cards";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

const playersData = [
  {
    name: "John Doe",
    university: "University of Moratuwa",
    category: "Bowler",
    amountSpent: "450000" // Changed value to be within 100000-500000
  },
  {
    name: "Jane Smith",
    university: "University of Colombo",
    category: "Batsman",
    amountSpent: "200000"
  },
  {
    name: "Alex Johnson",
    university: "University of Peradeniya",
    category: "All-Rounder",
    amountSpent: "350000"
  },
  {
    name: "Sarah Lee",
    university: "University of Moratuwa",
    category: "Batsman",
    amountSpent: "120000"
  },
  {
    name: "Michael Brown",
    university: "University of Colombo",
    category: "Bowler",
    amountSpent: "475000"
  },
  {
    name: "Chris Green",
    university: "University of Peradeniya",
    category: "All-Rounder",
    amountSpent: "490000"
  },
  {
    name: "Emily White",
    university: "University of Moratuwa",
    category: "Bowler",
    amountSpent: "150000"
  },
  {
    name: "Daniel Black",
    university: "University of Colombo",
    category: "Batsman",
    amountSpent: "460000"
  },
  {
    name: "Sophia Blue",
    university: "University of Peradeniya",
    category: "All-Rounder",
    amountSpent: "200000"
  },
  {
    name: "William Gray",
    university: "University of Moratuwa",
    category: "Bowler",
    amountSpent: "320000"
  },
  {
    name: "Olivia Red",
    university: "University of Colombo",
    category: "Batsman",
    amountSpent: "180000"
  }
];

export function Budget() {
  const playerCount = playersData.length;

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-2">
        <BudgetRemaining budget={5000000} /> {/* Convert string to number */}
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
              {playersData.map(({ name, university, category, amountSpent }, key) => {
                const className = `py-3 px-5 ${
                  key === playersData.length - 1 ? "" : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={name}> {/* Name used as key */}
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
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        LKR {amountSpent}
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
