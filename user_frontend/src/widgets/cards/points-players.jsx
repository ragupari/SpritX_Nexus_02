import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import React from "react";

export function PointsPlayers({ budget }) {

  return (
    <Card className="w-96 border border-blue-gray-100 shadow-sm">
      <CardBody className="p-4 text-right text-center">
      <Typography variant="h2" color="text-blue-500">
      <span className="text-blue-600">{budget}</span>

</Typography>
       <Typography className="font-normal text-blue-gray-600">
          Points 
        </Typography>
      </CardBody>
       <CardFooter className="border-t border-blue-gray-50 p-4">
              <Typography
                className={`text-center font-normal`}
              >
      Total Points Of The Team
              </Typography>
            </CardFooter>

    </Card>
  );
}

PointsPlayers.defaultProps = {
  budget: null,
};
PointsPlayers.propTypes = {
  budget: PropTypes.number.isRequired,
};
PointsPlayers.displayName = "BudgetPlayers";

export default PointsPlayers;
