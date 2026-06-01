import { useState } from "react";
import axios from "axios";

function RoadsideSubscription() {
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    location: "",
    service_reason: "",
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

    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      await axios.post(
        "http://localhost:5000/roadside-subscriptions",
        {
          ...formData,
          user_id: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Subscription request sent successfully!");

      setFormData({
        full_name: "",
        phone: "",
        location: "",
        service_reason: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error sending request");
    }
  };

  return (
    <div className="container mt-4">
      <h1>Roadside Assistance Subscription</h1>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-3"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-3"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-3"
          name="service_reason"
          placeholder="Reason (Flat tire, accident, etc.)"
          value={formData.service_reason}
          onChange={handleChange}
        />

        <textarea
          className="form-control mb-3"
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
        />

        <button className="btn btn-primary" type="submit">
          Send Request
        </button>
      </form>
    </div>
  );
}

export default RoadsideSubscription;