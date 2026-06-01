import { useEffect, useState } from "react";
import API from "../api/api.js";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    vehicle_id: "",
    service_type_id: "",
    data: "",
    ora: "",
    statusi: "",
    shenime: "",
  });

  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const getAppointments = async () => {
    try {
      const response = await API.get("/appointments");
      setAppointments(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load appointments");
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      vehicle_id: "",
      service_type_id: "",
      data: "",
      ora: "",
      statusi: "",
      shenime: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/appointments", formData);

      alert("Appointment added successfully");

      getAppointments();
      resetForm();
    } catch (error) {
      console.log(error);
      alert("Failed to add appointment");
    }
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this appointment?")) {
          await API.delete(`/customers/${id}`);
          }

      alert("Appointment deleted successfully");

      getAppointments();
    } catch (error) {
      console.log(error);
      alert("Failed to delete appointment");
    }
  };

  const handleEdit = (appointment) => {
    setEditing(true);
    setEditId(appointment.id);

    setFormData({
      vehicle_id: appointment.vehicle_id || "",
      service_type_id: appointment.service_type_id || "",
      data: appointment.data || "",
      ora: appointment.ora || "",
      statusi: appointment.statusi || "",
      shenime: appointment.shenime || "",
    });
  };

  const handleUpdate = async () => {
    try {
      await API.put(`/appointments/${editId}`, formData);

      alert("Appointment updated successfully");

      getAppointments();

      setEditing(false);
      setEditId(null);
      resetForm();
    } catch (error) {
      console.log(error);
      alert("Failed to update appointment");
    }
  };

  const filteredAppointments = appointments.filter((appointment) =>
    String(appointment.vehicle_id).includes(search) ||
    appointment.data?.toLowerCase().includes(search.toLowerCase()) ||
    appointment.ora?.toLowerCase().includes(search.toLowerCase()) ||
    appointment.statusi?.toLowerCase().includes(search.toLowerCase()) ||
    appointment.shenime?.toLowerCase().includes(search.toLowerCase()) ||
    String(appointment.service_type_id).includes(search)
  );

  return (
    <div className="container mt-5">
      <h1>Appointments</h1>

      <input
          type="text"
          placeholder="Search appointments..."
          className="form-control mb-3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
      />

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row">
          <div className="col">
            <input
              type="number"
              name="vehicle_id"
              placeholder="Vehicle ID"
              className="form-control"
              value={formData.vehicle_id}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <input
              type="number"
              name="service_type_id"
              placeholder="Service Type ID"
              className="form-control"
              value={formData.service_type_id}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <input
              type="date"
              name="data"
              className="form-control"
              value={formData.data}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <input
              type="time"
              name="ora"
              className="form-control"
              value={formData.ora}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <input
              type="text"
              name="statusi"
              placeholder="Statusi"
              className="form-control"
              value={formData.statusi}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <input
              type="text"
              name="shenime"
              placeholder="Shenime"
              className="form-control"
              value={formData.shenime}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <button
              type={editing ? "button" : "submit"}
              className={editing ? "btn btn-success" : "btn btn-primary"}
              onClick={editing ? handleUpdate : undefined}
            >
              {editing ? "Update Appointment" : "Add Appointment"}
            </button>
          </div>
        </div>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Vehicle ID</th>
            <th>Service Type ID</th>
            <th>Data</th>
            <th>Ora</th>
            <th>Statusi</th>
            <th>Shenime</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredAppointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.id}</td>
              <td>{appointment.vehicle_id}</td>
              <td>{appointment.service_type_id}</td>
              <td>{appointment.data}</td>
              <td>{appointment.ora}</td>
              <td>{appointment.statusi}</td>
              <td>{appointment.shenime}</td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(appointment)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(appointment.id)}
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

export default Appointments;