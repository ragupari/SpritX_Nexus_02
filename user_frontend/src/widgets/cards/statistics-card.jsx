import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import PropTypes from "prop-types";

export function StatisticsCard({ uni, name, price }) {
  return (
    <Card className="border border-blue-gray-100 shadow-sm">
      <CardBody className="p-4 text-center">
        <Typography variant="h4" color="blue-gray">
          {name}
        </Typography>
        <Typography variant="small" className="font-medium text-blue-gray-600">
          {uni}
        </Typography>
        <Typography variant="small" className="font-medium text-begin pt-2 text-green-500 text-md">
          <i className="bi bi-cash-coin text-green-500"></i> {price} LKR
        </Typography>
      </CardBody>
      {price && (
        <CardFooter className="border-t text-center border-blue-gray-50 p-4">
          <Typography className="font-normal text-blue-gray-600">
            <a href="#"><strong>Add to my team</strong></a>
          </Typography>
        </CardFooter>
      )}
    </Card>
  );
}

StatisticsCard.propTypes = {
  price: PropTypes.node.isRequired,
  name: PropTypes.node.isRequired,
  uni: PropTypes.node.isRequired,
};

StatisticsCard.displayName = "/src/widgets/cards/statistics-card.jsx";

export default StatisticsCard;