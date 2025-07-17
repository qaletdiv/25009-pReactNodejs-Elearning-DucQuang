import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../apis/axiosClient";
const initialState = {
  cart: { items: [] },
  loading: false,
  error: null,
  accessToken: localStorage.getItem("token") || null,
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/carts");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Không thể lấy giỏ hàng"
      );
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/carts", { courseId }); 
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Không thể thêm sản phẩm vào giỏ hàng"
      );
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (cartItem, { rejectWithValue }) => {
    try {
      await axiosClient.delete(`/carts/remove/${cartItem}`);
      return { id: Number(cartItem) };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Không tìm thấy khóa học để xóa"
      );
    }
  }
);

export const clearCartAsync = createAsyncThunk(
  "cart/clearCartAsync",
  async (_, { rejectWithValue }) => {
    try {
      await axiosClient.delete("/carts/clear");
      return true;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Không thể xóa giỏ hàng"
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cart.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.error = null;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart.items.push(action.payload);
        state.error = null;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cart.items = state.cart.items.filter(
          (p) => p.id !== Number(action.payload.id)
        );
        state.error = null;
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
