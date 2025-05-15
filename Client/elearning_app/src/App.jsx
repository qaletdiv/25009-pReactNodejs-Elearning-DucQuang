import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './screens/Register/Register'
import Login from "./screens/Login/Login";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
