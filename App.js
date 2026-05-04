import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import StudentPortal from "./pages/StudentPortal";
import ManagerPortal from "./pages/ManagerPortal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/student" element={<StudentPortal />} />
        <Route path="/manager" element={<ManagerPortal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;