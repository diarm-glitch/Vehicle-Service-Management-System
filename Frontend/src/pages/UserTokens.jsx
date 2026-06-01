import { useEffect, useState } from "react";
import API from "../api/api.js";

function UserTokens() {
  const [userTokens, setUserTokens] = useState([]);

  const [formData, setFormData] = useState({
    user_id: "",
    login_provider: "",
    token_name: "",
    token_value: "",
  });

  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const getUserTokens = async () => {
    try {
      const response = await API.get("/user-tokens");
      setUserTokens(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load user tokens");
    }
  };

  useEffect(() => {
    getUserTokens();
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
      login_provider: "",
      token_name: "",
      token_value: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/user-tokens", formData);

      alert("User token added successfully");

      getUserTokens();
      resetForm();
    } catch (error) {
      console.log(error);
      alert("Failed to add user token");
    }
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this customer?")) {
          await API.delete(`/customers/${id}`);
        }

      alert("User token deleted successfully");

      getUserTokens();
    } catch (error) {
      console.log(error);
      alert("Failed to delete user token");
    }
  };

  const handleEdit = (token) => {
    setEditing(true);
    setEditId(token.id);

    setFormData({
      user_id: token.user_id || "",
      login_provider: token.login_provider || "",
      token_name: token.token_name || "",
      token_value: token.token_value || "",
    });
  };

  const handleUpdate = async () => {
    try {
      await API.put(`/user-tokens/${editId}`, formData);

      alert("User token updated successfully");

      getUserTokens();

      setEditing(false);
      setEditId(null);

      resetForm();
    } catch (error) {
      console.log(error);
      alert("Failed to update user token");
    }
  };

  return (
    <div className="container mt-5">
      <h1>User Tokens</h1>

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
              type="text"
              name="login_provider"
              placeholder="Login Provider"
              className="form-control"
              value={formData.login_provider}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <input
              type="text"
              name="token_name"
              placeholder="Token Name"
              className="form-control"
              value={formData.token_name}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <input
              type="text"
              name="token_value"
              placeholder="Token Value"
              className="form-control"
              value={formData.token_value}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <button
              type={editing ? "button" : "submit"}
              className={editing ? "btn btn-success" : "btn btn-primary"}
              onClick={editing ? handleUpdate : undefined}
            >
              {editing ? "Update Token" : "Add Token"}
            </button>
          </div>
        </div>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Login Provider</th>
            <th>Token Name</th>
            <th>Token Value</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {userTokens.map((token) => (
            <tr key={token.id}>
              <td>{token.id}</td>
              <td>{token.user_id}</td>
              <td>{token.login_provider}</td>
              <td>{token.token_name}</td>
              <td>{token.token_value}</td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(token)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(token.id)}
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

export default UserTokens;