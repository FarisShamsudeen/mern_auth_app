import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  }


  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        {user.role === "admin" ? (
          <Link to="/" className="text-2xl font-bold text-blue-600">
            MERN AUTH ADMIN
          </Link>
        ) : (
          <Link to="/" className="text-2xl font-bold text-blue-600">
            MERN AUTH USER
          </Link>
        )}

        {/* Navigation Links */}
        <div className="flex items-center gap-6">

          {user && (
            <>
              <Link className="text-gray-700 hover:text-blue-600 font-medium" to="/">
                Home
              </Link>

              <Link className="text-gray-700 hover:text-blue-600 font-medium" to="/profile">
                Profile
              </Link>

              {user.role === "admin" && (
                <Link className="text-gray-700 hover:text-blue-600 font-medium" to="/admin">
                  Dashboard
                </Link>
              )}
            </>
          )}

          {/* Auth Buttons */}
          {!user && (
            <>
              <Link className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" to="/login">
                Login
              </Link>
              <Link className="px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-200 transition" to="/register">
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
                <span className="font-medium text-gray-700">{user.name}</span>
              </div>

              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}

        </div>
      </div>
    </nav>
  );
}

