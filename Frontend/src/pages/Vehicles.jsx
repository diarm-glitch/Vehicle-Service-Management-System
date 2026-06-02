import { useEffect, useState } from "react";
import API from "../api/api.js";

function Vehicles() {
    const [vehicles, setVehicles] = useState([]);
    const [search, setSearch] = useState("");

    const [formData, setFormData] = useState({
        customer_id: "",
        marka: "",
        modeli: "",
        viti: "",
        targa: "",
        kilometrazhi: "",
        ngjyra: "",
    });

    const [editing, setEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const getVehicles = async () => {
        try {
            const response = await API.get("/vehicles");
            setVehicles(response.data);
        } catch (error) {
            console.log(error);
            alert("Failed to load vehicles");
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await API.post("/vehicles", formData);

            alert("Vehicle added successfully");

            getVehicles();

            setFormData({
                customer_id: "",
                marka: "",
                modeli: "",
                viti: "",
                targa: "",
                kilometrazhi: "",
                ngjyra: "",
            });
        } catch (error) {
            console.log(error);
            alert("Failed to add vehicles");
        }
    };

    const handleDelete = async (id) => {
        try {
            if (window.confirm("Are you sure you want to delete this vehicle?")) {
            await API.delete(`/customers/${id}`);
            }

            alert("Vehicle deleted successfully");

            getVehicles();
        } catch (error) {
            console.log(error);
            alert("Failed to delete vehicle");
        }
    }

    const handleUpdate = async () => {
        try {
            await API.put(`/vehicles/${editId}`, formData);

            alert("Vehicle updated successfully");

            getVehicles();

            setEditing(false);
            setEditId(null);

            setFormData({
                customer_id: "",
                marka: "",
                modeli: "",
                viti: "",
                targa: "",
                kilometrazhi: "",
                ngjyra: "",
            });
        } catch (error) {
            console.log(error);
            alert("Failed to update vehicle");
        }
    };

    const handleEdit = (vehicle) => {
        setEditing(true);
        setEditId(vehicle.id);

        setFormData({
            customer_id: vehicle.customer_id,
            marka: vehicle.marka,
            modeli: vehicle.modeli,
            viti: vehicle.viti,
            targa: vehicle.targa,
            kilometrazhi: vehicle.kilometrazhi,
            ngjyra: vehicle.ngjyra,
        });
    };

    useEffect(() => {
        getVehicles();
    }, []);

    const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.marka?.toLowerCase().includes(search.toLowerCase()) ||
    vehicle.modeli?.toLowerCase().includes(search.toLowerCase()) ||
    vehicle.targa?.toLowerCase().includes(search.toLowerCase()) ||
    vehicle.ngjyra?.toLowerCase().includes(search.toLowerCase()) ||
    String(vehicle.viti).includes(search) ||
    String(vehicle.customer_id).includes(search)
    );

   return (
    <div className="container mt-5">

        <h1>Vehicles</h1>

        <input
            type="text"
            placeholder="Search vehicles..."
            className="form-control mb-3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />

        <form className="mb-4" onSubmit={handleSubmit}>
            <div className="row">

                <div className="col">
                    <input
                        type="number"
                        name="customer_id"
                        value={formData.customer_id}
                        placeholder="Customer ID"
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>

                <div className="col">
                    <input
                        type="text"
                        name="marka"
                        value={formData.marka}
                        placeholder="Marka"
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>

                <div className="col">
                    <input
                        type="text"
                        name="modeli"
                        value={formData.modeli}
                        placeholder="Modeli"
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>

                <div className="col">
                    <input
                        type="number"
                        name="viti"
                        value={formData.viti}
                        placeholder="Viti"
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>

                <div className="col">
                    <input
                        type="text"
                        name="targa"
                        value={formData.targa}
                        placeholder="Targa"
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>

                <div className="col">
                    <input
                        type="number"
                        name="kilometrazhi"
                        value={formData.kilometrazhi}
                        placeholder="Km"
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>

                <div className="col">
                    <input
                        type="text"
                        name="ngjyra"
                        value={formData.ngjyra}
                        placeholder="Ngjyra"
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>

                <div className="col">
                    <button
                        type={editing ? "button" : "submit"}
                        className={editing ? "btn btn-success" : "btn btn-primary"}
                        onClick={editing ? handleUpdate : undefined}
                        >
                            {editing ? "Update Vehicle" : "Add Vehicle"}
                    </button>
                </div>

            </div>
        </form>

        <table className="table table-bordered mt-4">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Customer ID</th>
                    <th>Marka</th>
                    <th>Modeli</th>
                    <th>Viti</th>
                    <th>Targa</th>
                    <th>Kilometrazhi</th>
                    <th>Ngjyra</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {filteredVehicles.map((vehicle) => (
                    <tr key={vehicle.id}>
                        <td>{vehicle.id}</td>
                        <td>{vehicle.customer_id}</td>
                        <td>{vehicle.marka}</td>
                        <td>{vehicle.modeli}</td>
                        <td>{vehicle.viti}</td>
                        <td>{vehicle.targa}</td>
                        <td>{vehicle.kilometrazhi}</td>
                        <td>{vehicle.ngjyra}</td>

                        <td>
                            <button className="btn btn-warning btn-sm me-2"
                            onClick={() => handleEdit(vehicle)}
                            >
                                Edit
                            </button>

                            <button className="btn btn-danger btn-sm"
                            onClick={()=> handleDelete(vehicle.id)}
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

export default Vehicles;