import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../../redux/slices/adminSlice";
import UserFormModal from "./UserFormModal";

export default function AdminUsers() {
  const dispatch = useDispatch();
  const { users, loading, page, pages } = useSelector(s => s.admin);
  const [currentPage, setCurrentPage] = useState(1);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers({ search: q, page: currentPage }));
  }, [dispatch, q, currentPage]);

  const searchUsers = () => {
    setCurrentPage(1);
    dispatch(fetchUsers({ search: q, page: 1 }));
  };

  return (
    <div className="bg-white rounded-xl shadow border p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Users</h2>
        <button onClick={() => { setEditUser(null); setOpen(true); }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg">Create User</button>
      </div>

      <div className="flex gap-2 mb-4">
        <input className="border p-2 rounded w-64" placeholder="Search name/email"
          value={q} onChange={e => setQ(e.target.value)} />
        <button onClick={searchUsers} className="border px-3 rounded">Search</button>
      </div>

      {loading ? "Loading..." : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td className="p-2 border">{u.name}</td>
                <td className="p-2 border">{u.email}</td>
                <td className="p-2 border">{u.role}</td>
                <td className="p-2 border space-x-2">
                  <button className="text-blue-600"
                    onClick={() => { setEditUser(u); setOpen(true); }}>Edit</button>
                  <button
                    className="text-red-600"
                    onClick={() => {
                      const ok = window.confirm(
                        `Are you sure you want to delete ${u.name}?`
                      );
                      if (!ok) return;

                      dispatch(deleteUser(u._id));
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {pages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {[...Array(pages).keys()].map(x => (
            <button
              key={x}
              onClick={() => setCurrentPage(x + 1)}
              className={`px-4 py-2 rounded border ${page === x + 1
                ? "bg-blue-600 text-white"
                : "bg-white"
                }`}
            >
              {x + 1}
            </button>
          ))}
        </div>
      )}
      {!loading && users.length === 0 && (
        <p className="text-gray-500 text-center mt-6">No users found</p>
      )}

      {open && <UserFormModal onClose={() => setOpen(false)} user={editUser} />}
    </div>
  );
}

