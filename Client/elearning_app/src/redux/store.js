import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../redux/AuthSlice/AuthSlice"
import courseReducer from "../redux/CourseSlice/CourseSlice"
import categoryReducer from '../redux/CategorySlice/CategorySlice'
import levelReducer from '../redux/LevelSlice/LevelSlice'
export const store = configureStore({
    reducer: {
        auth: authReducer, 
        course: courseReducer,
        category: categoryReducer, 
        level: levelReducer
    }
})
export default store;