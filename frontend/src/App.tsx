import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Trees from "./pages/Trees";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { token } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Trees />} />

        <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={token ? <Navigate to="/" /> : <Register />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
