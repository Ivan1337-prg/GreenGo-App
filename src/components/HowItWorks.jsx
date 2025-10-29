import { FaCarSide, FaUpload, FaBell, FaWallet } from "react-icons/fa";
import phone from "../assets/phone.jpg";

const items = [
  {
    id: "01",
    icon: <FaCarSide />,
    title: "Request a Ride",
    text:
      "Put your current location and destination, then search a ride that suits you."
  },
  {
    id: "02",
    icon: <FaUpload />,
    title: "Post a Ride",
    text:
      "Going somewhere but hate to travel alone? Post your ride details and publish it."
  },
  {
    id: "03",
    icon: <FaBell />,
    title: "Instant Notifications",
    text:
      "Get instant updates when someone joins your ride."
  },
  {
    id: "04",
    icon: <FaWallet />,
    title: "Cashless Payment",
    text:
      "Pay easily using your GreenGo wallet — no cash needed."
  }
];

export default function HowItWorks() {
  return (
    <section id="how" className="how">
      <div className="container">
        <h2 className="section__title">How GreenGo Works</h2>
        <p className="section__subtitle">
          Download and install the GreenGo app. Enter your phone number and make
          your user account. When approved, you may start driving.
        </p>

        <div className="how__grid">
          <div className="how__card">
            <div className="how__badge">{items[0].id}</div>
            <div className="how__icon">{items[0].icon}</div>
            <h3 className="how__title">{items[0].title}</h3>
            <p className="how__text">{items[0].text}</p>
          </div>

          <div className="how__center">
            <div className="how__phone-wrapper">
              <div className="how__greeting">Good day, Siffat</div>
              <img src={phone} alt="App phone" className="how__phone" />
            </div>
          </div>

          <div className="how__card">
            <div className="how__badge">{items[1].id}</div>
            <div className="how__icon">{items[1].icon}</div>
            <h3 className="how__title">{items[1].title}</h3>
            <p className="how__text">{items[1].text}</p>
          </div>

          <div className="how__card">
            <div className="how__badge">{items[2].id}</div>
            <div className="how__icon">{items[2].icon}</div>
            <h3 className="how__title">{items[2].title}</h3>
            <p className="how__text">{items[2].text}</p>
          </div>

          <div className="how__card">
            <div className="how__badge">{items[3].id}</div>
            <div className="how__icon">{items[3].icon}</div>
            <h3 className="how__title">{items[3].title}</h3>
            <p className="how__text">{items[3].text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
