import { useEffect, useState } from "react";
import axios from "axios";

function RoadsideSubscriptions() {
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");

  const fetchRequests = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get("http://localhost:5000/roadside-subscriptions", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setRequests(res.data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const approveRequest = async (id) => {
    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/roadside-subscriptions/approve/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchRequests();
  };

  const denyRequest = async (id) => {
    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/roadside-subscriptions/deny/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchRequests();
  };

  const deleteRequest = async (id) => {
    const token = localStorage.getItem("token");

    await axios.delete(`http://localhost:5000/roadside-subscriptions/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchRequests();
  };

  const filteredRequests = requests.filter((req) =>
    `${req.full_name} ${req.phone} ${req.location} ${req.service_reason} ${req.statusi}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Roadside Subscription Requests</h1>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search roadside subscription requests..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Full Name</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Reason</th>
            <th>Message</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredRequests.map((req) => (
            <tr key={req.id}>
              <td>{req.id}</td>
              <td>{req.user_id}</td>
              <td>{req.full_name}</td>
              <td>{req.phone}</td>
              <td>{req.location}</td>
              <td>{req.service_reason}</td>
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
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => denyRequest(req.id)}
                >
                  Deny
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

export default RoadsideSubscriptions;