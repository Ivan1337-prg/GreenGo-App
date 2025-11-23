import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RequestRide = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [rideType, setRideType] = useState('standard');
  const navigate = useNavigate();

  const handleRequestRide = (e) => {
    e.preventDefault();
    console.log('Ride Request:', { pickupLocation, destination, rideType });
    alert(`Ride requested from ${pickupLocation} to ${destination}`);
    navigate(-1);
  };

  return (
    <div className="container" style={{ maxWidth: '500px', margin: '2rem auto', padding: '2rem' }}>
      <h2>Request a Ride</h2>
      <form onSubmit={handleRequestRide} className="card p-4">
        <div className="mb-3">
          <label className="form-label">Pickup Location:</label>
          <input
            type="text"
            className="form-control"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            placeholder="Enter pickup location"
            required
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Destination:</label>
          <input
            type="text"
            className="form-control"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter destination"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Ride Type:</label>
          <select 
            className="form-select"
            value={rideType}
            onChange={(e) => setRideType(e.target.value)}
          >
            <option value="standard">Standard</option>
            <option value="premium">Premium</option>
            <option value="carpool">Carpool</option>
          </select>
        </div>

        <button type="submit" className="btn btn-success w-100">
          Confirm Ride Request
        </button>
      </form>
    </div>
  );
};

export default RequestRide;