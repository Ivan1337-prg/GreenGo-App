import React, { useState } from 'react';
import { FaMapMarkerAlt, FaSearch, FaCar } from 'react-icons/fa';

const RequestRide = () => {
  const [location, setLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [rideType, setRideType] = useState('standard');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(`Requesting ${rideType} ride from ${location} to ${destination}`);
  };

  const rideOptions = [
    { id: 'standard', name: 'Standard', price: '$15-20', time: '5 min', icon: <FaCar /> },
    { id: 'comfort', name: 'Comfort', price: '$20-25', time: '7 min', icon: <FaCar /> },
    { id: 'green', name: 'Green', price: '$12-18', time: '8 min', icon: <FaCar /> },
  ];

  return (
    <div className="request-ride-container">
      {/* Header */}
      <div className="request-ride-header">
        <h1>Request a Ride</h1>
        <p>Get where you're going</p>
      </div>

      {/* Location Inputs */}
      <div className="location-inputs">
        <div className="input-group">
          <div className="input-icon">
            <FaMapMarkerAlt className="icon pickup-icon" />
          </div>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter pickup location"
            className="location-input"
          />
        </div>

        <div className="input-separator"></div>

        <div className="input-group">
          <div className="input-icon">
            <FaMapMarkerAlt className="icon destination-icon" />
          </div>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter destination"
            className="location-input"
          />
        </div>
      </div>

      {/* Ride Type Selection */}
      <div className="ride-type-section">
        <h3>Choose a ride</h3>
        <div className="ride-options">
          {rideOptions.map((option) => (
            <div
              key={option.id}
              className={`ride-option ${rideType === option.id ? 'selected' : ''}`}
              onClick={() => setRideType(option.id)}
            >
              <div className="ride-icon">{option.icon}</div>
              <div className="ride-info">
                <div className="ride-name">{option.name}</div>
                <div className="ride-details">
                  <span className="ride-price">{option.price}</span>
                  <span className="ride-time">{option.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirm Button */}
      <div className="confirm-section">
        <button 
          type="button" 
          className="confirm-button"
          onClick={handleFormSubmit}
          disabled={!location || !destination}
        >
          Confirm Ride Request
        </button>
      </div>
    </div>
  );
};

export default RequestRide;