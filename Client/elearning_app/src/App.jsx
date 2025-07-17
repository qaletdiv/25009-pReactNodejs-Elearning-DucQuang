import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './screens/Register/Register'
import Login from "./screens/Login/Login";
import ForgotPassword from "./screens/ForgotPassword/ForgotPassword";
import ResetPassword from "./screens/ResetPassword/ResetPassword";
import Home from "./screens/Home/Home";
import UserCourse from "./screens/userCourse/userCourse";
import Course from "./screens/Course/Course";
import CourseDetail from "./screens/CourseDetail/CourseDetail";
import CourseUserDetail from './screens/CourseUserDetail/CourseUserDetail'
import UserProfile from "./screens/UserProfile/UserProfile";
import Cart from "./screens/Cart/Cart";
import CheckOut from "./screens/CheckOut/CheckOut";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMe } from "./redux/AuthSlice/AuthSlice";
import { fetchCart } from "./redux/Cart/CartSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getMe());
      dispatch(fetchCart());
    }
  }, [dispatch]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
          <Route path="/reset-password" element={<ResetPassword/>}></Route>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/user-course-enroll" element={<UserCourse/>}></Route>
          <Route path="/courses" element={<Course/>}></Route>
          <Route path="/courses/:id" element={<CourseDetail/>}></Route>
          <Route path="/user-course-enroll/userCourses/:courseId" element={<CourseUserDetail />} />
          <Route path="/profile" element={<UserProfile/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/checkout" element={<CheckOut/>} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
