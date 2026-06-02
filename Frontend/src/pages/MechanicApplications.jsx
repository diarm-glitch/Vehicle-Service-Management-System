import React, { useEffect, useState } from "react";
import API from "../api/api";

function MechanicApplications() {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");

  const fetchApplications = async () => {
    const res = await API.get("/mechanic-applications");
    setApplications(res.data);
  };

  const updateStatus = async (id, statusi) => {
    await API.put(`/mechanic-applications/${id}`, { statusi });
    fetchApplications();
  };

  const deleteApplication = async (id) => {
    if (!window.confirm("Delete application?")) return;
    await API.delete(`/mechanic-applications/${id}`);
    fetchApplications();
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const filteredApplications = applications.filter((a) =>
  `${a.full_name} ${a.email} ${a.phone_number} ${a.specialization} ${a.statusi}`
    .toLowerCase()
    .includes(search.toLowerCase())
    );

  return (
    <div className="container mt-4">
      <h2>Mechanic Applications</h2>

      <input
        type="text"
        className="form-control mt-3 mb-3"
        placeholder="Search mechanic applications..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Experience</th>
            <th>Specialization</th>
            <th>Status</th>
            <th>Actions</th>
            <th>CV</th>
          </tr>
        </thead>

        <tbody>
          {filteredApplications.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.full_name}</td>
              <td>{a.email}</td>
              <td>{a.phone_number}</td>
              <td>{a.experience_years}</td>
              <td>{a.specialization}</td>
              <td>{a.statusi}</td>

              <td>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => updateStatus(a.id, "Approved")}
                >
                  Approve
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteApplication(a.id)}
                >
                  Delete
                </button>
              </td>

              <td>
                    {a.cv_file ? (
                    <a
                    href={`http://localhost:5000/uploads/${a.cv_file}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-sm btn-primary"
                >
                    Download CV
                    </a>
                    ) : (
                    "No file"
                    )}
                </td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
}

export default MechanicApplications;