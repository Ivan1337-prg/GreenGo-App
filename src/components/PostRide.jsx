import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PostRide = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [availableSeats, setAvailableSeats] = useState(1);
  const navigate = useNavigate();

  const handlePostRide = (e) => {
    e.preventDefault();
    console.log('Ride Posted:', { pickupLocation, destination, departureTime, availableSeats });
    alert(`Ride posted from ${pickupLocation} to ${destination} at ${departureTime}`);
    navigate(-1);
  };

  return (
    <div className="container" style={{ maxWidth: '500px', margin: '2rem auto', padding: '2rem' }}>
      <h2>Post a Ride</h2>
      <form onSubmit={handlePostRide} className="card p-4">
        <div className="mb-3">
          <label className="form-label">Starting Location:</label>
          <input
            type="text"
            className="form-control"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            placeholder="Where are you starting from?"
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
            placeholder="Where are you going?"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Departure Time:</label>
          <input
            type="datetime-local"
            className="form-control"
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Available Seats:</label>
          <input
            type="number"
            className="form-control"
            value={availableSeats}
            onChange={(e) => setAvailableSeats(e.target.value)}
            min="1"
            max="6"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Publish Ride
        </button>
      </form>
    </div>
  );
};

export default PostRide;