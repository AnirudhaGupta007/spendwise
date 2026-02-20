import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/header.css";

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="app-header">
      <Link to="/" className="header-logo">💰 Expense Tracker</Link>
      <nav className="header-nav">
        <Link to="/">Dashboard</Link>
        <Link to="/add">Add</Link>
      </nav>
      <div className="header-right">
        <span className="user-name">{user?.name}</span>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </header>
  );
};

export default Header;
