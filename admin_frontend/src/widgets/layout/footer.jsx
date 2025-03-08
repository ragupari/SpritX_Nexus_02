import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";

export function Footer({ brandName, brandLink}) {
  const year = new Date().getFullYear();

  return (
    <footer className="py-2">
      <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
        <Typography variant="small" className="font-normal text-inherit">
        {" "}
          <a
            href= "#"
            target="_blank"
            className="transition-colors hover:text-blue-500 font-bold"
          >
            {brandName}
          </a>{" "}
          
        </Typography>
       
      </div>
    </footer>
  );
}

Footer.defaultProps = {
  brandName: "Team Nexus",
};

Footer.propTypes = {
  brandName: PropTypes.string,
 
};

Footer.displayName = "/src/widgets/layout/footer.jsx";

export default Footer;
