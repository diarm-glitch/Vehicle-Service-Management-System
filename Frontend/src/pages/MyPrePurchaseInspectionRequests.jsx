import { useEffect, useState } from "react";
import axios from "axios";

function MyPrePurchaseInspectionRequests() {
  const [requests, setRequests] = useState([]);

  const fetchMyRequests = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const res = await axios.get(
      `http://localhost:5000/pre-purchase-inspection-requests/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setRequests(res.data);
  };

  useEffect(() => {
    fetchMyRequests();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">My Pre-Purchase Inspection Requests</h1>

      {requests.length === 0 ? (
        <div className="alert alert-info">
          No pre-purchase inspection request made.
        </div>
      ) : (
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Car</th>
              <th>Location</th>
              <th>Date</th>
              <th>Time</th>
              <th>Message</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>
                  {req.car_make} {req.car_model}
                </td>

                <td>{req.car_location}</td>

                <td>
                  {req.preferred_date
                    ? new Date(req.preferred_date)
                        .toISOString()
                        .split("T")[0]
                    : "-"}
                </td>

                <td>{req.preferred_time || "-"}</td>

                <td>{req.message}</td>

                <td>
                  <span
                    className={
                      req.statusi === "Approved"
                        ? "badge bg-success"
                        : "badge bg-warning text-dark"
                    }
                  >
                    {req.statusi}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyPrePurchaseInspectionRequests;