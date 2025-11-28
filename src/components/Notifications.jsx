import React, { useState } from 'react';
import { FaBell, FaCheckCircle, FaUserFriends, FaMoneyBillWave, FaCar, FaExclamationTriangle, FaChevronLeft, FaTrash, FaTimes } from 'react-icons/fa';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'ride_confirmed',
      title: 'Ride Confirmed!',
      message: 'Your ride request to UNT Campus has been confirmed',
      time: '2 min ago',
      read: false,
      icon: <FaCheckCircle />,
      color: '#10B981'
    },
    {
      id: 2,
      type: 'passenger_joined',
      title: 'Passenger Joined',
      message: 'John joined your ride to Campus',
      time: '5 min ago',
      read: false,
      icon: <FaUserFriends />,
      color: '#3B82F6'
    },
    {
      id: 3,
      type: 'payment_received',
      title: 'Payment Received',
      message: 'Payment received: $15.50',
      time: '1 hour ago',
      read: true,
      icon: <FaMoneyBillWave />,
      color: '#10B981'
    },
    {
      id: 4,
      type: 'ride_reminder',
      title: 'Ride Reminder',
      message: 'Your ride to Downtown Denton starts in 30 minutes',
      time: '2 hours ago',
      read: true,
      icon: <FaCar />,
      color: '#F59E0B'
    },
    {
      id: 5,
      type: 'safety_alert',
      title: 'Safety Update',
      message: 'New safety features available in your area',
      time: '1 day ago',
      read: true,
      icon: <FaExclamationTriangle />,
      color: '#EF4444'
    }
  ]);

  const [activeFilter, setActiveFilter] = useState('all');

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter(notif => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return !notif.read;
    return notif.type === activeFilter;
  });

  const unreadCount = notifications.filter(notif => !notif.read).length;

  const notificationTypes = [
    { id: 'all', name: 'All', count: notifications.length },
    { id: 'unread', name: 'Unread', count: unreadCount },
    { id: 'ride_confirmed', name: 'Rides', count: notifications.filter(n => n.type.includes('ride')).length },
    { id: 'payment_received', name: 'Payments', count: notifications.filter(n => n.type.includes('payment')).length }
  ];

  return (
    <div className="notifications-container">
      {/* Header */}
      <div className="notifications-header">
        <div className="header-left">
          <button className="back-button" onClick={() => window.history.back()}>
            <FaChevronLeft />
          </button>
          <div className="header-title">
            <FaBell className="header-icon" />
            <h1>Notifications</h1>
            {unreadCount > 0 && (
              <span className="unread-badge">{unreadCount}</span>
            )}
          </div>
        </div>
        <div className="header-actions">
          <button className="action-btn" onClick={markAllAsRead}>
            Mark all as read
          </button>
          <button className="action-btn clear-btn" onClick={clearAll}>
            Clear all
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        {notificationTypes.map(type => (
          <button
            key={type.id}
            className={`filter-tab ${activeFilter === type.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(type.id)}
          >
            <span className="tab-name">{type.name}</span>
            {type.count > 0 && (
              <span className="tab-count">{type.count}</span>
            )}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="notifications-list">
        {filteredNotifications.length === 0 ? (
          <div className="empty-state">
            <FaBell className="empty-icon" />
            <h3>No notifications</h3>
            <p>When you get notifications, they'll appear here</p>
          </div>
        ) : (
          filteredNotifications.map(notification => (
            <div
              key={notification.id}
              className={`notification-item ${notification.read ? 'read' : 'unread'}`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="notification-icon" style={{ color: notification.color }}>
                {notification.icon}
              </div>
              
              <div className="notification-content">
                <div className="notification-header">
                  <h4 className="notification-title">{notification.title}</h4>
                  <span className="notification-time">{notification.time}</span>
                </div>
                <p className="notification-message">{notification.message}</p>
                
                {/* Action Buttons for specific notification types */}
                {notification.type === 'ride_confirmed' && !notification.read && (
                  <div className="notification-actions">
                    <button className="action-btn primary">View Ride</button>
                    <button className="action-btn">Message Driver</button>
                  </div>
                )}
                
                {notification.type === 'passenger_joined' && !notification.read && (
                  <div className="notification-actions">
                    <button className="action-btn primary">Welcome</button>
                    <button className="action-btn">View Profile</button>
                  </div>
                )}
              </div>

              <div className="notification-actions-right">
                {!notification.read && (
                  <div className="unread-dot"></div>
                )}
                <button 
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(notification.id);
                  }}
                >
                  <FaTimes />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick Actions Footer */}
      <div className="quick-actions">
        <button className="quick-action-btn">
          <FaBell />
          <span>Notification Settings</span>
        </button>
        <button className="quick-action-btn">
          <FaCar />
          <span>Ride History</span>
        </button>
      </div>
    </div>
  );
};

export default Notifications;