import { useEffect, useState } from "react";
import API from "../api/api.js";

function ServiceReminders() {
  const [serviceReminders, setServiceReminders] = useState([]);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    vehicle_id: "",
    lloji_servisimit: "",
    data_ardhshme: "",
    kilometrazhi_ardhshem: "",
    statusi: "",
  });

  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const getServiceReminders = async () => {
    try {
      const response = await API.get("/service-reminders");
      setServiceReminders(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load service reminders");
    }
  };

  useEffect(() => {
    getServiceReminders();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      vehicle_id: "",
      lloji_servisimit: "",
      data_ardhshme: "",
      kilometrazhi_ardhshem: "",
      statusi: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/service-reminders", formData);

      alert("Service reminder added successfully");

      getServiceReminders();
      resetForm();
    } catch (error) {
      console.log(error);
      alert("Failed to add service reminder");
    }
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this customer?")) {
          await API.delete(`/customers/${id}`);
          }

      alert("Service reminder deleted successfully");

      getServiceReminders();
    } catch (error) {
      console.log(error);
      alert("Failed to delete service reminder");
    }
  };

  const handleEdit = (reminder) => {
    setEditing(true);
    setEditId(reminder.id);

    setFormData({
      vehicle_id: reminder.vehicle_id || "",
      lloji_servisimit: reminder.lloji_servisimit || "",
      data_ardhshme: reminder.data_ardhshme || "",
      kilometrazhi_ardhshem: reminder.kilometrazhi_ardhshem || "",
      statusi: reminder.statusi || "",
    });
  };

  const handleUpdate = async () => {
    try {
      await API.put(`/service-reminders/${editId}`, formData);

      alert("Service reminder updated successfully");

      getServiceReminders();

      setEditing(false);
      setEditId(null);

      resetForm();
    } catch (error) {
      console.log(error);
      alert("Failed to update service reminder");
    }
  };

  const filteredServiceReminders = serviceReminders.filter((reminder) =>
  String(reminder.vehicle_id).includes(search) ||
  reminder.lloji_servisimit?.toLowerCase().includes(search.toLowerCase()) ||
  reminder.data_ardhshme?.toLowerCase().includes(search.toLowerCase()) ||
  String(reminder.kilometrazhi_ardhshem).includes(search) ||
  reminder.statusi?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h1>Service Reminders</h1>

      <input
        type="text"
        placeholder="Search service reminders..."
        className="form-control mb-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row">

          <div className="col">
            <input
              type="number"
              name="vehicle_id"
              placeholder="Vehicle ID"
              className="form-control"
              value={formData.vehicle_id}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <input
              type="text"
              name="lloji_servisimit"
              placeholder="Lloji Servisimit"
              className="form-control"
              value={formData.lloji_servisimit}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <input
              type="date"
              name="data_ardhshme"
              className="form-control"
              value={formData.data_ardhshme}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <input
              type="number"
              name="kilometrazhi_ardhshem"
              placeholder="Kilometrazhi Ardhshem"
              className="form-control"
              value={formData.kilometrazhi_ardhshem}
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
            <button
              type={editing ? "button" : "submit"}
              className={editing ? "btn btn-success" : "btn btn-primary"}
              onClick={editing ? handleUpdate : undefined}
            >
              {editing ? "Update Reminder" : "Add Reminder"}
            </button>
          </div>

        </div>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Vehicle ID</th>
            <th>Lloji Servisimit</th>
            <th>Data Ardhsheme</th>
            <th>Kilometrazhi Ardhshem</th>
            <th>Statusi</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredServiceReminders.map((reminder) => (
            <tr key={reminder.id}>
              <td>{reminder.id}</td>
              <td>{reminder.vehicle_id}</td>
              <td>{reminder.lloji_servisimit}</td>
              <td>{reminder.data_ardhshme}</td>
              <td>{reminder.kilometrazhi_ardhshem}</td>
              <td>{reminder.statusi}</td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(reminder)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(reminder.id)}
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

export default ServiceReminders;