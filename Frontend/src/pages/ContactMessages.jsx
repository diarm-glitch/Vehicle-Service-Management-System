import React, { useEffect, useState } from "react";
import API from "../api/api";

function ContactMessages() {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");

  const fetchMessages = async () => {
    const res = await API.get("/contact-messages");
    setMessages(res.data);
  };

  const updateStatus = async (id, statusi) => {
    await API.put(`/contact-messages/${id}`, { statusi });
    fetchMessages();
  };

  const deleteMessage = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    await API.delete(`/contact-messages/${id}`);
    fetchMessages();
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const filteredMessages = messages.filter((m) =>
  `${m.full_name} ${m.email} ${m.message} ${m.statusi}`
    .toLowerCase()
    .includes(search.toLowerCase())
    );

  return (
    <div className="container mt-4">
      <h2>Contact Messages</h2>

      <input
        type="text"
        className="form-control mt-3 mb-3"
        placeholder="Search contact messages..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />

      <table className="table table-bordered table-striped mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Status</th>
            <th>Date Created</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredMessages.map((m) => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.full_name}</td>
              <td>{m.email}</td>
              <td>{m.message}</td>
              <td>{m.statusi}</td>
              <td>{m.data_krijimit}</td>
              <td>
                <button
                  className="btn btn-sm btn-success me-2"
                  onClick={() => updateStatus(m.id, "Read")}
                >
                  Mark Read
                </button>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteMessage(m.id)}
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

export default ContactMessages;