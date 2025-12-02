import "./styles.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Benefits from "./components/Benefits";
import Footer from "./components/Footer";
import { Routes, Route, Navigate } from "react-router-dom";
import RequestRide from "./components/RequestRide";
import PostRide from "./components/PostRide";
import Notifications from "./components/Notifications";
import Payment from "./components/Payment";
import Login from "./components/Login";
import { AuthProvider, useAuth } from "./components/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function AppContent() {
  const { user } = useAuth();
  
  return (
    <>
      {user && <Navbar />}
      <main>
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <>
                <Hero />
                <HowItWorks />
                <Benefits />
              </>
            </ProtectedRoute>
          } />
          
          <Route path="/request-ride" element={
            <ProtectedRoute>
              <RequestRide />
            </ProtectedRoute>
          } />
          
          <Route path="/post-ride" element={
            <ProtectedRoute>
              <PostRide />
            </ProtectedRoute>
          } />
          
          <Route path="/notifications" element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          } />
          
          <Route path="/payment" element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          } />
          
          {/* Redirect to login for protected routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {user && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}