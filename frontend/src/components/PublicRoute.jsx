import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PublicRoute() {
  const { user } = useSelector((state) => state.auth);

  // If logged in, block access to login/register
  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

