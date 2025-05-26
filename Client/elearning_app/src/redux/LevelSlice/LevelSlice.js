import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../apis/axiosClient";

const initialState = {
  levels: [],
  loading: false,
  error: null,
};

export const fetchLevels = createAsyncThunk(
  "level/fetchLevels",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/levels");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Không thể tải danh sách cấp độ"
      );
    }
  }
);

const levelSlice = createSlice({
  name: "level",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchLevels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLevels.fulfilled, (state, action) => {
        state.loading = false;
        state.levels = action.payload;
        state.error = null;
      })
      .addCase(fetchLevels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default levelSlice.reducer;