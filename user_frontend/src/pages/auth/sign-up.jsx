import { Alert, Card, Input, Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!name) {
      setError("Enter your name");
      setIsSubmitting(false);
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      setIsSubmitting(false);
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters long, include 1 letter, 1 number, and 1 special character.");
      setIsSubmitting(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(data.message); // Success message
        setError(null); // Clear error if success
        setTimeout(() => {
          navigate("/auth/sign-in"); // Redirect after 2 seconds
        }, 2000);
      } else {
        setError(data.message || "Something went wrong. Try again.");
        setMessage(""); // Clear success message if error occurs
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Something went wrong. Try again.");
      setMessage(""); // Clear success message if error occurs
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="m-8 flex">
      <div className="w-full lg:w-3/5">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign Up</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your details to create an account.</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSignUp}>
          {error &&  <Alert className="rounded-none border-l-4 border-[#ff5021] bg-[#f67b5a]/10 font-medium text-[#ff5021]">
            {error}
          </Alert>}
          {message &&  <Alert className="rounded-none border-l-4 border-[#4caf50] bg-[#81c784]/10 font-medium text-[#4caf50]">
            {message}
          </Alert>}
          <div className="mt-1 mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">Your Name</Typography>
            <Input size="lg" placeholder="Your Name" className=" !border-t-blue-gray-200 focus:!border-t-gray-900" value={name} onChange={(e) => setName(e.target.value)} />
            
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">Your email</Typography>
            <Input size="lg" placeholder="name@mail.com" className=" !border-t-blue-gray-200 focus:!border-t-gray-900" value={email} onChange={(e) => setEmail(e.target.value)} />
            
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">Password</Typography>
            <Input type="password" size="lg" placeholder="********" className=" !border-t-blue-gray-200 focus:!border-t-gray-900" value={password} onChange={(e) => setPassword(e.target.value)} />
            
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">Confirm Password</Typography>
            <Input type="password" size="lg" placeholder="********" className=" !border-t-blue-gray-200 focus:!border-t-gray-900" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          
          <Button type="submit" className="mt-6" fullWidth disabled={isSubmitting}>{isSubmitting ? "Signing Up..." : "Sign Up"}</Button>

          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Already registered? <Link to="/auth/sign-in" className="text-gray-900 ml-1">Sign in</Link>
          </Typography>
        </form>
      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img src="/img/sprit11.png" className="h-full w-full object-cover rounded-3xl" />
      </div>
    </section>
  );
}

export default SignUp;
