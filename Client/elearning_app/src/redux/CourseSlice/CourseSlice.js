import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../apis/axiosClient";

const initialState = {
  courses: [],
  loading: false,
  error: null,
  categoryFilter: "All", 
  levelFilter: "All",
  course: null
};

export const fetchCourse = createAsyncThunk("course/fetchCourse", async () => {
  try {
    const response = await axiosClient.get("/courses");
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const searchCourses = createAsyncThunk(
  "course/searchCourses",
  async (courseName) => {
    try {
      const response = await axiosClient.get(
        `/courses/?courseName=${courseName}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchCourseById = createAsyncThunk("course/fetchCourseById", async(id) => {
  try {
    const response = await axiosClient.get(`/courses/${id}`)
    return response.data
  } catch (error) {
    console.log(error);
  }
})


const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCategoryFilter(state, action) {
        state.categoryFilter = action.payload
    }, 
    setLevelFilter(state, action) {
        state.levelFilter = action.payload
    }, 
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourse.pending, (state) => {
        (state.loading = true), (state.erorr = null);
      })
      .addCase(fetchCourse.fulfilled, (state, action) => {
        (state.loading = false), (state.courses = action.payload);
        state.error = null;
      })
      .addCase(fetchCourse.rejected, (state) => {
        (state.loading = false), (state.erorr = null);
      })
      .addCase(searchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
        state.error = null;
      })
      .addCase(searchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCourseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.loading = false;
        state.course = action.payload.course;
        state.error = null;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {setLevelFilter, setCategoryFilter} = courseSlice.actions
export default courseSlice.reducer;
