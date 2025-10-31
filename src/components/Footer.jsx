import { FaGooglePlay, FaApple } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__row">
        <div className="footer__copy">
          © {new Date().getFullYear()} GreenGo by UNT Students • All Rights Reserved
        </div>
        <div className="footer__actions">
          <button className="btn btn-outline btn-sm">
            <FaGooglePlay className="btn__icon" />
            Google Play
          </button>
          <button className="btn btn-outline btn-sm">
            <FaApple className="btn__icon" />
            App Store
          </button>
        </div>
      </div>
    </footer>
  );
}
