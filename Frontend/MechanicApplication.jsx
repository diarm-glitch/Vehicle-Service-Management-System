import React, { useState } from "react";
import API from "../api/api";

function MechanicApplication() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    experience_years: "",
    specialization: "Engine Repair",
    about_text: "",
    cv_file: "",
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
      const formData = new FormData();

      formData.append("full_name", form.full_name);
      formData.append("email", form.email);
      formData.append("phone_number", form.phone_number);
      formData.append("experience_years", form.experience_years);
      formData.append("specialization", form.specialization);
      formData.append("about_text", form.about_text);

      if (form.cv_file) {
        formData.append("cv_file", form.cv_file);
      }

      await API.post("/mechanic-applications", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Application submitted successfully!");

      setForm({
        full_name: "",
        email: "",
        phone_number: "",
        experience_years: "",
        specialization: "Engine Repair",
        about_text: "",
        cv_file: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to submit application");
    }
  };

  return (
    <section className="contact-section mechanic-page">
      <div className="container py-5">
        <h2 className="text-center contact-title mb-4">
          Apply to be a Mechanic
        </h2>

        <div className="row justify-content-center">
          <div className="col-lg-7">
            <div className="card shadow-sm p-4 contact-card">

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your full name"
                    name="full_name"
                    value={form.full_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your phone number"
                    name="phone_number"
                    value={form.phone_number}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Years of Experience</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Years of experience"
                    name="experience_years"
                    value={form.experience_years}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Specialization</label>
                  <select
                    className="form-control"
                    name="specialization"
                    value={form.specialization}
                    onChange={handleChange}
                  >
                    <option>Engine Repair</option>
                    <option>Diagnostics</option>
                    <option>Tyres</option>
                    <option>Electrical Systems</option>
                    <option>General Service</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">About You</label>
                  <textarea
                    className="form-control"
                    rows="5"
                    placeholder="Tell us about your experience"
                    name="about_text"
                    value={form.about_text}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">Upload CV</label>

                  <input
                    type="file"
                    className="form-control"
                    accept=".pdf,.doc,.docx"
                    name="cv_file" 
                    onChange={(e) =>
                      setForm({ ...form, cv_file: e.target.files[0] })
                    }
                  />

                  <small className="text-muted">
                    CV upload will be added later.
                  </small>
                </div>

                <button
                  type="submit"
                  className="btn contact-btn w-100"
                >
                  Submit Application
                </button>

              </form>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MechanicApplication;