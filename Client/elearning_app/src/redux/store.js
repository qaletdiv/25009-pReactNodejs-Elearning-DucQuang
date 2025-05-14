import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../redux/AuthSlice/AuthSlice"
export const store = configureStore({
    reducer: {
        auth: authReducer
    }
})
export default store;