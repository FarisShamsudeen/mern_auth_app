import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createUser, updateUser } from "../../redux/slices/adminSlice";
import { adminUserSchema } from "../../validation/schemas";
import toast from "react-hot-toast";

export default function UserFormModal({ onClose, user }) {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
  });

  // Prefill form on edit
  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect 
      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        password: "",
        role: user.role || "user",
      });
    } else {
      setForm({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "user",
      });
    }
  }, [user]);

  const submit = () => {
    const result = adminUserSchema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    if (user) {
      dispatch(updateUser({ id: user._id, payload: form }));
    } else {
      dispatch(createUser(form));
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4">
          {user ? "Edit User" : "Create User"}
        </h3>

        {/* Name */}
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
          className="border p-2 rounded w-full mb-3"
        />

        {/* Email */}
        <input
          value={form.email}
          disabled={!!user}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          className={`border p-2 rounded w-full mb-3 ${
            user ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
        />

        {/* Phone */}
        <input
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="Phone"
          className="border p-2 rounded w-full mb-3"
        />

        {/* Password */}
        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder={
            user
              ? "New password (or Leave to keep current)"
              : "Password"
          }
          className="border p-2 rounded w-full mb-3"
        />

        {/* Role */}
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="border p-2 rounded w-full mb-4"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

