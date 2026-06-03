import { Link } from "react-router-dom";

function Navbar() {

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <nav className="navbar">
      <a href="/" className="logo-link">
        <img
          className="logo"
          src="/cbgLogo.png"
          alt="CBG Logo"
        />
      </a>

      <div className="nav-links">
        <a href="#about">About Us</a>
        <Link to="/mechanic-application">Apply to be a mechanic</Link>
        <a href="#services">Our Services</a>
        <a href="/contact">Contact Us</a>
      </div>

      <div className="nav-actions">

        {token ? (
          <Link
            to={
              role === "Admin"
                ? "/admin-profile"
                : role === "Staff"
                ? "/staff-profile"
                : "/profile"
            }
            className="get-started"
          >
            Profile
          </Link>
        ) : (
          <>
            <Link to="/login" className="signin">
              Sign in
            </Link>

            <Link to="/register" className="get-started">
              Get Started
            </Link>
          </>
        )}

      </div>
    </nav>
  );
}

export default Navbar;