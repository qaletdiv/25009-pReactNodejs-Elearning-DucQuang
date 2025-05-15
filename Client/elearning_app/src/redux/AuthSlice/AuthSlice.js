import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../apis/axiosClient";

const initialState = {
  users: null,
  loading: false,
  error: null,
  accessToken: localStorage.getItem("accessToken") || null,
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

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }) => {
    try {
      const response = await axiosClient.post("/users/login", {
        email,
        password,
      });
      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token);
      }
      return token;
    } catch (error) {
      console.log(error);
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
      })
      .addCase(loginUser.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        (state.loading = false), (state.accessToken = action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        (state.loading = true), (state.error = action.error.message);
      });
  },
});

export default authSlice.reducer;
