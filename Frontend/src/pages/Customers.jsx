import { useEffect, useState } from "react";
import API from "../api/api.js";

function Customers() {
    const [customers, setCustomers] = useState([]);
    const [search, setSearch] = useState("");

    const [formData, setFormData] = useState({
        emri: "",
        mbiemri: "",
        telefoni: "",
        email: "",
        adresa: "",
    });

    const [editingId, setEditingId] = useState(null);

    const getCustomers = async () => {
        try {
            const response = await API.get("/customers");
            setCustomers(response.data);
        } catch (error) {
            console.log(error);
            alert("Failed to load customers");
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleDelete = async (id) => {
        try {
            if (window.confirm("Are you sure you want to delete this customer?")) {
            await API.delete(`/customers/${id}`);
            }

            alert("Customers deleted successfully");

            getCustomers();
        } catch (error) {
            console.log(error);
            alert("Failed to delete customer");
        }
    }

    const handleEdit = (customer) => {
        setFormData({
            emri: customer.emri,
            mbiemri: customer.mbiemri,
            telefoni: customer.telefoni,
            email: customer.email,
            adresa: customer.adresa,
        });

        setEditingId(customer.id);
    }

    const handleUpdate = async () => {
        try {
            await API.put(`/customers/${editingId}`, formData);

            alert("Customers update successfully");

            setEditingId(null);

            setFormData({
                emri: "",
                mbiemri: "",
                telefoni: "",
                email: "",
                adresa: "",
            });

            getCustomers(); 
        } catch (error) {
            console.log(error);
            alert("Failed to update customers")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await API.post("/customers", formData);

            alert("Customer added successfully");

            setFormData({
                emri: "",
                mbiemri: "",
                telefoni: "",
                email: "",
                adresa: "",
            });

            getCustomers();
        } catch (error) {
            console.log(error);
            alert("Failed to add customer");
        }
    };

    useEffect(() => {
        getCustomers();
    }, []);

    const filteredCustomers = customers.filter((customer) =>
        customer.emri?.toLowerCase().includes(search.toLowerCase()) ||
        customer.mbiemri?.toLowerCase().includes(search.toLowerCase()) ||
        customer.email?.toLowerCase().includes(search.toLowerCase()) ||
        customer.telefoni?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container mt-5">
            <h1>Customers</h1>

            <input 
            type="text"
            placeholder="Search customers..."
            className="form-control mb-3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />

            <form className="mb-4" onSubmit={handleSubmit}>
                <div className="row">

                    <div className="col">
                        <input
                        type="text"
                        name="emri"
                        value={formData.emri}
                        placeholder="Emri"
                        className="form-control"
                        onChange={handleChange}
                        />
                    </div>

                    <div className="col">
                        <input 
                        type="text"
                        name="mbiemri"
                        value={formData.mbiemri}
                        placeholder="Mbiemri"
                        className="form-control"
                        onChange={(handleChange)}
                        />
                    </div>

                    <div className="col">
                        <input 
                        type="text"
                        name="telefoni"
                        value={formData.telefoni}
                        placeholder="Telefoni"
                        className="form-control"
                        onChange={handleChange}
                        />
                    </div>

                    <div className="col">
                        <input
                        type="email"
                        name="email"
                        value={formData.email}
                        placeholder="Email"
                        className="form-control"
                        onChange={handleChange}
                        />
                    </div>

                    <div className="col">
                        <input
                        type="text"
                        name="adresa"
                        value={formData.adresa}
                        placeholder="Adresa"
                        className="form-control"
                        onChange={handleChange}
                        />
                    </div>

                    <div className="col">
                        <button
                        type={editingId ? "button" : "submit"}
                        className={editingId ? "btn btn-success" : "btn btn-primary"}
                        onClick={editingId ? handleUpdate : undefined}
                        >
                            {editingId ? "Update Customer" : "Add Customer"}
                        </button>
                    </div>
                </div>
            </form>

            <table className="table table-bordered mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Emri</th>
                        <th>Mbiemri</th>
                        <th>Telefoni</th>
                        <th>Email</th>
                        <th>Adresa</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredCustomers.map((customer) => (
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td>{customer.emri}</td>
                            <td>{customer.mbiemri}</td>
                            <td>{customer.telefoni}</td>
                            <td>{customer.email}</td>
                            <td>{customer.adresa}</td>

                                <td>
                                    <button className="btn btn-warning btn-sm me-2"
                                    onClick={() => handleEdit(customer)}
                                    >
                                        Edit
                                    </button>

                                <button 
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete(customer.id)}
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

export default Customers;