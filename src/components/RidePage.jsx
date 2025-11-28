import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { API_URL } from "../api";

function RidePage()
{
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [datetime, setDatetime] = useState("");
  const [rides, setRides] = useState([]);
  const [matches, setMatches] = useState([]);
  const location = useLocation();
  const email = location.state?.email || localStorage.getItem("userEmail") || "guest@my.unt.edu";
  const fetchUserRides = useCallback(async () =>
  {
    const res = await fetch(`${API_URL}/api/rides?email=${encodeURIComponent(email)}`);
    const data = await res.json();
    setRides(data);
  }, [email]);

  useEffect(() =>
  {
    if (email)
    {
      fetchUserRides();
    }
  }, [email, fetchUserRides]);

  const handleSchedule = async (e) =>
  {
    e.preventDefault();
    if (!pickup || !dropoff || !datetime)
    {
        return alert("Please fill all fields!");
    }

    try
    {
      const response = await fetch(`${API_URL}/api/ride`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, pickup, dropoff, datetime }),
      });
      const data = await response.json();
      alert(data.message);
      if (response.ok)
      {
        await fetchUserRides();
        setPickup("");
        setDropoff("");
        setDatetime("");
      }
    }
    catch (errors)
    {
      console.error("Error:", errors);
      alert("Server connection error");
    }
  };

  const handleFindMatches = async () =>
  {
    if (!pickup || !dropoff)
    {
        return alert("Enter pickup & drop-off before finding matches!");
    }

    try
    {
      const response = await fetch(`${API_URL}/api/match?pickup=${encodeURIComponent(pickup)}&dropoff=${encodeURIComponent(dropoff)}`);
      const data = await response.json();
      setMatches(data);
    }
    catch (errors)
    {
      console.error("Error fetching matches:", errors);
      alert("Error finding matching rides");
    }
  };

  const handleCancelRide = async (id) =>
  {
    if (!window.confirm("Are you sure you want to cancel this ride?")) 
    {
        return;
    }
    try
    {
      const response = await fetch(`${API_URL}/api/ride/${id}`, {method: "DELETE",});
      const data = await response.json();
      alert(data.message);
      if (response.ok)
      {
        await fetchUserRides();
      }
    }
    catch (errors)
    {
      console.error("Error canceling ride:", errors);
      alert("Error canceling ride");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "700px" }}>
      <h2 className="text-center text-primary mb-4">GreenGo Ride Scheduling</h2>
      <p className="text-center text-muted mb-4">
        Logged in as: <strong>{email}</strong>
      </p>
      <form className="card p-4 shadow-sm" onSubmit={handleSchedule}>
        <div className="mb-3">
          <label className="form-label">Pickup Location</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter pickup point"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Drop-off Location</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter destination"
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Pickup Date & Time</label>
          <input
            type="datetime-local"
            className="form-control"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-success w-50 me-2">
            Schedule Ride
          </button>
          <button
            type="button"
            className="btn btn-info w-50"
            onClick={handleFindMatches}
          >
            Find Matching Rides
          </button>
        </div>
      </form>
      <hr />
      {matches.length > 0 ? (
        <>
          <h4 className="mt-4 text-center text-success">
            Matching Rides Found
          </h4>
          <table className="table table-striped mt-3">
            <thead className="table-light">
              <tr>
                <th>Student</th>
                <th>Pickup</th>
                <th>Drop-off</th>
                <th>Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((m, i) => (
                <tr key={i}>
                  <td>{m.email}</td>
                  <td>{m.pickup}</td>
                  <td>{m.dropoff}</td>
                  <td>{m.datetime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <h4 className="mt-4 text-center text-muted">
          No matching rides found
        </h4>
      )}
      <h4 className="mt-4 text-center">My Scheduled Rides</h4>
      {rides.length === 0 ? (
        <p className="text-center text-muted">No rides yet</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead className="table-light">
            <tr>
              <th>Pickup</th>
              <th>Drop-off</th>
              <th>Date & Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rides.map((r) => (
              <tr key={r._id}>
                <td>{r.pickup}</td>
                <td>{r.dropoff}</td>
                <td>{r.datetime}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleCancelRide(r._id)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RidePage;
