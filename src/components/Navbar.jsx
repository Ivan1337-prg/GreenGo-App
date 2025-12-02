import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import untLogo from "../assets/unt-logo.png";
import { FaUser, FaSignOutAlt, FaBell, FaCar } from 'react-icons/fa';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setShowDropdown(false);
  };

  if (!user) return null;

  return (
    <header className="nav">
      <div className="container nav__row">
        <div className="brand">
          <img src={untLogo} alt="UNT" className="brand__logo" />
          <span className="brand__name">GreenGo</span>
        </div>

        <nav className="menu">
          <Link to="/" className="menu__link">Home</Link>
          <Link to="/how" className="menu__link">How GreenGo Works</Link>
          <Link to="/benefits" className="menu__link">GreenGo Benefits</Link>
          
          {/* Quick Actions */}
          <Link to="/request-ride" className="menu__link" style={{ color: 'var(--green)' }}>
            <FaCar style={{ marginRight: '6px' }} />
            Request Ride
          </Link>
          
          <Link to="/notifications" className="menu__link">
            <FaBell style={{ marginRight: '6px' }} />
            Notifications
          </Link>
          
          {/* User Dropdown */}
          <div className="user-dropdown-container">
            <button 
              className="user-menu-btn"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <FaUser style={{ marginRight: '6px' }} />
              {user.name?.split(' ')[0] || 'User'}
            </button>
            
            {showDropdown && (
              <div className="user-dropdown">
                <div className="user-info">
                  <div className="user-name">{user.name}</div>
                  <div className="user-email">{user.email}</div>
                </div>
                <div className="dropdown-divider"></div>
                <Link to="/payment" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                  Payment Methods
                </Link>
                <Link to="/post-ride" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                  Post a Ride
                </Link>
                <Link to="/notifications" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                  Notifications
                </Link>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item logout" onClick={handleLogout}>
                  <FaSignOutAlt style={{ marginRight: '8px' }} />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}