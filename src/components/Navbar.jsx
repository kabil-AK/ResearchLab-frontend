import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="main-navbar">

      {/* LOGO */}

      <Link
        to="/"
        className="navbar-logo"
        onClick={closeMenu}
      >
        <span className="logo-icon">
          ✦
        </span>

        <span className="logo-text">
          Research<span className="logo-highlight">Lab</span>
        </span>
      </Link>


      {/* NAVIGATION */}

      <div className={`navbar-links ${menuOpen ? "menu-open" : ""}`}>

        <Link
          to="/"
          className={isActive("/") ? "active" : ""}
          onClick={closeMenu}
        >
          <span>01</span>
          Home
        </Link>

        <Link
          to="/about"
          className={isActive("/about") ? "active" : ""}
          onClick={closeMenu}
        >
          <span>02</span>
          About
        </Link>

        <Link
          to="/team"
          className={isActive("/team") ? "active" : ""}
          onClick={closeMenu}
        >
          <span>03</span>
          Team
        </Link>

        <Link
          to="/research-areas"
          className={isActive("/research-areas") ? "active" : ""}
          onClick={closeMenu}
        >
          <span>04</span>
          Research
        </Link>

        <Link
          to="/publications"
          className={isActive("/publications") ? "active" : ""}
          onClick={closeMenu}
        >
          <span>05</span>
          Publications
        </Link>

        <Link
          to="/projects"
          className={isActive("/projects") ? "active" : ""}
          onClick={closeMenu}
        >
          <span>06</span>
          Projects
        </Link>

      </div>


      {/* RIGHT STATUS */}

      <div className="navbar-status">
        <span className="navbar-status-dot"></span>
        <span>LAB ONLINE</span>
      </div>


      {/* MOBILE MENU */}

      <button
        className={`menu-toggle ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

    </nav>
  );
}

export default Navbar;

