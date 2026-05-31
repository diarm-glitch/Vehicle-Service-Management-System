import { useEffect, useState } from "react";
import API from "../api/api.js";

function Dashboard() {
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [partsStock, setPartsStock] = useState([]);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalVehicles, setTotalVehicles] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [totalInvoices, setTotalInvoices] = useState(0);
  const [lowStockParts, setLowStockParts] = useState([]);

  const getDashboardData = async () => {
    try {
      const appointmentsRes = await API.get("/dashboard/today-appointments");
      const revenueRes = await API.get("/dashboard/revenue");
      const partsRes = await API.get("/dashboard/parts-stock");
      const customersRes = await API.get("/dashboard/total-customers");
      const vehiclesRes = await API.get("/dashboard/total-vehicles");
      const totalAppointmentsRes = await API.get("/dashboard/total-appointments");
      const totalInvoicesRes = await API.get("/dashboard/total-invoices");
      const lowStockPartsRes = await API.get("/dashboard/low-stock-parts");

      setTodayAppointments(appointmentsRes.data);
      setRevenue(revenueRes.data.total_revenue || 0);
      setPartsStock(partsRes.data);
      setTotalCustomers(customersRes.data.total_customers);
      setTotalVehicles(vehiclesRes.data.total_vehicles);
      setTotalAppointments(totalAppointmentsRes.data.total_appointments);
      setTotalInvoices(totalInvoicesRes.data.total_invoices);
      setLowStockParts(lowStockPartsRes.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load dashboard data");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="container mt-5">
      <h1>Dashboard</h1>

      <button className="btn btn-danger mb-4" onClick={handleLogout}>
        Logout
      </button>

      <div className="row g-3 mb-4">
        <div className="col-md-2">
          <div className="card shadow-sm p-3 h-100">
            <h5>Today's Appointments</h5>
            <h2>{todayAppointments.length}</h2>
          </div>
        </div>

        <div className="col-md-2">
          <div className="card shadow-sm p-3 h-100">
            <h5>Total Revenue</h5>
            <h2>{revenue} €</h2>
          </div>
        </div>

        <div className="col-md-2">
          <div className="card shadow-sm p-3 h-100">
            <h5>Total Customers</h5>
            <h2>{totalCustomers}</h2>
          </div>
        </div>

        <div className="col-md-2">
          <div className="card shadow-sm p-3 h-100">
            <h5>Total Vehicles</h5>
            <h2>{totalVehicles}</h2>
          </div>
        </div>

        <div className="col-md-2">
          <div className="card shadow-sm p-3 h-100">
            <h5>Total Appointments</h5>
            <h2>{totalAppointments}</h2>
          </div>
        </div>

        <div className="col-md-2">
          <div className="card shadow-sm p-3 h-100">
            <h5>Total Invoices</h5>
            <h2>{totalInvoices}</h2>
          </div>
        </div>
      </div>

      <h3>Parts Stock</h3>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Part</th>
            <th>Quantity</th>
          </tr>
        </thead>

        <tbody>
          {partsStock.map((part) => (
            <tr key={part.id}>
              <td>{part.id}</td>
              <td>{part.emertimi}</td>
              <td>{part.sasia < 5 ? (
                <span className="text-danger fw-bold">
                    Low Stock ({part.sasia})
                </span>
              ) : (
                part.sasia
              )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="mt-4">Low Stock Parts</h3>

      {lowStockParts.length === 0 ? (
        <div className="alert alert-success">
          No low stock parts.
        </div>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Part</th>
              <th>Quantity</th>
            </tr>
          </thead>

          <tbody>
            {lowStockParts.map((part) => (
              <tr key={part.id}>
                <td>{part.id}</td>
                <td>{part.emertimi}</td>
                <td className="text-danger fw-bold">{part.sasia}</td>
              </tr>
            ))}
          </tbody>
          </table>
      )}      
    </div>
  )}

export default Dashboard;