import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function SignUp() {
  return (
    <section className="m-8 flex flex-col lg:flex-row">
      {/* Image section hidden on small screens */}
      <div className="w-full lg:w-2/5 h-full hidden lg:block">
        <img
          src="/img/sprit11.png"
          className="h-full w-full object-cover rounded-3xl"
          alt="Sprit11"
        />
      </div>

      {/* Form section */}
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h1" className="font-bold mb-4">Sprit11</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Join Us Today! Register here.</Typography>
        </div>

        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          {/* Team Name Input */}
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Team Name
            </Typography>
            <Input
              size="lg"
              placeholder="Enter your team name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          {/* Password Input */}
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              size="lg"
              type="password"
              placeholder="Enter your password"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          {/* Confirm Password Input */}
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Confirm Password
            </Typography>
            <Input
              size="lg"
              type="password"
              placeholder="Confirm your password"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          <Button className="mt-6" fullWidth>
            Register Now
          </Button>

          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Already have an account?
            <Link to="/auth/sign-in" className="text-gray-900 ml-1">Sign in</Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
