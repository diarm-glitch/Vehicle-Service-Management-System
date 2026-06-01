import { useEffect, useState } from "react";
import API from "../api/api.js";

const Technicians = () => {
  const [technicians, setTechnicians] = useState([]);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    user_id: "",
    emri: "",
    mbiemri: "",
    specializimi: "",
    telefoni: "",
  });

  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const getTechnicians = async () => {
    try {
      const res = await API.get("/technicians");
      setTechnicians(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load technicians");
    }
  };

  useEffect(() => {
    getTechnicians();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/technicians", formData);

      alert("Technician added successfully");

      getTechnicians();

      setFormData({
        user_id: "",
        emri: "",
        mbiemri: "",
        specializimi: "",
        telefoni: "",
      });
    } catch (error) {
      console.log(error);
      alert("Failed to add technician");
    }
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this technicians?")) {
            await API.delete(`/customers/${id}`);
          }

      alert("Technician deleted successfully");

      getTechnicians();
    } catch (error) {
      console.log(error);
      alert("Failed to delete technician");
    }
  };

  const handleEdit = (technician) => {
    setEditing(true);
    setEditId(technician.id);

    setFormData({
      user_id: technician.user_id,
      emri: technician.emri,
      mbiemri: technician.mbiemri,
      specializimi: technician.specializimi,
      telefoni: technician.telefoni,
    });
  };

  const handleUpdate = async () => {
    try {
      await API.put(`/technicians/${editId}`, formData);

      alert("Technician updated successfully");

      getTechnicians();

      setEditing(false);
      setEditId(null);

      setFormData({
        user_id: "",
        emri: "",
        mbiemri: "",
        specializimi: "",
        telefoni: "",
      });
    } catch (error) {
      console.log(error);
      alert("Failed to update technician");
    }
  };

  const filteredTechnicians = technicians.filter((technician) =>
  technician.emri?.toLowerCase().includes(search.toLowerCase()) ||
  technician.mbiemri?.toLowerCase().includes(search.toLowerCase()) ||
  technician.specializimi?.toLowerCase().includes(search.toLowerCase()) ||
  technician.telefoni?.toLowerCase().includes(search.toLowerCase()) ||
  String(technician.user_id).includes(search)
  );

  return (
    <div className="container mt-5">
      <h1>Technicians</h1>

      <input
        type="text"
        placeholder="Search technicians..."
        className="form-control mb-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <form className="mb-4" onSubmit={handleSubmit}>
        <div className="row">

          <div className="col">
            <input
              type="number"
              name="user_id"
              placeholder="User ID"
              className="form-control"
              value={formData.user_id}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <input
              type="text"
              name="emri"
              placeholder="Emri"
              className="form-control"
              value={formData.emri}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <input
              type="text"
              name="mbiemri"
              placeholder="Mbiemri"
              className="form-control"
              value={formData.mbiemri}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <input
              type="text"
              name="specializimi"
              placeholder="Specializimi"
              className="form-control"
              value={formData.specializimi}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <input
              type="text"
              name="telefoni"
              placeholder="Telefoni"
              className="form-control"
              value={formData.telefoni}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <button
              type={editing ? "button" : "submit"}
              className={`btn ${editing ? "btn-success" : "btn-primary"}`}
              onClick={editing ? handleUpdate : undefined}
            >
              {editing ? "Update Technician" : "Add Technician"}
            </button>
          </div>

        </div>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Emri</th>
            <th>Mbiemri</th>
            <th>Specializimi</th>
            <th>Telefoni</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredTechnicians.map((technician) => (
            <tr key={technician.id}>
              <td>{technician.id}</td>
              <td>{technician.user_id}</td>
              <td>{technician.emri}</td>
              <td>{technician.mbiemri}</td>
              <td>{technician.specializimi}</td>
              <td>{technician.telefoni}</td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(technician)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(technician.id)}
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
};

export default Technicians;