import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const navigate = useNavigate();

  const handleSavePayment = (e) => {
    e.preventDefault();
    console.log('Payment Method Saved:', { paymentMethod, cardNumber: '***' + cardNumber.slice(-4) });
    alert('Payment method saved successfully!');
    navigate(-1);
  };

  return (
    <div className="container" style={{ maxWidth: '500px', margin: '2rem auto', padding: '2rem' }}>
      <h2>Cashless Payment Setup</h2>
      <form onSubmit={handleSavePayment} className="card p-4">
        <div className="mb-3">
          <label className="form-label">Payment Method:</label>
          <select 
            className="form-select"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="card">Credit/Debit Card</option>
            <option value="paypal">PayPal</option>
            <option value="wallet">GreenGo Wallet</option>
          </select>
        </div>

        {paymentMethod === 'card' && (
          <>
            <div className="mb-3">
              <label className="form-label">Card Number:</label>
              <input
                type="text"
                className="form-control"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="1234 5678 9012 3456"
                maxLength="16"
              />
            </div>
            
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Expiry Date:</label>
                <input
                  type="text"
                  className="form-control"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="MM/YY"
                />
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label">CVV:</label>
                <input
                  type="text"
                  className="form-control"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="123"
                  maxLength="3"
                />
              </div>
            </div>
          </>
        )}

        <button type="submit" className="btn btn-success w-100">
          Save Payment Method
        </button>
      </form>
    </div>
  );
};

export default Payment;