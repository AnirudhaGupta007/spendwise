import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import AddTransaction from "./pages/AddTransaction";
import "./App.css";

function App() {
  const isLoggedIn = () => !!localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/add" element={isLoggedIn() ? <AddTransaction /> : <Navigate to="/login" />} />
        <Route path="/" element={isLoggedIn() ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
