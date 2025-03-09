import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import React from "react";

export function BudgetRemaining({ budget }) {

  return (
    <Card className="w-96 border border-blue-gray-100 shadow-sm">
      <CardBody className="p-4 text-right text-center">
      <Typography variant="h2" color="text-blue-500">
      <span className="text-green-500"> <i className="bi bi-cash-coin"></i> {budget}</span>

</Typography>
       <Typography className="font-normal text-blue-gray-600">
          LKR
        </Typography>
      </CardBody>
       <CardFooter className="border-t border-blue-gray-50 p-4">
              <Typography
                className={`text-center font-normal`}
              >
      Remaining Amount of Budget
              </Typography>
            </CardFooter>

    </Card>
  );
}

BudgetRemaining.defaultProps = {
  budget: null,
};
BudgetRemaining.propTypes = {
  budget: PropTypes.number.isRequired,
};
BudgetRemaining.displayName = "BudgetPlayers";

export default BudgetRemaining;
