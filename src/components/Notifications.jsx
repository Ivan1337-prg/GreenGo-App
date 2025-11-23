import React from 'react';
import { useNavigate } from 'react-router-dom';

const Notifications = () => {
  const navigate = useNavigate();
  const notifications = [
    { id: 1, message: 'Your ride request has been confirmed!', time: '2 min ago', type: 'success' },
    { id: 2, message: 'John joined your ride to Campus', time: '5 min ago', type: 'info' },
    { id: 3, message: 'Payment received: $15.50', time: '1 hour ago', type: 'payment' },
  ];

  return (
    <div className="container" style={{ maxWidth: '500px', margin: '2rem auto', padding: '2rem' }}>
      <h2>Notifications</h2>
      <div className="card">
        <div className="card-body">
          {notifications.length === 0 ? (
            <p className="text-muted">No new notifications</p>
          ) : (
            notifications.map(notification => (
              <div key={notification.id} className="border-bottom p-3">
                <p className="mb-1">{notification.message}</p>
                <small className="text-muted">{notification.time}</small>
              </div>
            ))
          )}
        </div>
      </div>
      <button 
        onClick={() => navigate(-1)}
        className="btn btn-outline-secondary mt-3"
      >
        Back
      </button>
    </div>
  );
};

export default Notifications;