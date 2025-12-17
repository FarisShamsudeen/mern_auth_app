import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { logout } from "../redux/slices/authSlice";

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl sm:text-2xl font-bold text-blue-600"
            onClick={() => setMenuOpen(false)}
          >
            {user?.role === "admin" ? "MERN AUTH ADMIN" : "MERN AUTH USER"}
          </Link>

          {/* Hamburger (mobile only) */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

        {/* Menu */}
        <div
          className={`
            ${menuOpen ? "block" : "hidden"}
            md:block
            absolute md:static top-16 left-0 w-full md:w-auto
            bg-white md:bg-transparent
            border-t md:border-0
            shadow-md md:shadow-none
          `}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 p-4 md:p-0">
            {/* Authenticated links */}
            {user && (
              <>
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className="font-medium text-gray-700 hover:text-blue-600"
                >
                  Home
                </Link>

                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="font-medium text-gray-700 hover:text-blue-600"
                >
                  Profile
                </Link>

                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    onClick={() => setMenuOpen(false)}
                    className="font-medium text-gray-700 hover:text-blue-600"
                  >
                    Dashboard
                  </Link>
                )}
              </>
            )}

            {/* Guest links */}
            {!user && (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-center"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-200 transition text-center"
                >
                  Register
                </Link>
              </>
            )}

            {/* User info & logout */}
            {user && (
              <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
                <div className="flex items-center gap-2">
                  {user.profileImage && (
                    <img
                      src={user.profileImage}
                      className="w-8 h-8 rounded-full object-cover"
                      alt="avatar"
                    />
                  )}
                  <span className="font-medium text-gray-700">
                    {user.name}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full md:w-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

