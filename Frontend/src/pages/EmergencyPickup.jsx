import React, { useState } from "react";
import API from "../api/api";

function EmergencyPickup() {
  const [form, setForm] = useState({
    emri: "",
    telefoni: "",
    lokacioni: "",
    nevoja_servisit: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/emergency-pickups", form);

      alert("Emergency pickup request sent successfully!");

      setForm({
        emri: "",
        telefoni: "",
        lokacioni: "",
        nevoja_servisit: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to send emergency pickup request");
    }
  };

  return (
    <section className="emergency-section py-5">
      <div className="container">
        <h2 className="text-center mb-4">Emergency Pickup</h2>

        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-sm p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    name="emri"
                    value={form.emri}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your phone number"
                    name="telefoni"
                    value={form.telefoni}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your location"
                    name="lokacioni"
                    value={form.lokacioni}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Service Needed</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Describe the emergency or service needed"
                    name="nevoja_servisit"
                    value={form.nevoja_servisit}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-danger w-100">
                  Send Emergency Request
                </button>

                <p className="text-danger text-center mt-3 mb-0 fw-bold">
                Emergency Hotline:
                <a href="tel:+38349123456" className="text-danger text-decoration-none ms-1"> +383 49 123 456</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EmergencyPickup;