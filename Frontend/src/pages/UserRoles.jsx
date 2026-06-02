import { useEffect, useState } from "react";
import API from "../api/api.js";

function UserRoles() {
  const [userRoles, setUserRoles] = useState([]);

  const [formData, setFormData] = useState({
    user_id: "",
    role_id: "",
  });

  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const getUserRoles = async () => {
    try {
      const response = await API.get("/user-roles");
      setUserRoles(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load user roles");
    }
  };

  useEffect(() => {
    getUserRoles();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      user_id: "",
      role_id: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/user-roles", formData);

      alert("User role added successfully");

      getUserRoles();
      resetForm();
    } catch (error) {
      console.log(error);
      alert("Failed to add user role");
    }
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this customer?")) {
          await API.delete(`/customers/${id}`);
          }

      alert("User role deleted successfully");

      getUserRoles();
    } catch (error) {
      console.log(error);
      alert("Failed to delete user role");
    }
  };

  const handleEdit = (userRole) => {
    setEditing(true);
    setEditId(userRole.id);

    setFormData({
      user_id: userRole.user_id || "",
      role_id: userRole.role_id || "",
    });
  };

  const handleUpdate = async () => {
    try {
      await API.put(`/user-roles/${editId}`, formData);

      alert("User role updated successfully");

      getUserRoles();

      setEditing(false);
      setEditId(null);

      resetForm();
    } catch (error) {
      console.log(error);
      alert("Failed to update user role");
    }
  };

  return (
    <div className="container mt-5">
      <h1>User Roles</h1>

      <form onSubmit={handleSubmit} className="mb-4">
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
              type="number"
              name="role_id"
              placeholder="Role ID"
              className="form-control"
              value={formData.role_id}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <button
              type={editing ? "button" : "submit"}
              className={editing ? "btn btn-success" : "btn btn-primary"}
              onClick={editing ? handleUpdate : undefined}
            >
              {editing ? "Update User Role" : "Add User Role"}
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
            <th>Email</th>
            <th>Role ID</th>
            <th>Role Name</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {userRoles.map((userRole) => (
            <tr key={userRole.id}>
              <td>{userRole.id}</td>
              <td>{userRole.user_id}</td>
              <td>{userRole.emri}</td>
              <td>{userRole.mbiemri}</td>
              <td>{userRole.email}</td>
              <td>{userRole.role_id}</td>
              <td>{userRole.role_name}</td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(userRole)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(userRole.id)}
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

export default UserRoles;