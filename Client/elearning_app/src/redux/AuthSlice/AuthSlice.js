import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../apis/axiosClient";

const initialState = {
  users: null,
  loading: false,
  error: null,
  accessToken: localStorage.getItem("token") || null,
  userCoursesEnroll: [],
  courseSections: [],
  videosBySection: [],
  completedVideos: [],
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
      return { token, user };
    } catch (error) {
      const msg =
        error.response?.data?.errors?.[0]?.msg ||
        error.response?.data?.message ||
        error.message;
      return rejectWithValue(msg || "Đã xảy ra lỗi không xác định");
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
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
        error.message;
      return rejectWithValue(msg || "Đã xảy ra lỗi không xác định");
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ newPassword, token }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/users/reset-password", {
        newPassword,
        token,
      });
      return response.data;
    } catch (error) {
      const msg =
        error.response?.data?.errors?.[0]?.msg ||
        error.response?.data?.message ||
        error.message;
      return rejectWithValue(msg || "Đã xảy ra lỗi không xác định");
    }
  }
);

export const getMe = createAsyncThunk(
  "auth/getMe",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosClient.get("/users/get-me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.user;
    } catch (error) {
      const msg =
        error.response?.data?.errors?.[0]?.msg ||
        error.response?.data?.message ||
        error.message;
      return rejectWithValue(msg || "Đã xảy ra lỗi không xác định");
    }
  }
);

export const userCourses = createAsyncThunk(
  "auth/userCourses",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosClient.get("/users/user-course-enroll", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      const msg = error.response?.data?.message || error.message;
      return rejectWithValue(msg || "Đã xảy ra lỗi không xác định");
    }
  }
);

export const getAllSectionByUserCourse = createAsyncThunk(
  "auth/getAllSectionByUserCourse",
  async ({ courseId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosClient.get(
        `/users/user-course-enroll/course/${courseId}/sections/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      const msg = error.response?.data?.message || error.message;
      return rejectWithValue(msg || "Đã xảy ra lỗi không xác định");
    }
  }
);

export const getVideosBySection = createAsyncThunk(
  "auth/getVideosBySection",
  async ({ courseId, sectionId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosClient.get(
        `/users/user-course-enroll/course/${courseId}/section/${sectionId}/videos`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      const msg = error.response?.data?.message || error.message;
      return rejectWithValue(msg || "Đã xảy ra lỗi không xác định");
    }
  }
);

export const markVideoCompleted = createAsyncThunk(
  "auth/markVideoCompleted",
  async ({ videoId, enrollmentId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosClient.post(
        `/videoCompleted`,
        { videoId, enrollmentId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { data: response.data, videoId };
    } catch (error) {
      const msg = error.response?.data?.message || error.message;
      return rejectWithValue(msg || "Đã xảy ra lỗi không xác định");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.userCoursesEnroll = [];
      state.accessToken = null;
      state.users = null;
      localStorage.removeItem("token");
    },
    abc: (state, action) => {
      state.courseSections?.forEach((course) => {
        console.log("course", course);
        course.sections?.forEach((section) => {
          console.log("section", section);

          section.video?.forEach((video) => {
            console.log("video", video);

            if (video.id === action.payload.videoId) {
              video.completed = true;
            }
          });
        });
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.token;
        state.users = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
        state.users = action.payload;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(userCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.userCoursesEnroll = action.payload;
      })
      .addCase(userCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllSectionByUserCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSectionByUserCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courseSections = action.payload.course.courses;
      })
      .addCase(getAllSectionByUserCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getVideosBySection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVideosBySection.fulfilled, (state, action) => {
        state.loading = false;
        state.videosBySection = action.payload;
      })
      .addCase(getVideosBySection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(markVideoCompleted.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markVideoCompleted.fulfilled, (state, action) => {
        state.loading = false;

        // Thêm video đã hoàn thành vào completedVideos
        state.completedVideos.push(action.payload.data.videoCompleted);

        // Duyệt qua các course, section và video để cập nhật completed
        // state.courseSections?.forEach((course) => {
        //   console.log("course", course);
        //   course.sections?.forEach((section) => {
        //     console.log("section", section);

        //     section.video?.forEach((video) => {
        //       console.log("video", video);

        //       if (video.id === action.payload.videoId) {
        //         video.completed = true;
        //       }
        //     });
        //   });
        // });
      })

      .addCase(markVideoCompleted.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, changeCompletedVideos, abc } = authSlice.actions;
export default authSlice.reducer;
