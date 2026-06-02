import { useEffect, useState } from "react";
import API from "../api/api.js";

function ServiceRecords() {
  const [serviceRecords, setServiceRecords] = useState([]);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    appointment_id: "",
    vehicle_id: "",
    tekniku_id: "",
    pershkrimi: "",
    data_fillimit: "",
    data_perfundimit: "",
    statusi: "",
  });

  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const getServiceRecords = async () => {
    try {
      const response = await API.get("/service-records");
      setServiceRecords(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load service records");
    }
  };

  useEffect(() => {
    getServiceRecords();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      appointment_id: "",
      vehicle_id: "",
      tekniku_id: "",
      pershkrimi: "",
      data_fillimit: "",
      data_perfundimit: "",
      statusi: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/service-records", formData);

      alert("Service record added successfully");

      getServiceRecords();
      resetForm();
    } catch (error) {
      console.log(error);
      alert("Failed to add service record");
    }
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this service record?")) {
            await API.delete(`/customers/${id}`);
          }

      alert("Service record deleted successfully");

      getServiceRecords();
    } catch (error) {
      console.log(error);
      alert("Failed to delete service record");
    }
  };

  const handleEdit = (record) => {
    setEditing(true);
    setEditId(record.id);

    setFormData({
      appointment_id: record.appointment_id || "",
      vehicle_id: record.vehicle_id || "",
      tekniku_id: record.tekniku_id || "",
      pershkrimi: record.pershkrimi || "",
      data_fillimit: record.data_fillimit || "",
      data_perfundimit: record.data_perfundimit || "",
      statusi: record.statusi || "",
    });
  };

  const handleUpdate = async () => {
    try {
      await API.put(`/service-records/${editId}`, formData);

      alert("Service record updated successfully");

      getServiceRecords();

      setEditing(false);
      setEditId(null);

      resetForm();
    } catch (error) {
      console.log(error);
      alert("Failed to update service record");
    }
  };

  const filteredServiceRecords = serviceRecords.filter((record) =>
  String(record.appointment_id).includes(search) ||
  String(record.vehicle_id).includes(search) ||
  String(record.tekniku_id).includes(search) ||
  record.pershkrimi?.toLowerCase().includes(search.toLowerCase()) ||
  record.data_fillimit?.toLowerCase().includes(search.toLowerCase()) ||
  record.data_perfundimit?.toLowerCase().includes(search.toLowerCase()) ||
  record.statusi?.toLowerCase().includes(search.toLowerCase())    
  );

  return (
    <div className="container mt-5">
      <h1>Service Records</h1>

      <input
        type="text"
        placeholder="Search service records..."
        className="form-control mb-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row">

          <div className="col">
            <input
              type="number"
              name="appointment_id"
              placeholder="Appointment ID"
              className="form-control"
              value={formData.appointment_id}
              onChange={handleChange}
            />
          </div>

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
              name="tekniku_id"
              placeholder="Tekniku ID"
              className="form-control"
              value={formData.tekniku_id}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <input
              type="text"
              name="pershkrimi"
              placeholder="Pershkrimi"
              className="form-control"
              value={formData.pershkrimi}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <input
              type="date"
              name="data_fillimit"
              className="form-control"
              value={formData.data_fillimit}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <input
              type="date"
              name="data_perfundimit"
              className="form-control"
              value={formData.data_perfundimit}
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
            <button
              type={editing ? "button" : "submit"}
              className={editing ? "btn btn-success" : "btn btn-primary"}
              onClick={editing ? handleUpdate : undefined}
            >
              {editing ? "Update Record" : "Add Record"}
            </button>
          </div>

        </div>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Appointment ID</th>
            <th>Vehicle ID</th>
            <th>Tekniku ID</th>
            <th>Pershkrimi</th>
            <th>Data Fillimit</th>
            <th>Data Perfundimit</th>
            <th>Statusi</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredServiceRecords.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.appointment_id}</td>
              <td>{record.vehicle_id}</td>
              <td>{record.tekniku_id}</td>
              <td>{record.pershkrimi}</td>
              <td>{record.data_fillimit}</td>
              <td>{record.data_perfundimit}</td>
              <td>{record.statusi}</td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(record)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(record.id)}
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

export default ServiceRecords;