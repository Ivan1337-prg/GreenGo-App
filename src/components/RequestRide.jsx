import React, { useState } from 'react';

const RequestRide = () => {
  const [location, setLocation] = useState('');
  const [destination, setDestination] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(`Requesting ride from ${location} to ${destination}`);
  };

  return (
    <div>
      <h2>Request a Ride</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Pickup Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter pickup location"
            required
          />
        </div>
        <div>
          <label>Destination:</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter destination"
            required
          />
        </div>
        <button type="submit">Confirm Location</button>
      </form>
    </div>
  );
};

export default RequestRide;
