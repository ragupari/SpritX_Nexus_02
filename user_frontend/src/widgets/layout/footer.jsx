import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";
import { HeartIcon } from "@heroicons/react/24/solid";

export function Footer({ brandName, brandLink}) {
  const year = new Date().getFullYear();

  return (
    <footer className="py-2">
      <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
        <Typography variant="small" className="font-normal text-inherit">
          &copy; {year}, made
          by{" "}
          
            Team Nexus
          {" "}
          as a project for Mora SpritX Competition.
        </Typography>
      
      </div>
    </footer>
  );
}

Footer.defaultProps = {
  brandName: "Creative Tim",
};

Footer.propTypes = {
  brandName: PropTypes.string,
 
};

Footer.displayName = "/src/widgets/layout/footer.jsx";

export default Footer;
