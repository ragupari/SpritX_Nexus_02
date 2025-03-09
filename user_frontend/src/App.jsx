import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { PrivateRoute } from "./components/privateRoute"; 

function App() {
  return (
    <Routes>
    {/* Public Routes (Authentication Pages) */}
    <Route path="/auth/*" element={<Auth />} />

    {/* Protected Routes (Dashboard Pages) */}
    <Route element={<PrivateRoute />}>
      <Route path="/dashboard/*" element={<Dashboard />} />
    </Route>

    {/* Redirect all unknown paths to Dashboard */}
    <Route path="*" element={<Navigate to="/dashboard/team" replace />} />
  </Routes>
  
  );
}

export default App;
