import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import UploadTasks from "./pages/UploadTasks";
import Agents from "./pages/Agents";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/upload-tasks"
        element={
          <ProtectedRoute>
            <UploadTasks />
          </ProtectedRoute>
        }
      />
      <Route
        path="/agents"
        element={
          <ProtectedRoute>
            <Agents />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
