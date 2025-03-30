import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <p>© 2025 Anuj Kumar Mishra. All Rights Reserved.</p>
      <div className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/apiDemo">About CRUD</Link>
        <a href="https://github.com/Anujmishra14" target="_blank" rel="noreferrer">GitHub</a>
      </div>
    </footer>
  );
}
