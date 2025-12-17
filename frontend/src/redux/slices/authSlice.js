import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import toast from "react-hot-toast";

const savedAuth = JSON.parse(localStorage.getItem("auth"));

const initialState = {
  user: savedAuth?.user || null,
  accessToken: savedAuth?.accessToken || null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await axios.post("/auth/login", {
        email,
        password,
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post("/auth/register", payload);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      localStorage.removeItem("auth");
    },
    updateUser(state, action) {
      state.user = action.payload;
    },
    setAuth(state, action) {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;

        // 🔥 Persist auth
        localStorage.setItem(
          "auth",
          JSON.stringify({
            user: action.payload.user,
            accessToken: action.payload.accessToken,
          })
        );
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Login failed");
      });
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        toast.success("Registration successful. Please login.");
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Registration failed");
      });
  }
});

export const { logout, updateUser, setAuth } = authSlice.actions;
export default authSlice.reducer;

