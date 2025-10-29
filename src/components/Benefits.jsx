import { FaClock, FaMoneyBillWave, FaHeadset } from "react-icons/fa";

export default function Benefits() {
  return (
    <section id="benefits" className="benefits">
      <div className="container">
        <h2 className="section__title">GreenGo Benefits</h2>

        <div className="benefits__list">
          <article className="benefit">
            <div className="benefit__index">01.</div>
            <div className="benefit__body">
              <h3 className="benefit__title">
                <FaClock className="benefit__icon" />
                Flexible working hours
              </h3>
              <p className="benefit__text">
                You can decide when, and how much time you want to drive.
              </p>
            </div>
          </article>

          <article className="benefit">
            <div className="benefit__index">02.</div>
            <div className="benefit__body">
              <h3 className="benefit__title">
                <FaMoneyBillWave className="benefit__icon" />
                Earnings
              </h3>
              <p className="benefit__text">
                By driving with GreenGo, you can earn more.
              </p>
            </div>
          </article>

          <article className="benefit">
            <div className="benefit__index">03.</div>
            <div className="benefit__body">
              <h3 className="benefit__title">
                <FaHeadset className="benefit__icon" />
                Customer support 24/7
              </h3>
              <p className="benefit__text">
                We are proud to support you in your local language, anytime you need.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
