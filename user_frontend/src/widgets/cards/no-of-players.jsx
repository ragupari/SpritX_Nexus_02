import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import React from "react";

export function NoOfPlayers({ count }) {
  const remainingPlayers = 11 - count;
  const isFull = (count == 11);
  const footerText = isFull
    ? "Your team is full"
    : `You need ${remainingPlayers} more player(s) to fill the team`;

  return (
    <Card className="w-96 border border-blue-gray-100 shadow-sm">
      <CardBody className="p-4 text-right">
        <Typography variant="h2" color="blue-gray">
          <span className={`${
            isFull ? "text-green-500" : "text-orange-500"
          }`}> {count}</span>/11
        </Typography>
        <Typography className="font-normal text-blue-gray-600">
          Player(s) in the team
        </Typography>
      </CardBody>

      <CardFooter className="border-t border-blue-gray-50 p-4">
        <Typography
          className={`text-center font-normal ${
            isFull ? "text-green-500" : "text-orange-500"
          }`}
        >
          {footerText}
        </Typography>
      </CardFooter>
    </Card>
  );
}

NoOfPlayers.defaultProps = {
  count: 0,
};

NoOfPlayers.propTypes = {
  count: PropTypes.number.isRequired,
};

NoOfPlayers.displayName = "NoOfPlayers";

export default NoOfPlayers;
