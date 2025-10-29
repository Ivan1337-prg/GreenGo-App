import { FaDownload } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__row">
        <div className="footer__copy">
          © {new Date().getFullYear()} GreenGo by UNT Students • All Rights Reserved
        </div>
        <div className="footer__actions">
          <button className="btn btn-outline btn-sm">
            <FaDownload className="btn__icon" />
            Download
          </button>
          <button className="btn btn-outline btn-sm">
            <FaDownload className="btn__icon" />
            Download
          </button>
        </div>
      </div>
    </footer>
  );
}
