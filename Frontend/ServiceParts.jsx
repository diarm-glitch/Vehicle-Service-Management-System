import { useEffect, useState } from "react";
import API from "../api/api.js";

function ServiceParts() {
  const [serviceParts, setServiceParts] = useState([]);

  const [formData, setFormData] = useState({
    service_record_id: "",
    part_id: "",
    sasia: "",
    cmimi: "",
  });

  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const getServiceParts = async () => {
    try {
      const response = await API.get("/service-parts");
      setServiceParts(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load service parts");
    }
  };

  useEffect(() => {
    getServiceParts();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      service_record_id: "",
      part_id: "",
      sasia: "",
      cmimi: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/service-parts", formData);

      alert("Service part added successfully");

      getServiceParts();
      resetForm();
    } catch (error) {
      console.log(error);
      alert("Failed to add service part");
    }
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this customer?")) {
          await API.delete(`/customers/${id}`);
          }

      alert("Service part deleted successfully");

      getServiceParts();
    } catch (error) {
      console.log(error);
      alert("Failed to delete service part");
    }
  };

  const handleEdit = (part) => {
    setEditing(true);
    setEditId(part.id);

    setFormData({
      service_record_id: part.service_record_id || "",
      part_id: part.part_id || "",
      sasia: part.sasia || "",
      cmimi: part.cmimi || "",
    });
  };

  const handleUpdate = async () => {
    try {
      await API.put(`/service-parts/${editId}`, formData);

      alert("Service part updated successfully");

      getServiceParts();

      setEditing(false);
      setEditId(null);

      resetForm();
    } catch (error) {
      console.log(error);
      alert("Failed to update service part");
    }
  };

  return (
    <div className="container mt-5">
      <h1>Service Parts</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row">

          <div className="col">
            <input
              type="number"
              name="service_record_id"
              placeholder="Service Record ID"
              className="form-control"
              value={formData.service_record_id}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <input
              type="number"
              name="part_id"
              placeholder="Part ID"
              className="form-control"
              value={formData.part_id}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <input
              type="number"
              name="sasia"
              placeholder="Sasia"
              className="form-control"
              value={formData.sasia}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <input
              type="number"
              name="cmimi"
              placeholder="Cmimi"
              className="form-control"
              value={formData.cmimi}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <button
              type={editing ? "button" : "submit"}
              className={editing ? "btn btn-success" : "btn btn-primary"}
              onClick={editing ? handleUpdate : undefined}
            >
              {editing ? "Update Service Part" : "Add Service Part"}
            </button>
          </div>

        </div>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Service Record ID</th>
            <th>Part ID</th>
            <th>Sasia</th>
            <th>Cmimi</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {serviceParts.map((part) => (
            <tr key={part.id}>
              <td>{part.id}</td>
              <td>{part.service_record_id}</td>
              <td>{part.part_id}</td>
              <td>{part.sasia}</td>
              <td>{part.cmimi}</td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(part)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(part.id)}
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

export default ServiceParts;