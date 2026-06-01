import { Link } from "react-router-dom";

function Services() {
  return (
    <section id="services" className="services">
      <h2>Our Services</h2>

      <div className="service-grid">
        <Link to="/repairs" className="service-card">
          <img src="/repair.png" alt="Repairs icon" className="service-icon" />
          <h3>Repairs</h3>
        </Link>

        <Link to="/diagnostics" className="service-card">
          <img src="/diagnos.png" alt="Diagnostics icon" className="service-icon" />
          <h3>Diagnostics</h3>
        </Link>

        <Link to="/servicing" className="service-card">
          <img src="/servis.png" alt="Services icon" className="service-icon" />
          <h3>Servicing</h3>
        </Link>

        <Link to="/tyres" className="service-card">
          <img src="/tyres.png" alt="Tyres icon" className="service-icon" />
          <h3>Tyres</h3>
        </Link>

        <Link to="/tuning" className="service-card">
          <img src="/tuning.png" alt="Tuning icon" className="service-icon tuning-icon" />
          <h3>Tuning</h3>
        </Link>

        <Link to="/pre-purchase-inspection" className="service-card">
          <img src="/inspection.png" alt="Inspection icon" className="service-icon" />
          <h3>Pre-Purchase Inspection</h3>
        </Link>
      </div>

      <a href="/repairs" className="services-btn">Find out more →</a>
    </section>
  );
}

export default Services;