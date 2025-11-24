import React, { useState } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaUserFriends, FaDollarSign, FaCar, FaRoute } from 'react-icons/fa';

const PostRide = () => {
  const [formData, setFormData] = useState({
    pickupLocation: '',
    destination: '',
    date: '',
    time: '',
    availableSeats: 1,
    pricePerSeat: '',
    carModel: '',
    licensePlate: '',
    notes: ''
  });

  const [currentStep, setCurrentStep] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    alert('Ride posted successfully!');
    console.log('Ride Data:', formData);
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const popularDestinations = [
    'UNT Campus',
    'Downtown Denton',
    'Dallas Fort Worth Airport',
    'Frisco Square',
    'Lewisville Lake'
  ];

  return (
    <div className="post-ride-container">
      {/* Header */}
      <div className="post-ride-header">
        <h1>Post a Ride</h1>
        <p>Share your journey and save on travel costs</p>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress-steps">
          <div className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <span className="step-label">Route</span>
          </div>
          <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <span className="step-label">Details</span>
          </div>
          <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <span className="step-label">Review</span>
          </div>
        </div>
        <div className="progress-line">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
          ></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="post-ride-form">
        {/* Step 1: Route Information */}
        {currentStep === 1 && (
          <div className="form-step">
            <h2 className="step-title">Where are you going?</h2>
            
            <div className="form-section">
              <label className="form-label">
                <FaMapMarkerAlt className="label-icon" />
                Pickup Location
              </label>
              <input
                type="text"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleInputChange}
                placeholder="Enter pickup address"
                className="form-input"
                required
              />
            </div>

            <div className="form-section">
              <label className="form-label">
                <FaRoute className="label-icon" />
                Destination
              </label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                placeholder="Where are you going?"
                className="form-input"
                required
              />
              <div className="popular-destinations">
                <span className="popular-label">Popular destinations:</span>
                <div className="destination-tags">
                  {popularDestinations.map(dest => (
                    <button
                      key={dest}
                      type="button"
                      className="destination-tag"
                      onClick={() => setFormData(prev => ({ ...prev, destination: dest }))}
                    >
                      {dest}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-outline" onClick={nextStep}>
                Next: Date & Time
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Date, Time & Seats */}
        {currentStep === 2 && (
          <div className="form-step">
            <h2 className="step-title">When are you going?</h2>
            
            <div className="form-row">
              <div className="form-section">
                <label className="form-label">
                  <FaCalendarAlt className="label-icon" />
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="form-input"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div className="form-section">
                <label className="form-label">
                  <FaClock className="label-icon" />
                  Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-section">
                <label className="form-label">
                  <FaUserFriends className="label-icon" />
                  Available Seats
                </label>
                <div className="seats-selector">
                  <button
                    type="button"
                    className="seat-btn"
                    onClick={() => setFormData(prev => ({ 
                      ...prev, 
                      availableSeats: Math.max(1, prev.availableSeats - 1) 
                    }))}
                  >
                    -
                  </button>
                  <span className="seats-count">{formData.availableSeats}</span>
                  <button
                    type="button"
                    className="seat-btn"
                    onClick={() => setFormData(prev => ({ 
                      ...prev, 
                      availableSeats: Math.min(6, prev.availableSeats + 1) 
                    }))}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="form-section">
                <label className="form-label">
                  <FaDollarSign className="label-icon" />
                  Price per Seat
                </label>
                <div className="price-input">
                  <span className="currency-symbol">$</span>
                  <input
                    type="number"
                    name="pricePerSeat"
                    value={formData.pricePerSeat}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    className="form-input"
                    min="1"
                    max="100"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-outline" onClick={prevStep}>
                Back
              </button>
              <button type="button" className="btn btn-solid" onClick={nextStep}>
                Next: Vehicle Info
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Vehicle & Review */}
        {currentStep === 3 && (
          <div className="form-step">
            <h2 className="step-title">Vehicle Information</h2>
            
            <div className="form-section">
              <label className="form-label">
                <FaCar className="label-icon" />
                Car Model
              </label>
              <input
                type="text"
                name="carModel"
                value={formData.carModel}
                onChange={handleInputChange}
                placeholder="e.g., Toyota Camry 2020"
                className="form-input"
                required
              />
            </div>

            <div className="form-section">
              <label className="form-label">License Plate</label>
              <input
                type="text"
                name="licensePlate"
                value={formData.licensePlate}
                onChange={handleInputChange}
                placeholder="ABC 123"
                className="form-input"
                required
              />
            </div>

            <div className="form-section">
              <label className="form-label">Additional Notes (Optional)</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Any special instructions, pickup details, or preferences..."
                className="form-textarea"
                rows="3"
              />
            </div>

            {/* Ride Summary */}
            <div className="ride-summary">
              <h3 className="summary-title">Ride Summary</h3>
              <div className="summary-details">
                <div className="summary-item">
                  <span className="summary-label">Route:</span>
                  <span className="summary-value">{formData.pickupLocation} → {formData.destination}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Date & Time:</span>
                  <span className="summary-value">{formData.date} at {formData.time}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Seats Available:</span>
                  <span className="summary-value">{formData.availableSeats}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Price per Seat:</span>
                  <span className="summary-value">${formData.pricePerSeat}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Vehicle:</span>
                  <span className="summary-value">{formData.carModel}</span>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-outline" onClick={prevStep}>
                Back
              </button>
              <button type="submit" className="btn btn-solid publish-btn">
                Publish Ride
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default PostRide;