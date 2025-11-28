import "./styles.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Benefits from "./components/Benefits";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import RequestRide from "./components/RequestRide";
import PostRide from "./components/PostRide";
import Notifications from "./components/Notifications";
import Payment from "./components/Payment";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <HowItWorks />
              <Benefits />
            </>
          } />
          <Route path="/request-ride" element={<RequestRide />} />
          <Route path="/post-ride" element={<PostRide />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}