import { useState } from "react";

const RequestRide = () => {
  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(`Requesting ride from ${location} to ${destination}`);
  };

  return (
    <div className="auth-page">
      <div
        className="card p-4 shadow-sm"
        style={{
          maxWidth: "450px",
          width: "100%",
          borderRadius: "16px",
          background: "#fff",
          boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
            color: "var(--green)",
            fontWeight: "700",
          }}
        >
          Request a Ride
        </h2>

        <form onSubmit={handleFormSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "600",
                color: "var(--ink)",
              }}
            >
              Pickup Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter pickup location"
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "10px",
                border: "1px solid #d5d9df",
                fontSize: "0.95rem",
              }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "600",
                color: "var(--ink)",
              }}
            >
              Destination
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter destination"
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "10px",
                border: "1px solid #d5d9df",
                fontSize: "0.95rem",
              }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-chip"
            style={{
              width: "100%",
              padding: "0.9rem",
              fontSize: "1rem",
              borderRadius: "12px",
              marginTop: "0.5rem",
            }}
          >
            Confirm Location
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestRide;

