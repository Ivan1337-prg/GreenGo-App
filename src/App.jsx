import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Benefits from "./components/Benefits";
import Footer from "./components/Footer";
import RequestRide from "./components/RequestRide";
import Login from "./components/Login";
import Signup from "./components/Signup";
import RidePage from "./components/RidePage";

function Home()
{
  return (
    <>
      <Hero />
      <HowItWorks />
      <Benefits />
    </>
  );
}

export default function App()
{
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() =>
  {
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail)
    {
      setUserEmail(savedEmail);
    }
  }, []);

  function handleLogout()
  {
    localStorage.removeItem("userEmail");
    setUserEmail(null);
    navigate("/login");
  }

  return (
    <div className="app-wrapper">
      <Navbar userEmail={userEmail} onLogout={handleLogout} />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/request-ride" element={<RequestRide />} />
          <Route path="/login" element={<Login setUserEmail={setUserEmail} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/ride" element={<RidePage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
