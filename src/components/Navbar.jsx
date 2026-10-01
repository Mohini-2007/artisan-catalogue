
import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate()

  return (
    <nav className="custom-navbar">
      <div className="container d-flex align-items-center justify-content-between">
        {/* Logo */}
        <Link to="/" className="brand">
          <span className="brand-icon">✦</span>
          Artisan<span>AI</span>
        </Link>

        {/* Navigation */}
        <div className="nav-links">
          <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>
            Home
          </NavLink>

          <NavLink to="/catalogue" className={({ isActive }) => isActive ? "active" : ""}>
            Catalogue
          </NavLink>

          <Link to="/#about">About</Link>
        </div>

        {/* Profile */}
        <button className="profile-btn" onClick={() => navigate('/upload')}>
          <span>👤</span>
          Artisan
        </button>
      </div>
    </nav>
  );
}

export default Navbar;