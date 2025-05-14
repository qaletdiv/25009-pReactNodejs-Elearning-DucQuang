import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../apis/axiosClient";

const initialState = {
  users: null,
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/users/register", {
        username,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      const msg =
        error.response?.data?.errors?.[0]?.msg ||
        error.response?.data?.message ||
        error.message;
      if (msg.includes("Email đã tồn tại")) {
        return rejectWithValue(msg);
      }
      return rejectWithValue(msg || "Đã xảy ra lỗi không xác định");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (bulider) => {
    bulider
      .addCase(registerUser.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        (state.loading = false), (state.users = action.payload);
      })
      .addCase(registerUser.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      });
  },
});

export default authSlice.reducer;
