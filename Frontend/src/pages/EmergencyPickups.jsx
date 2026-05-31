import React, { useEffect, useState } from "react";
import API from "../api/api";

function EmergencyPickups() {
  const [pickups, setPickups] = useState([]);
  const [search, setSearch] = useState("");

  const fetchPickups = async () => {
    const res = await API.get("/emergency-pickups");
    setPickups(res.data);
  };

  const updateStatus = async (id, statusi) => {
    await API.put(`/emergency-pickups/${id}`, { statusi });
    fetchPickups();
  };

  const deletePickup = async (id) => {
    if (!window.confirm("Delete request?")) return;
    await API.delete(`/emergency-pickups/${id}`);
    fetchPickups();
  };

  useEffect(() => {
    fetchPickups();
  }, []);

  const filteredPickups = pickups.filter((p) =>
  `${p.emri} ${p.telefoni} ${p.lokacioni} ${p.nevoja_servisit} ${p.statusi}`
    .toLowerCase()
    .includes(search.toLowerCase())
    );

  return (
    <div className="container mt-4">
      <h2>Emergency Pickups</h2>

      <input
        type="text"
        className="form-control mt-3 mb-3"
        placeholder="Search emergency pickups..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
    />

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Service Needed</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredPickups.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.emri}</td>
              <td>{p.telefoni}</td>
              <td>{p.lokacioni}</td>
              <td>{p.nevoja_servisit}</td>
              <td>{p.statusi}</td>
              <td>{p.data_krijimit}</td>

              <td>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => updateStatus(p.id, "Completed")}
                >
                  Complete
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deletePickup(p.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmergencyPickups;