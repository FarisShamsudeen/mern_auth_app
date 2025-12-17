import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { updateUser } from "./authSlice";
import toast from "react-hot-toast";


export const updateProfile = createAsyncThunk(
  "profile/update",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.accessToken;

      const res = await axios.put("/user/profile", formData, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      thunkAPI.dispatch(updateUser(res.data));
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: { loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state) => {
        state.loading = false;
        toast.success("Profile updated successfully");
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload || "Profile update failed");
      });
  },
});

export default profileSlice.reducer;

