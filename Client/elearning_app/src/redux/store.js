import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../redux/AuthSlice/AuthSlice"
import courseReducer from "../redux/CourseSlice/CourseSlice"
export const store = configureStore({
    reducer: {
        auth: authReducer, 
        course: courseReducer
    }
})
export default store;