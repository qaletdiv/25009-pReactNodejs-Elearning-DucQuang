import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './screens/Register/Register'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
