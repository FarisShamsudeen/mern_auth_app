import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import toast from "react-hot-toast";

export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async ({ search = "", page = 1 }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.accessToken;

      const res = await axios.get(
        `/admin/users?search=${search}&page=${page}&limit=5`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(
        e.response?.data?.message || "Failed to fetch users"
      );
    }
  }
);

export const createUser = createAsyncThunk(
  "admin/createUser",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.accessToken;
      const res = await axios.post("/admin/users", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(
        e.response?.data?.message || "Failed to create user"
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async ({ id, payload }, thunkAPI) => {
    const token = thunkAPI.getState().auth.accessToken;
    const res = await axios.put(`/admin/users/${id}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }
);

export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.accessToken;
    await axios.delete(`/admin/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return id;
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    loading: false,
    error: null,
    page: 1,
    pages: 1,
  },
  reducers: {},
  extraReducers: (b) => {
    b
      // FETCH USERS
      .addCase(fetchUsers.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchUsers.fulfilled, (s, a) => {
        s.loading = false;
        s.users = a.payload.users;
        s.page = a.payload.page;
        s.pages = a.payload.pages;
      })
      .addCase(fetchUsers.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
        toast.error(a.payload || "Failed to fetch users");
      })

      // CREATE USER
      .addCase(createUser.fulfilled, (s, a) => {
        s.users.unshift(a.payload);
        toast.success("User created successfully");
      })

      // UPDATE USER
      .addCase(updateUser.fulfilled, (s, a) => {
        s.users = s.users.map((u) =>
          u._id === a.payload._id ? a.payload : u
        );
        toast.success("User updated successfully");
      })

      // DELETE USER
      .addCase(deleteUser.fulfilled, (s, a) => {
        s.users = s.users.filter((u) => u._id !== a.payload);
        toast.success("User deleted successfully");
      });
  },
});

export default adminSlice.reducer;

