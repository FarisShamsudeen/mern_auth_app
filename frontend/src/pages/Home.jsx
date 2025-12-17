import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { Link } from "react-router-dom";

export default function Home() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (!user)
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-md p-8 rounded-xl text-center border border-gray-200">
          <p className="text-lg mb-4 text-gray-700">You are not logged in.</p>
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </Link>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="bg-white shadow-xl p-10 rounded-2xl border border-gray-200">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Welcome, {user.name}
        </h1>

        <p className="text-gray-600 mb-6">You are logged in successfully.</p>

        <button
          onClick={() => dispatch(logout())}
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

