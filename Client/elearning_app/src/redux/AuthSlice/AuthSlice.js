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
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
      }
      return {token, user};
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
  async ({ newPassword, token}, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/users/reset-password", {
        newPassword,
        token
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

export const getMe = createAsyncThunk(
  'auth/getMe', async( _ ,{rejectWithValue}) => {
    try {
      const token = localStorage.getItem('token');
      const repsonse = await axiosClient.get("/users/get-me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return repsonse.data.user;
    } catch (error) {
        const msg =
        error.response?.data?.errors?.[0]?.msg ||
        error.response?.data?.message ||
        error.message ||
        "Đã xảy ra lỗi không xác định";
      return rejectWithValue(msg);
    }
  }
)



const authSlice = createSlice({
  name: "auth",
  initialState,
   reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem('token');
      state.users = null
    },
  },
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
        (state.loading = false), (state.accessToken = action.payload.token);
        //(state.users = action.payload.user)
      })
      .addCase(loginUser.rejected, (state, action) => {
        (state.loading = false), (state.error = action.error.message);
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
      })
       .addCase(getMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.users = action.payload
      })
      .addCase(getMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
