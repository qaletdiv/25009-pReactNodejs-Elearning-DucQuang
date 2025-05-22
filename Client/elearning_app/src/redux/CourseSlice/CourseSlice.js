import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../apis/axiosClient";

const initialState = {
    courses: [], 
    loading: false,
    erorr:null, 
}

export const fetchCourse = createAsyncThunk(
    "course/fetchCourse", async() => {
        try {
            const response = await axiosClient.get('/courses')
            return response.data
        } catch (error) {
            console.log(error);
        }
    }
)

const courseSlice = createSlice({
    name: 'course', 
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(fetchCourse.pending, (state) => {
            state.loading = true, 
            state.erorr = null
        })
        .addCase(fetchCourse.fulfilled, (state, action) => {
            state.loading = false, 
            state.courses = action.payload
            state.erorr = null
        })
        .addCase(fetchCourse.rejected, (state) => {
            state.loading = false, 
            state.erorr = null
        })
    }

})

export default courseSlice.reducer;