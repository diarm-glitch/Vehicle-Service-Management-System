import { useEffect, useState } from "react";
import API from "../api/api.js";

function Roles() {
  const [roles, setRoles] = useState([]);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    emertimi: "",
    pershkrimi: "",
    normalized_name: "",
  });

  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const getRoles = async () => {
    try {
      const response = await API.get("/roles");
      setRoles(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load roles");
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      emertimi: "",
      pershkrimi: "",
      normalized_name: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/roles", formData);

      alert("Role added successfully");

      getRoles();
      resetForm();
    } catch (error) {
      console.log(error);
      alert("Failed to add role");
    }
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this customer?")) {
          await API.delete(`/customers/${id}`);
          }

      alert("Role deleted successfully");

      getRoles();
    } catch (error) {
      console.log(error);
      alert("Failed to delete role");
    }
  };

  const handleEdit = (role) => {
    setEditing(true);
    setEditId(role.id);

    setFormData({
      emertimi: role.emertimi || "",
      pershkrimi: role.pershkrimi || "",
      normalized_name: role.normalized_name || "",
    });
  };

  const handleUpdate = async () => {
    try {
      await API.put(`/roles/${editId}`, formData);

      alert("Role updated successfully");

      getRoles();

      setEditing(false);
      setEditId(null);

      resetForm();
    } catch (error) {
      console.log(error);
      alert("Failed to update role");
    }
  };

  const filteredRoles = roles.filter((role) =>
  role.emertimi?.toLowerCase().includes(search.toLowerCase()) ||
  role.pershkrimi?.toLowerCase().includes(search.toLowerCase()) ||
  role.normalized_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h1>Roles</h1>

      <input
        type="text"
        placeholder="Search roles..."
        className="form-control mb-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row">

          <div className="col">
            <input
              type="text"
              name="emertimi"
              placeholder="Emertimi"
              className="form-control"
              value={formData.emertimi}
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
              type="text"
              name="normalized_name"
              placeholder="Normalized Name"
              className="form-control"
              value={formData.normalized_name}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <button
              type={editing ? "button" : "submit"}
              className={editing ? "btn btn-success" : "btn btn-primary"}
              onClick={editing ? handleUpdate : undefined}
            >
              {editing ? "Update Role" : "Add Role"}
            </button>
          </div>

        </div>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Emertimi</th>
            <th>Pershkrimi</th>
            <th>Normalized Name</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredRoles.map((role) => (
            <tr key={role.id}>
              <td>{role.id}</td>
              <td>{role.emertimi}</td>
              <td>{role.pershkrimi}</td>
              <td>{role.normalized_name}</td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(role)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(role.id)}
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

export default Roles;