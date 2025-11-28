import { Link } from "react-router-dom";
import untLogo from "../assets/unt-logo.png";

export default function Navbar({ userEmail, onLogout })
{
  return (
    <header className="nav">
      <div className="container nav__row">
        <div className="brand">
          <img src={untLogo} alt="UNT" className="brand__logo" />
          <span className="brand__name">GreenGo</span>
        </div>
        <nav className="menu" style={{ gap: "1rem", alignItems: "center" }}>
          <a href="/#home" className="menu__link">
            Home
          </a>
          <a href="/#how" className="menu__link">
            How GreenGo Works
          </a>
          <a href="/#benefits" className="menu__link">
            GreenGo Benefits
          </a>
          <a href="/#help" className="btn btn-chip">
            Help Center
          </a>
          <span style={{ width: "1px", height: "22px", background: "#e2e8f0" }} />
          {!userEmail ? (
            <>
              <Link to="/login" className="btn btn-outline btn-sm">
                Login
              </Link>
              <Link to="/signup" className="btn btn-solid btn-sm">
                Sign Up
              </Link>
            </>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: ".55rem" }}>
              <span
                style={{
                  fontSize: "0.85rem",
                  color: "var(--muted)",
                  maxWidth: "180px",
                  textAlign: "right",
                }}
              >
                Hi,&nbsp;
                <strong>{userEmail}</strong>
              </span>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={onLogout}
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
