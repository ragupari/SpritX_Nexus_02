import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const token = localStorage.getItem("authToken"); // Check for auth token

  return token ? <Outlet /> : <Navigate to="/auth/sign-in" replace />;
};

export default PrivateRoute;