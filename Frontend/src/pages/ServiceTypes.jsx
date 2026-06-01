import { useEffect, useState } from "react";
import API from "../api/api.js";

const ServiceTypes = () => {
  const [serviceTypes, setServiceTypes] = useState([]);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    emertimi: "",
    pershkrimi: "",
    cmimi_baze: "",
    kohezgjatja_mesatare: "",
  });

  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const getServiceTypes = async () => {
    try {
      const res = await API.get("/service-types");
      setServiceTypes(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load service types");
    }
  };

  useEffect(() => {
    getServiceTypes();
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
      await API.post("/service-types", formData);

      alert("Service type added successfully");

      getServiceTypes();

      setFormData({
        emertimi: "",
        pershkrimi: "",
        cmimi_baze: "",
        kohezgjatja_mesatare: "",
      });
    } catch (error) {
      console.log(error);
      alert("Failed to add service type");
    }
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this service type?")) {
          await API.delete(`/customers/${id}`);
        }

      alert("Service type deleted successfully");

      getServiceTypes();
    } catch (error) {
      console.log(error);
      alert("Failed to delete service type");
    }
  };

  const handleEdit = (service) => {
    setEditing(true);
    setEditId(service.id);

    setFormData({
      emertimi: service.emertimi,
      pershkrimi: service.pershkrimi,
      cmimi_baze: service.cmimi_baze,
      kohezgjatja_mesatare: service.kohezgjatja_mesatare,
    });
  };

  const handleUpdate = async () => {
    try {
      await API.put(`/service-types/${editId}`, formData);

      alert("Service type updated successfully");

      getServiceTypes();

      setEditing(false);
      setEditId(null);

      setFormData({
        emertimi: "",
        pershkrimi: "",
        cmimi_baze: "",
        kohezgjatja_mesatare: "",
      });
    } catch (error) {
      console.log(error);
      alert("Failed to update service type");
    }
  };

  const filteredServiceTypes = serviceTypes.filter((type) =>
  type.emertimi?.toLowerCase().includes(search.toLowerCase()) ||
  type.pershkrimi?.toLowerCase().includes(search.toLowerCase()) ||
  String(type.cmimi_baze).includes(search) ||
  String(type.kohezgjatja_mesatare).includes(search)
  );

  return (
    <div className="container mt-5">
      <h1>Service Types</h1>

      <input
        type="text"
        placeholder="Search service types..."
        className="form-control mb-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <form className="mb-4" onSubmit={handleSubmit}>
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
              name="cmimi_baze"
              placeholder="Cmimi"
              className="form-control"
              value={formData.cmimi_baze}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <input
              type="number"
              name="kohezgjatja_mesatare"
              placeholder="Kohezgjatja"
              className="form-control"
              value={formData.kohezgjatja_mesatare}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <button
              type={editing ? "button" : "submit"}
              className={`btn ${editing ? "btn-success" : "btn-primary"}`}
              onClick={editing ? handleUpdate : undefined}
            >
              {editing ? "Update Service" : "Add Service"}
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
            <th>Kohezgjatja</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredServiceTypes.map((service) => (
            <tr key={service.id}>
              <td>{service.id}</td>
              <td>{service.emertimi}</td>
              <td>{service.pershkrimi}</td>
              <td>{service.cmimi_baze}</td>
              <td>{service.kohezgjatja_mesatare}</td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(service)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(service.id)}
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

export default ServiceTypes;