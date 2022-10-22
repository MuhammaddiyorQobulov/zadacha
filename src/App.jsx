import axios from "axios";
import React from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Login from "./pages/login/login";
import Products from "./pages/products/products";

function App() {
  const token = localStorage.getItem("token") || null;
  const navigate = useNavigate();

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else delete axios.defaults.headers.common["Authorization"];

  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/products" replace />}
        />
        <Route
          path="/products"
          element={token ? <Products /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<Navigate to="/products" replace />} />
      </Routes>
    </div>
  );
}

export default App;
