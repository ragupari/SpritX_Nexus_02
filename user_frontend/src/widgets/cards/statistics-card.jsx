import React from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import PropTypes from "prop-types";

export function StatisticsCard({ uni, name, price, onClick }) {
  return (
    <Card className="border border-blue-gray-100 shadow-sm">
      <CardBody className="p-4 text-center">
        <Typography variant="h4" color="blue-gray">{name}</Typography>
        <Typography variant="small" className="font-medium text-blue-gray-600">{uni}</Typography>
        <Typography variant="small" className="font-medium text-green-500 pt-2">{price} LKR</Typography>
      </CardBody>
      <CardFooter className="border-t border-blue-gray-50 p-4 text-center">
        <Button color="blue-gray" onClick={onClick}>Add to My Team</Button>
      </CardFooter>
    </Card>
  );
}

StatisticsCard.propTypes = {
  uni: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default StatisticsCard;
