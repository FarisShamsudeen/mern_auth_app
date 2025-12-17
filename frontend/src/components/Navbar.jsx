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
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl sm:text-2xl font-bold text-blue-600"
            onClick={() => setMenuOpen(false)}
          >
            {user?.role === "admin" ? "MERN AUTH ADMIN" : "MERN AUTH USER"}
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {user && (
              <>
                <Link className="font-medium text-gray-700 hover:text-blue-600" to="/">
                  Home
                </Link>

                <Link className="font-medium text-gray-700 hover:text-blue-600" to="/profile">
                  Profile
                </Link>

                {user.role === "admin" && (
                  <Link className="font-medium text-gray-700 hover:text-blue-600" to="/admin">
                    Dashboard
                  </Link>
                )}
              </>
            )}

            {!user && (
              <>
                <Link className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" to="/login">
                  Login
                </Link>
                <Link className="px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-200" to="/register">
                  Register
                </Link>
              </>
            )}

            {user && (
              <div className="flex items-center gap-4">
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
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Hamburger (mobile only) */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t bg-white shadow-md">
            <div className="flex flex-col gap-4 p-4">
              {user && (
                <>
                  <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                  <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
                  {user.role === "admin" && (
                    <Link to="/admin" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                  )}
                </>
              )}

              {!user && (
                <>
                  <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                  <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
                </>
              )}

              {user && (
                <button
                  onClick={handleLogout}
                  className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

