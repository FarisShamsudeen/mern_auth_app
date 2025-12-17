import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { registerSchema } from "../validation/schemas";
import toast from "react-hot-toast";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((s) => s.auth);

  const submit = async (e) => {
    e.preventDefault();
    const result = registerSchema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }
    const res = await dispatch(registerUser(form));
    if (res.type === "auth/registerUser/fulfilled") navigate("/login");
  };

  const set = (key, val) => setForm({ ...form, [key]: val });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md border border-gray-200">

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Account</h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={submit} className="space-y-4">

          <div>
            <label className="text-gray-700 font-medium">Full Name</label>
            <input
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              onChange={(e) => set("name", e.target.value)}
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium">Email</label>
            <input
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              onChange={(e) => set("email", e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium">Phone Number</label>
            <input
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              onChange={(e) => set("phone", e.target.value)}
              placeholder="+91 9876543210"
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium">Password</label>
            <input
              type="password"
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              onChange={(e) => set("password", e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
          >
            {loading ? "Creating..." : "Register"}
          </button>

        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

