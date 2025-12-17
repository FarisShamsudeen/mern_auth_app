import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ adminOnly = false }) {
  const { user } = useSelector((state) => state.auth);

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Admin-only route
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

