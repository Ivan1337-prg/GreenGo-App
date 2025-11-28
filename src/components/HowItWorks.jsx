import React from 'react';
import { Link } from 'react-router-dom';
import { FaCarSide, FaUpload, FaBell, FaWallet, FaHome, FaUser } from 'react-icons/fa';
import heroIllustration from "../assets/hero-illustration.jpg";
import phone from "../assets/phone.jpg";

const items = [
  {
    id: "01",
    icon: <FaCarSide />,
    title: "Request a Ride",
    text: "Put your current location and destination, then search a ride that suits you.",
    path: "/request-ride"
  },
  {
    id: "02",
    icon: <FaUpload />,
    title: "Post a Ride",
    text: "Going somewhere but hate to travel alone? Post your ride details and publish it.",
    path: "/post-ride"
  },
  {
    id: "03",
    icon: <FaBell />,
    title: "Instant Notifications",
    text: "Get instant updates when someone joins your ride.",
    path: "/notifications"
  },
  {
    id: "04",
    icon: <FaWallet />,
    title: "Cashless Payment",
    text: "Pay easily using your GreenGo wallet — no cash needed.",
    path: "/payment"
  }
];

export default function HowItWorks() {
  return (
    <section id="how" className="how">
      <div className="container">
        <h2 className="section__title">How GreenGo Works</h2>
        <p className="section__subtitle">
          Download and install the GreenGo app. Enter your phone number and make your user account. When approved, you may start driving.
        </p>

        <div className="how__grid">
          {/* Card 1 - Request a Ride */}
          <div className="how__card">
            <div className="how__badge">{items[0].id}</div>
            <div className="how__icon">{items[0].icon}</div>
            <h3 className="how__title">{items[0].title}</h3>
            <p className="how__text">{items[0].text}</p>
            <Link to={items[0].path}>
              <button className="btn btn-solid how__btn">
                Request a Ride
              </button>
            </Link>
          </div>

          <div className="how__center">
            <div className="how__phone-wrapper">
              <div className="how__phone-shell" role="img" aria-label="phone mockup">
                <div
                  className="how__phone-screen"
                  style={{ backgroundImage: `url(${heroIllustration})` }}
                />
              </div>
              <img src={phone} alt="phone frame" className="how__phone-frame" />
              <div className="how__greeting">Good day, Siffat</div>
              <div className="how__bottom-nav" role="navigation" aria-label="phone bottom nav">
                <button className="nav-btn" aria-label="Home">
                  <FaHome className="nav-icon" />
                  <span>Home</span>
                </button>
                <button className="nav-btn" aria-label="My Ride">
                  <FaCarSide className="nav-icon" />
                  <span>Ride</span>
                </button>
                <button className="nav-btn" aria-label="Notifications">
                  <FaBell className="nav-icon" />
                  <span>Notifications</span>
                </button>
                <button className="nav-btn" aria-label="Profile">
                  <FaUser className="nav-icon" />
                  <span>Profile</span>
                </button>
              </div>
            </div>
            <div className="how__actions">
              <Link to="/request-ride">
                <button className="btn btn-outline how__btn">
                  Find a ride
                </button>
              </Link>
              <Link to="/post-ride">
                <button className="btn btn-solid how__btn">
                  Publish a ride
                </button>
              </Link>
            </div>
          </div>

          {/* Other Cards */}
          {items.slice(1).map((item) => (
            <div className="how__card" key={item.id}>
              <div className="how__badge">{item.id}</div>
              <div className="how__icon">{item.icon}</div>
              <h3 className="how__title">{item.title}</h3>
              <p className="how__text">{item.text}</p>
              <Link to={item.path}>
                <button className="btn btn-solid how__btn">
                  {item.title}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}