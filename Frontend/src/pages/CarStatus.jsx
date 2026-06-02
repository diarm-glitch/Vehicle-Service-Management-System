import React, { useEffect, useState } from "react";
import API from "../api/api";

function CarStatus() {
  const [vehicles, setVehicles] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    API.get(`/vehicles/my-status/${userId}`)
      .then((res) => {
        setVehicles(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  return (
    <div className="container mt-4">
      <h2>Your Car Status</h2>

      {vehicles.length === 0 ? (
        <p>No vehicles found for your account.</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Brand</th>
              <th>Model</th>
              <th>Year</th>
              <th>Plate</th>
              <th>Kilometers</th>
              <th>Color</th>
              <th>Status</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>
            {vehicles.map((v) => (
              <tr key={v.id}>
                <td>{v.marka}</td>
                <td>{v.modeli}</td>
                <td>{v.viti}</td>
                <td>{v.targa}</td>
                <td>{v.kilometrazhi}</td>
                <td>{v.ngjyra}</td>
                <td>{v.service_status || "Nuk ka status"}</td>
                <td>{v.service_description || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CarStatus;