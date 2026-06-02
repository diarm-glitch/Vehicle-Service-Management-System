import { useEffect, useState } from "react";
import API from "../api/api.js";

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    service_record_id: "",
    shuma_punes: "",
    shuma_pjeseve: "",
    totali: "",
    statusi: "",
    data: "",
  });

  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const getInvoices = async () => {
    try {
      const response = await API.get("/invoices");
      setInvoices(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load invoices");
    }
  };

  useEffect(() => {
    getInvoices();
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
      shuma_punes: "",
      shuma_pjeseve: "",
      totali: "",
      statusi: "",
      data: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/invoices", formData);

      alert("Invoice added successfully");

      getInvoices();
      resetForm();
    } catch (error) {
      console.log(error);
      alert("Failed to add invoice");
    }
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this customer?")) {
          await API.delete(`/customers/${id}`);
          }

      alert("Invoice deleted successfully");

      getInvoices();
    } catch (error) {
      console.log(error);
      alert("Failed to delete invoice");
    }
  };

  const handleEdit = (invoice) => {
    setEditing(true);
    setEditId(invoice.id);

    setFormData({
      service_record_id: invoice.service_record_id || "",
      shuma_punes: invoice.shuma_punes || "",
      shuma_pjeseve: invoice.shuma_pjeseve || "",
      totali: invoice.totali || "",
      statusi: invoice.statusi || "",
      data: invoice.data || "",
    });
  };

  const handleUpdate = async () => {
    try {
      await API.put(`/invoices/${editId}`, formData);

      alert("Invoice updated successfully");

      getInvoices();

      setEditing(false);
      setEditId(null);

      resetForm();
    } catch (error) {
      console.log(error);
      alert("Failed to update invoice");
    }
  };

  const filteredInvoices = invoices.filter((invoice) =>
    String(invoice.service_record_id).includes(search) ||
    String(invoice.shuma_punes).includes(search) ||
    String(invoice.shuma_pjeseve).includes(search) ||
    String(invoice.totali).includes(search) ||
    invoice.statusi?.toLowerCase().includes(search.toLowerCase()) ||
    invoice.data?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h1>Invoices</h1>

      <input
          type="text"
          placeholder="Search invoices..."
          className="form-control mb-3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
      />

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
              name="shuma_punes"
              placeholder="Shuma Punes"
              className="form-control"
              value={formData.shuma_punes}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <input
              type="number"
              name="shuma_pjeseve"
              placeholder="Shuma Pjeseve"
              className="form-control"
              value={formData.shuma_pjeseve}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <input
              type="number"
              name="totali"
              placeholder="Totali"
              className="form-control"
              value={formData.totali}
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
            <input
              type="date"
              name="data"
              className="form-control"
              value={formData.data}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <button
              type={editing ? "button" : "submit"}
              className={editing ? "btn btn-success" : "btn btn-primary"}
              onClick={editing ? handleUpdate : undefined}
            >
              {editing ? "Update Invoice" : "Add Invoice"}
            </button>
          </div>

        </div>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Service Record ID</th>
            <th>Shuma Punes</th>
            <th>Shuma Pjeseve</th>
            <th>Totali</th>
            <th>Statusi</th>
            <th>Data</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredInvoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>
              <td>{invoice.service_record_id}</td>
              <td>{invoice.shuma_punes}</td>
              <td>{invoice.shuma_pjeseve}</td>
              <td>{invoice.totali}</td>
              <td>{invoice.statusi}</td>
              <td>{invoice.data}</td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(invoice)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(invoice.id)}
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

export default Invoices;