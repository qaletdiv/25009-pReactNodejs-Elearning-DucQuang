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
  async ({ email, password }, { rejectWithValue }) => {
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
      const msg =
        error.response?.data?.errors?.[0]?.msg ||
        error.response?.data?.message ||
        error.message ||
        "Đã xảy ra lỗi không xác định";
      return rejectWithValue(msg);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassowrd",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/users/forgot-password", {
        email,
      });
      return response.data;
    } catch (error) {
      const msg =
        error.response?.data?.errors?.[0]?.msg ||
        error.response?.data?.message ||
        error.message ||
        "Đã xảy ra lỗi không xác định";
      return rejectWithValue(msg);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ newPassword, token}) => {
    try {
      const response = await axiosClient.post("/users/reset-password", {
        newPassword,
        token
      });
      return response.data;
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
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
