import React, { useState, useEffect } from "react";
import {BrowserRouter as Router,Routes,Route,Link,} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import RidePage from "./components/RidePage";
function App()
{
  const [userEmail, setUserEmail] = useState(null);
  useEffect(() =>
  {
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) 
    {
      setUserEmail(savedEmail);
    }
  }, []);
  const handleLogout = () =>
  {
    localStorage.removeItem("userEmail");
    setUserEmail(null);
    window.location.href = "/login";
  };
  return (
    <Router>
      <div className="container mt-5">
        <h1 className="text-center text-primary mb-4">GreenGo Ride Matcher</h1>
        <nav className="text-center mb-4">
          {!userEmail ? (
            <>
              <Link to="/login" className="btn btn-primary me-2">
                Login
              </Link>
              <Link to="/signup" className="btn btn-success">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <span className="me-3 text-muted">
                Logged in as <strong>{userEmail}</strong>
              </span>
              <button onClick={handleLogout} className="btn btn-danger">
                Logout
              </button>
            </>
          )}
        </nav>
        <Routes>
          <Route path="/login" element={<Login setUserEmail={setUserEmail} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/ride" element={<RidePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
