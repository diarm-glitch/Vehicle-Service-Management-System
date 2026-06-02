import Navbar from "../components/Navbar";

function Tyres() {
  return (
    <>
      <header className="hero repairs-hero">
        <Navbar />

        <section className="hero-content">
          <h1>Tyres</h1>
          <p>Reliable tyre replacement and inspection services</p>
        </section>
      </header>

      <section className="repair-info-section">
        <div className="repair-info-card">
          <img src="/service7.png" alt="Price" />
          <h4>Up to 50% cheaper than franchise dealers</h4>
        </div>

        <div className="repair-info-card">
          <img src="/service6.png" alt="Quote" />
          <h4>Instant fixed price quotes</h4>
          <p>(no hidden estimates)</p>
        </div>

        <div className="repair-info-card">
          <img src="/service4.png" alt="Mechanic" />
          <h4>Fully vetted & qualified mechanics</h4>
        </div>

        <div className="repair-info-card">
          <img src="/services3.png" alt="Warranty" />
          <h4>1 year parts & repairs warranty</h4>
        </div>

        <div className="repair-info-card">
          <img src="/service5.png" alt="Booking" />
          <h4>Next day bookings at your home or office</h4>
        </div>
      </section>

      <section className="repair-stats-section">
        <div className="repair-stat-card">
          <h3>Expert Mechanics</h3>
          <h2>200+</h2>
          <p>Total expert diagnostic inspection mechanics</p>
        </div>

        <div className="repair-stat-card">
          <h3>Number of Ratings</h3>
          <h2>23,924</h2>
          <p>Total number of diagnostic inspection reviews</p>
        </div>

        <div className="repair-stat-card">
          <h3>Average Rating</h3>
          <div className="rating-stars">
            <img src="/servicesI.png" alt="star" />
          </div>
          <p>Average user rating for diagnostic inspection bookings</p>
        </div>
      </section>
    </>
  );
}

export default Tyres;