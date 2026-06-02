import { useEffect, useState } from "react";
import axios from "axios";

function PrePurchaseInspectionRequests() {
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");

  const fetchRequests = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/pre-purchase-inspection-requests",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setRequests(res.data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const approveRequest = async (id) => {
    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/pre-purchase-inspection-requests/${id}`,
      { statusi: "Approved" },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchRequests();
  };

  const deleteRequest = async (id) => {
    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:5000/pre-purchase-inspection-requests/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchRequests();
  };

  const filteredRequests = requests.filter((req) =>
    `${req.full_name} ${req.email} ${req.phone} ${req.car_make} ${req.car_model} ${req.car_location} ${req.statusi}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Pre-Purchase Inspection Requests</h1>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search pre-purchase inspection requests..."
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
            <th>Car Location</th>
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
              <td>{req.car_location}</td>
              <td>
                {req.preferred_date
                  ? new Date(req.preferred_date).toISOString().split("T")[0]
                  : "-"}
              </td>
              <td>{req.preferred_time || "-"}</td>
              <td>{req.message}</td>
              <td>{req.statusi}</td>
              <td>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => approveRequest(req.id)}
                >
                  Approve
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteRequest(req.id)}
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

export default PrePurchaseInspectionRequests;