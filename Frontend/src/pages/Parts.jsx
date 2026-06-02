import { useEffect, useState } from "react";
import API from "../api/api.js";

function Parts() {
  const [parts, setParts] = useState([]);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    emertimi: "",
    pershkrimi: "",
    cmimi: "",
    sasia: "",
    kodi: "",
    furnitori: "",
  });

  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const getParts = async () => {
    try {
      const response = await API.get("/parts");
      setParts(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load parts");
    }
  };

  useEffect(() => {
    getParts();
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
      cmimi: "",
      sasia: "",
      kodi: "",
      furnitori: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/parts", formData);

      alert("Part added successfully");

      getParts();
      resetForm();
    } catch (error) {
      console.log(error);
      alert("Failed to add part");
    }
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this customer?")) {
            await API.delete(`/customers/${id}`);
          }

      alert("Part deleted successfully");

      getParts();
    } catch (error) {
      console.log(error);
      alert("Failed to delete part");
    }
  };

  const handleEdit = (part) => {
    setEditing(true);
    setEditId(part.id);

    setFormData({
      emertimi: part.emertimi || "",
      pershkrimi: part.pershkrimi || "",
      cmimi: part.cmimi || "",
      sasia: part.sasia || "",
      kodi: part.kodi || "",
      furnitori: part.furnitori || "",
    });
  };

  const handleUpdate = async () => {
    try {
      await API.put(`/parts/${editId}`, formData);

      alert("Part updated successfully");

      getParts();

      setEditing(false);
      setEditId(null);

      resetForm();
    } catch (error) {
      console.log(error);
      alert("Failed to update part");
    }
  };

  const filteredParts = parts.filter((part) =>
    part.emertimi?.toLowerCase().includes(search.toLowerCase()) ||
    part.pershkrimi?.toLowerCase().includes(search.toLowerCase()) ||
    part.kodi?.toLowerCase().includes(search.toLowerCase()) ||
    part.furnitori?.toLowerCase().includes(search.toLowerCase()) ||
    String(part.cmimi).includes(search) ||
    String(part.sasia).includes(search)
  );

  return (
    <div className="container mt-5">
      <h1>Parts</h1>

      <input
          type="text"
          placeholder="Search parts..."
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
              type="number"
              name="cmimi"
              placeholder="Cmimi"
              className="form-control"
              value={formData.cmimi}
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
              type="text"
              name="kodi"
              placeholder="Kodi"
              className="form-control"
              value={formData.kodi}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <input
              type="text"
              name="furnitori"
              placeholder="Furnitori"
              className="form-control"
              value={formData.furnitori}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <button
              type={editing ? "button" : "submit"}
              className={editing ? "btn btn-success" : "btn btn-primary"}
              onClick={editing ? handleUpdate : undefined}
            >
              {editing ? "Update Part" : "Add Part"}
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
            <th>Cmimi</th>
            <th>Sasia</th>
            <th>Kodi</th>
            <th>Furnitori</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredParts.map((part) => (
            <tr key={part.id}>
              <td>{part.id}</td>
              <td>{part.emertimi}</td>
              <td>{part.pershkrimi}</td>
              <td>{part.cmimi}</td>
              <td>{part.sasia}</td>
              <td>{part.kodi}</td>
              <td>{part.furnitori}</td>

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

export default Parts;