import { useEffect, useState } from "react";
import API from "../api/api.js";

function UserClaims() {
  const [userClaims, setUserClaims] = useState([]);

  const [formData, setFormData] = useState({
    user_id: "",
    claim_type: "",
    claim_value: "",
  });

  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const getUserClaims = async () => {
    try {
      const response = await API.get("/user-claims");
      setUserClaims(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load user claims");
    }
  };

  useEffect(() => {
    getUserClaims();
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
      claim_type: "",
      claim_value: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/user-claims", formData);

      alert("User claim added successfully");

      getUserClaims();
      resetForm();
    } catch (error) {
      console.log(error);
      alert("Failed to add user claim");
    }
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this customer?")) {
          await API.delete(`/customers/${id}`);
        }
        
      alert("User claim deleted successfully");

      getUserClaims();
    } catch (error) {
      console.log(error);
      alert("Failed to delete user claim");
    }
  };

  const handleEdit = (claim) => {
    setEditing(true);
    setEditId(claim.id);

    setFormData({
      user_id: claim.user_id || "",
      claim_type: claim.claim_type || "",
      claim_value: claim.claim_value || "",
    });
  };

  const handleUpdate = async () => {
    try {
      await API.put(`/user-claims/${editId}`, formData);

      alert("User claim updated successfully");

      getUserClaims();

      setEditing(false);
      setEditId(null);

      resetForm();
    } catch (error) {
      console.log(error);
      alert("Failed to update user claim");
    }
  };

  return (
    <div className="container mt-5">
      <h1>User Claims</h1>

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
              name="claim_type"
              placeholder="Claim Type"
              className="form-control"
              value={formData.claim_type}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <input
              type="text"
              name="claim_value"
              placeholder="Claim Value"
              className="form-control"
              value={formData.claim_value}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <button
              type={editing ? "button" : "submit"}
              className={editing ? "btn btn-success" : "btn btn-primary"}
              onClick={editing ? handleUpdate : undefined}
            >
              {editing ? "Update Claim" : "Add Claim"}
            </button>
          </div>
        </div>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Claim Type</th>
            <th>Claim Value</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {userClaims.map((claim) => (
            <tr key={claim.id}>
              <td>{claim.id}</td>
              <td>{claim.user_id}</td>
              <td>{claim.claim_type}</td>
              <td>{claim.claim_value}</td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(claim)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(claim.id)}
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

export default UserClaims;