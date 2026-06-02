import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function PrePurchaseInspection() {
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    car_make: "",
    car_model: "",
    car_year: "",
    car_location: "",
    preferred_date: "",
    preferred_time: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/pre-purchase-inspection-requests", {
      ...formData,
      user_id: localStorage.getItem("userId"),
    });

    alert("Pre-purchase inspection request sent successfully!");
    setShowForm(false);
  };

  return (
    <>
      <header className="hero repairs-hero">
        <Navbar />

        <section className="hero-content">
          <h1>Pre-Purchase Inspection</h1>
          <p>Check the vehicle before you buy it</p>
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
          <p>Total expert pre-purchase inspection mechanics</p>
        </div>

        <div className="repair-stat-card">
          <h3>Number of Ratings</h3>
          <h2>23,924</h2>
          <p>Total number of pre-purchase inspection reviews</p>
        </div>

        <div className="repair-stat-card">
          <h3>Average Rating</h3>
          <div className="rating-stars">
            <img src="/servicesI.png" alt="star" />
          </div>
          <p>Average user rating for pre-purchase inspection bookings</p>
        </div>
      </section>

      <section className="service-booking-section">
        <h2>Book your inspection in a few simple steps</h2>

        <div className="service-booking-grid">
          <div className="service-booking-card">
            <img src="/service8.png" alt="About car" />
            <h3>About the car</h3>
            <p>Enter the car details and where it is located.</p>
          </div>

          <div className="service-booking-card">
            <img src="/service9.png" alt="Date and time" />
            <h3>Pick a date & time</h3>
            <p>Choose the date and time that suits you.</p>
          </div>

          <div className="service-booking-card">
            <img src="/service10.png" alt="Relax" />
            <h3>Sit back and relax!</h3>
            <p>A mechanic will inspect the car and update your request.</p>
          </div>
        </div>

        <button className="service-quote-btn" onClick={() => setShowForm(true)}>
          Book Inspection
        </button>
      </section>

      {showForm && (
        <div className="service-form-overlay">
          <div className="service-form-box">
            <button className="service-form-close" onClick={() => setShowForm(false)}>
              ×
            </button>

            <h2>Pre-Purchase Inspection Request</h2>

            <form className="service-request-form" onSubmit={handleSubmit}>
              <input name="full_name" type="text" placeholder="Full name" value={formData.full_name} onChange={handleChange} required />
              <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
              <input name="phone" type="text" placeholder="Phone number" value={formData.phone} onChange={handleChange} required />
              <input name="car_make" type="text" placeholder="Car make" value={formData.car_make} onChange={handleChange} required />
              <input name="car_model" type="text" placeholder="Car model" value={formData.car_model} onChange={handleChange} required />
              <input name="car_year" type="number" placeholder="Car year" value={formData.car_year} onChange={handleChange} />
              <input name="car_location" type="text" placeholder="Car location" value={formData.car_location} onChange={handleChange} required />
              <input name="preferred_date" type="date" value={formData.preferred_date} onChange={handleChange} />
              <input name="preferred_time" type="time" value={formData.preferred_time} onChange={handleChange} />
              <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange}></textarea>

              <button type="submit">Send Request</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default PrePurchaseInspection;