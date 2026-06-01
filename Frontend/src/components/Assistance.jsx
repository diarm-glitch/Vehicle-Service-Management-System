import { Link } from "react-router-dom";

function Assistance() {
  return (
    <section id="assistance" className="assistance">
      <h2>Roadside Assistance Services</h2>

      <div className="assistance-content">
        <div className="assistance-item">
          <h3>Tire damage</h3>
          <p>We assist in changing the tire.</p>
        </div>

        <div className="assistance-center">
          <span>service</span>
          <strong>24h</strong>
        </div>

        <div className="assistance-item">
          <h3>In case of accident</h3>
          <p>
            The vehicle will be transported according to the client's request,
            to the client's preferred service or location.
          </p>
        </div>

        <div className="assistance-item">
          <h3>Ignition assistance</h3>
          <p>Cable assistance in case of power outage</p>
        </div>

        <div className="assistance-spacer"></div>

        <div className="assistance-item">
          <h3>Other defect</h3>
          <p>
            The vehicle will be transported according to the client's request,
            to the client's preferred service or location.
          </p>
        </div>
      </div>

      <Link to="/roadside-subscription" className="package-btn">
        Subscribe
      </Link>
    </section>
  );
}

export default Assistance;