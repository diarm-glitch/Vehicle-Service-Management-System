import { useEffect, useState } from "react";
import axios from "axios";

function MySales() {
  const token = localStorage.getItem("token");
  const [mySales, setMySales] = useState([]);

  useEffect(() => {
    fetchMySales();
  }, []);

  const fetchMySales = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/car-sale-requests/my-requests",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMySales(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteSale = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sale post?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/car-sale-requests/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchMySales();
    } catch (err) {
      console.log(err);
      alert("Failed to delete sale post");
    }
  };

  return (
    <div className="container mt-4">
      <h2>My Sales</h2>

      <div className="card p-4">
        {mySales.length === 0 ? (
          <p>No cars posted for sale yet.</p>
        ) : (
          mySales.map((car) => (
            <div key={car.id} className="mb-4 pb-4 border-bottom">
              {car.image && (
                <img
                  src={`http://localhost:5000/uploads/${car.image}`}
                  alt={`${car.car_make} ${car.car_model}`}
                  style={{
                    width: "220px",
                    height: "140px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                />
              )}

              <h5>
                {car.car_make} {car.car_model}
              </h5>

              <p><strong>Year:</strong> {car.car_year}</p>
              <p><strong>Mileage:</strong> {car.mileage} km</p>
              <p><strong>Fuel:</strong> {car.fuel_type}</p>
              <p><strong>Price:</strong> {car.price} €</p>
              <p><strong>Description:</strong> {car.description}</p>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteSale(car.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MySales;