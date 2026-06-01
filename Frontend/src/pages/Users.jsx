import { useEffect, useState } from "react";
import API from "../api/api.js";

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    emri: "",
    mbiemri: "",
    email: "",
    password: "",
    phone_number: "",
    statusi: "",
  });

  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const getUsers = async () => {
    try {
      const response = await API.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load users");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      emri: "",
      mbiemri: "",
      email: "",
      password: "",
      phone_number: "",
      statusi: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/users", formData);
      alert("User added successfully");
      getUsers();
      resetForm();
    } catch (error) {
      console.log(error);
      alert("Failed to add user");
    }
  };

  const handleDelete = async (id) => {
    try {
     if (window.confirm("Are you sure you want to delete this customer?")) {
          await API.delete(`/customers/${id}`);
        }

      alert("User deleted successfully");
      getUsers();
    } catch (error) {
      console.log(error);
      alert("Failed to delete user");
    }
  };

  const handleEdit = (user) => {
    setEditing(true);
    setEditId(user.id);

    setFormData({
      emri: user.emri || "",
      mbiemri: user.mbiemri || "",
      email: user.email || "",
      password: "",
      phone_number: user.phone_number || "",
      statusi: user.statusi || "",
    });
  };

  const handleUpdate = async () => {
    try {
      const updateData = {
        emri: formData.emri,
        mbiemri: formData.mbiemri,
        email: formData.email,
        phone_number: formData.phone_number,
        statusi: formData.statusi,
      };

      await API.put(`/users/${editId}`, updateData);

      alert("User updated successfully");
      getUsers();

      setEditing(false);
      setEditId(null);
      resetForm();
    } catch (error) {
      console.log(error);
      alert("Failed to update user");
    }
  };

  const filteredUsers = users.filter((user) =>
  user.emri?.toLowerCase().includes(search.toLowerCase()) ||
  user.mbiemri?.toLowerCase().includes(search.toLowerCase()) ||
  user.email?.toLowerCase().includes(search.toLowerCase()) ||
  user.phone_number?.toLowerCase().includes(search.toLowerCase()) ||
  user.statusi?.toLowerCase().includes(search.toLowerCase())
  );

  

  return (
    <div className="container mt-5">
      <h1>Users</h1>

      <input
        type="text"
        placeholder="Search users..."
        className="form-control mb-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row">
          <div className="col">
            <input type="text" 
            name="emri" 
            placeholder="Emri" 
            className="form-control" 
            value={formData.emri} 
            onChange={handleChange} 
            />
          </div>

          <div className="col">
            <input type="text" 
            name="mbiemri" 
            placeholder="Mbiemri" 
            className="form-control" 
            value={formData.mbiemri} 
            onChange={handleChange} 
            />
          </div>

          <div className="col">
            <input type="email" 
            name="email" 
            placeholder="Email" 
            className="form-control" 
            value={formData.email} 
            onChange={handleChange} />
          </div>

          {!editing && (
            <div className="col">
              <input type="password" 
              name="password" 
              placeholder="Password" 
              className="form-control" 
              value={formData.password} 
              onChange={handleChange} />
            </div>
          )}

          <div className="col">
            <input type="text" 
            name="phone_number" 
            placeholder="Phone" 
            className="form-control" 
            value={formData.phone_number} 
            onChange={handleChange} 
            />
          </div>

          <div className="col">
            <input type="text" 
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
              {editing ? "Update User" : "Add User"}
            </button>
          </div>
        </div>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Emri</th>
            <th>Mbiemri</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Data Krijimit</th>
            <th>Statusi</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.emri}</td>
              <td>{user.mbiemri}</td>
              <td>{user.email}</td>
              <td>{user.phone_number}</td>
              <td>{user.data_krijimit}</td>
              <td>{user.statusi}</td>

              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(user)}>
                  Edit
                </button>

                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id)}>
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

export default Users;