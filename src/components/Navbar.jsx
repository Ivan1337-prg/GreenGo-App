import untLogo from "../assets/unt-logo.png";

export default function Navbar() {
  return (
    <header className="nav">
      <div className="container nav__row">
        <div className="brand">
          <img src={untLogo} alt="UNT" className="brand__logo" />
          <span className="brand__name">GreenGo</span>
        </div>

        <nav className="menu">
          <a href="#home" className="menu__link">Home</a>
          <a href="#how" className="menu__link">How GreenGo Works</a>
          <a href="#benefits" className="menu__link">GreenGo Benefits</a>
          <a href="#help" className="btn btn-chip">Help Center</a>
        </nav>
      </div>
    </header>
  );
}
