import {
  Alert,
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Start submitting

    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          role: "user",
        }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem("authToken", data.token);
        setSuccessMessage(data.message);
        setTimeout(() => {
          navigate("/"); // Redirect to home after 2 seconds
        }, 2000);
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Try again.");
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to Sign In.</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleLogin}>
          <div className="mb-1 flex flex-col gap-6">
            {error &&  <Alert className="rounded-none border-l-4 border-[#ff5021] bg-[#f67b5a]/10 font-medium text-[#ff5021]">
              {error}
            </Alert>}
            {successMessage && <Alert className="rounded-none border-l-4 border-[#28a745] bg-[#66d98f]/10 font-medium text-[#28a745]">
              {successMessage}
            </Alert>}
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">Your email</Typography>
            <Input size="lg" placeholder="name@mail.com" className=" !border-t-blue-gray-200 focus:!border-t-gray-900" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">Password</Typography>
            <Input type="password" size="lg" placeholder="********" className=" !border-t-blue-gray-200 focus:!border-t-gray-900" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button type="submit" className="mt-6" fullWidth disabled={isSubmitting}>{isSubmitting ? "Signing In..." : "Sign In"}</Button>
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Not registered? <Link to="/auth/sign-up" className="text-gray-900 ml-1">Create account</Link>
          </Typography>
        </form>
      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img src="/img/sprit11.png" className="h-full w-full object-cover rounded-3xl" />
      </div>
    </section>
  );
}

export default SignIn;
