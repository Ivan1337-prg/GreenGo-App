import { FaGooglePlay, FaApple } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import hero from "../assets/hero-illustration.jpg";

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero__grid">
        {/* Left copy */}
        <div className="hero__copy">
          <h1 className="hero__title">
            Download App, <br /> Save Money, Make <br /> Friends!
          </h1>

          <p className="hero__subtitle">
            It’s simple and it’s free. Play your part in reducing carbon
            footprint and help Mother Nature sustain its beauty. So what are you
            waiting for? Let’s ride together.
          </p>

          <div className="hero__actions">
            <button className="btn btn-solid">
              <FaGooglePlay className="btn__icon" />
              Google Play
            </button>
            <button className="btn btn-outline">
              <FaApple className="btn__icon" />
              App Store
            </button>
          </div>
        </div>

        {/* Right visual */}
        <div className="hero__visual">
          <div className="hero__mapCard" />
          <img src={hero} className="hero__image" alt="GreenGo car" />
        </div>
      </div>

      {/* CTA Bar */}
      <div className="container hero__cta">
        <div className="cta__label">Let’s go. Get a link to download the app.</div>
        <input
          className="cta__input"
          placeholder="Enter mobile phone number"
          type="tel"
          inputMode="tel"
        />
        <button className="btn btn-dark">
          <FiPhone className="btn__icon" />
          Apply to Drive
        </button>
      </div>
    </section>
  );
}
