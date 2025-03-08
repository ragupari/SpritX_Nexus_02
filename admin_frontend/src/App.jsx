// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { Dashboard, Auth } from "@/layouts";
// // import PrivateRoute from "./components/privateRoute.js"; 

// function App() {
//   return (
//     // <Router>
//     //   <Routes>
//     //     {/* Public Routes */}
//     //     <Route path="/auth/sign-in" element={<Auth />} />

//     //     {/* Protected Routes */}
//     //     <Route element={<PrivateRoute />}>
//     //       <Route path="/dashboard/*" element={<Dashboard />} />
//     //       <Route path="/auth/*" element={<Auth />} />
//     //       <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
//     //       {/* Add more protected routes here */}
//     //     </Route>
//     //   </Routes>
//     // </Router>
//     <Routes>
//       <Route path="/dashboard/*" element={<Dashboard />} />
//       <Route path="/auth/*" element={<Auth />} />
//       <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
//     </Routes>
//   );
// }

// export default App;
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
        <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
      </Routes>
  );
}

export default App;

