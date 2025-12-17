import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateProfile } from "../redux/slices/profileSlice";
import { profileSchema } from "../validation/schemas";
import toast from "react-hot-toast";

export default function Profile() {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.profile);
  const [image, setImage] = useState(null);


  const [preview, setPreview] = useState(null);
  const profileImageSrc = preview
    ? preview // local blob preview
    : (!preview)
      ? user?.profileImage
      : null;


  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = profileSchema.safeParse({
      name: form.name,
      phone: form.phone,
    });
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("phone", form.phone);

    if (image) {
      formData.append("image", image);
    }

    dispatch(updateProfile(formData));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6">
      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 border border-gray-200">

        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
          My Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Profile Image Section */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">

            <div className="mx-auto sm:mx-0 w-28 h-28 rounded-full overflow-hidden border-2 border-gray-300">
              {profileImageSrc ? (
                <img
                  src={profileImageSrc}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>

            <label className="mx-auto sm:mx-0 cursor-pointer">
              <span className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-center">
                Change Photo
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          {/* Email (readonly) */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              className="w-full border rounded-lg p-3 text-gray-500 bg-gray-100 cursor-not-allowed"
              value={`${form.email} - Email is immutable`}
              disabled
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Phone
            </label>
            <input
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

