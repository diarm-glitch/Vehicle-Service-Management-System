import { useEffect, useState } from "react";
import axios from "axios";

function ServicingRequests() {
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");

  const fetchRequests = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get("http://localhost:5000/servicing-requests", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setRequests(res.data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const filteredRequests = requests.filter((req) =>
    `${req.full_name} ${req.email} ${req.phone} ${req.car_make} ${req.car_model} ${req.location} ${req.statusi}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Servicing Requests</h1>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search servicing requests..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Car</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
            <th>Message</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredRequests.map((req) => (
            <tr key={req.id}>
              <td>{req.id}</td>
              <td>{req.full_name}</td>
              <td>{req.email}</td>
              <td>{req.phone}</td>
              <td>
                {req.car_make} {req.car_model}
              </td>
              <td>{req.location}</td>
              <td>
                {req.preferred_date
                  ? new Date(req.preferred_date).toISOString().split("T")[0]
                  : "-"}
              </td>
              <td>{req.preferred_time || "-"}</td>
              <td>{req.message}</td>
              <td>{req.statusi}</td>
              <td>
                <button className="btn btn-success btn-sm me-2"
                onClick={() => approveRequest(req.id)}>
                  Approve
                </button>

                <button className="btn btn-danger btn-sm">
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

export default ServicingRequests;