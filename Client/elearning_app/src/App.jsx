import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './screens/Register/Register'
import Login from "./screens/Login/Login";
import ForgotPassword from "./screens/ForgotPassword/ForgotPassword";
import ResetPassword from "./screens/ResetPassword/ResetPassword";
import Home from "./screens/Home/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
          <Route path="/reset-password" element={<ResetPassword/>}></Route>
          <Route path="/" element={<Home/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
