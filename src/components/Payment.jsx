import React, { useState } from 'react';
import { FaCreditCard, FaPaypal, FaApplePay, FaGooglePay, FaLock, FaCheck } from 'react-icons/fa';

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate payment processing
    setIsSubmitted(true);
    setTimeout(() => {
      alert('Payment method saved successfully!');
      setIsSubmitted(false);
    }, 2000);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    return parts.length ? parts.join(' ') : value;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  const handleExpiryDateChange = (e) => {
    const formatted = formatExpiryDate(e.target.value);
    setExpiryDate(formatted);
  };

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: <FaCreditCard />, color: '#3B82F6' },
    { id: 'paypal', name: 'PayPal', icon: <FaPaypal />, color: '#003087' },
    { id: 'apple', name: 'Apple Pay', icon: <FaApplePay />, color: '#000000' },
    { id: 'google', name: 'Google Pay', icon: <FaGooglePay />, color: '#4285F4' },
  ];

  return (
    <div className="payment-container">
      {/* Header */}
      <div className="payment-header">
        <h1>Cashless Payment Setup</h1>
        <p>Securely add your payment method for seamless rides</p>
      </div>

      {/* Payment Method Selection */}
      <div className="payment-method-section">
        <h2 className="section-title">Payment Method</h2>
        <div className="payment-methods-grid">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`payment-method-card ${paymentMethod === method.id ? 'selected' : ''}`}
              onClick={() => setPaymentMethod(method.id)}
            >
              <div className="method-icon" style={{ color: method.color }}>
                {method.icon}
              </div>
              <span className="method-name">{method.name}</span>
              {paymentMethod === method.id && (
                <div className="selected-indicator">
                  <FaCheck />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Payment Form */}
      {paymentMethod === 'card' && (
        <form onSubmit={handleSubmit} className="payment-form">
          <div className="form-section">
            <label className="form-label">Cardholder Name</label>
            <input
              type="text"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              placeholder="John Doe"
              className="form-input"
              required
            />
          </div>

          <div className="form-section">
            <label className="form-label">Card Number</label>
            <div className="input-with-icon">
              <FaCreditCard className="input-icon" />
              <input
                type="text"
                value={cardNumber}
                onChange={handleCardNumberChange}
                placeholder="1234 5678 9012 3456"
                className="form-input"
                maxLength={19}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-section">
              <label className="form-label">Expiry Date</label>
              <input
                type="text"
                value={expiryDate}
                onChange={handleExpiryDateChange}
                placeholder="MM/YY"
                className="form-input"
                maxLength={5}
                required
              />
            </div>

            <div className="form-section">
              <label className="form-label">CVV</label>
              <div className="input-with-icon">
                <FaLock className="input-icon" />
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="123"
                  className="form-input"
                  maxLength={4}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-checkbox">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={isDefault}
                onChange={(e) => setIsDefault(e.target.checked)}
                className="checkbox-input"
              />
              <span className="checkmark"></span>
              Set as default payment method
            </label>
          </div>

          <button 
            type="submit" 
            className={`submit-button ${isSubmitted ? 'loading' : ''}`}
            disabled={isSubmitted}
          >
            {isSubmitted ? (
              <>
                <div className="spinner"></div>
                Processing...
              </>
            ) : (
              'Save Payment Method'
            )}
          </button>
        </form>
      )}

      {/* Security Notice */}
      <div className="security-notice">
        <FaLock className="security-icon" />
        <div className="security-text">
          <strong>Your payment information is secure</strong>
          <p>We use industry-standard encryption to protect your data</p>
        </div>
      </div>
    </div>
  );
};

export default Payment;