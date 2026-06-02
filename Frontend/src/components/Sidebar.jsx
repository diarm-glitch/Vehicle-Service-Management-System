import { Link, NavLink } from "react-router-dom";

function Sidebar() {

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const role = localStorage.getItem("role");

  const getNavClass = ({ isActive }) =>
    isActive
      ? "nav-link text-white active-sidebar-link"
      : "nav-link text-white";

  return (
    <div
      className="bg-dark text-white p-3"
      style={{
        width: "250px",
        minHeight: "100vh",
        overflowY: "auto",
        flexShrink: 0,
        background: "linear-gradient(180deg, #1E88E5, #42A5F5)",
        boxShadow: "4px 0 15px rgba(0,0,0,0.15)",
      }}
    >
      <h4 className="mb-4">Vehicle Service</h4>

      <ul className="nav flex-column">

        <li className="nav-item mb-3">
          <Link to="/" className="btn btn-light w-100" style={{ fontWeight: "700" }}>
            Back home
          </Link>
        </li>

        {role === "Staff" && (
          <li className="nav-item"><NavLink to="/staff-profile" className={getNavClass}>Staff Profile</NavLink></li>
        )}

        {(role === "Admin" || role === "Staff") && (
          <>
            <li className="nav-item"><NavLink to="/dashboard" className={getNavClass}>Dashboard</NavLink></li>
            <li className="nav-item"><NavLink to="/customers" className={getNavClass}>Customers</NavLink></li>
            <li className="nav-item"><NavLink to="/vehicles" className={getNavClass}>Vehicles</NavLink></li>
            <li className="nav-item"><NavLink to="/service-types" className={getNavClass}>Service Types</NavLink></li>
            <li className="nav-item"><NavLink to="/technicians" className={getNavClass}>Technicians</NavLink></li>
            <li className="nav-item"><NavLink to="/appointments" className={getNavClass}>Appointments</NavLink></li>
            <li className="nav-item"><NavLink to="/service-records" className={getNavClass}>Service Records</NavLink></li>
            <li className="nav-item"><NavLink to="/parts" className={getNavClass}>Parts</NavLink></li>
            <li className="nav-item"><NavLink to="/service-parts" className={getNavClass}>Service Parts</NavLink></li>
            <li className="nav-item"><NavLink to="/invoices" className={getNavClass}>Invoices</NavLink></li>
            <li className="nav-item"><NavLink to="/service-reminders" className={getNavClass}>Service Reminders</NavLink></li>
            <li className="nav-item"><NavLink to="/dashboard/contact-messages" className={getNavClass}>Contact Messages</NavLink></li>
            <li className="nav-item"><NavLink to="/dashboard/emergency-pickups" className={getNavClass}>Emergency Pickups</NavLink></li>
            <li className="nav-item"><NavLink to="/dashboard/mechanic-applications" className={getNavClass}>Mechanic Applications</NavLink></li>
            <li className="nav-item"><NavLink to="/dashboard/servicing-requests" className={getNavClass}>Servicing Requests</NavLink></li>
            <li className="nav-item"><NavLink to="/dashboard/pre-purchase-inspection-requests" className={getNavClass}>Pre-Purchase Requests</NavLink></li>
            <li className="nav-item"><NavLink to="/dashboard/roadside-subscriptions" className={getNavClass}>Roadside Subscriptions</NavLink></li>
          </>
        )}

        {role === "Admin" && (
          <>
            <hr />
            <li className="nav-item"><NavLink to="/admin-profile" className={getNavClass}>Admin Profile</NavLink></li>
            <li className="nav-item"><NavLink to="/users" className={getNavClass}>Users</NavLink></li>
            <li className="nav-item"><NavLink to="/roles" className={getNavClass}>Roles</NavLink></li>
            <li className="nav-item"><NavLink to="/user-roles" className={getNavClass}>User Roles</NavLink></li>
            <li className="nav-item"><NavLink to="/user-claims" className={getNavClass}>User Claims</NavLink></li>
            <li className="nav-item"><NavLink to="/user-tokens" className={getNavClass}>User Tokens</NavLink></li>
          </>
        )}

        {(role === "User" || role === "user" || role === "Premium User") && (
          <>
            <li className="nav-item"><NavLink to="/profile" className={getNavClass}>My Profile</NavLink></li>
            <li className="nav-item"><NavLink to="/car-status" className={getNavClass}>Your Car Status</NavLink></li>
            <li className="nav-item"><NavLink to="/my-servicing-requests" className={getNavClass}>My Servicing Requests</NavLink></li>
            <li className="nav-item"><NavLink to="/my-pre-purchase-inspection-requests"className={getNavClass}>My Inspection Requests</NavLink></li>
          </>
        )}

        <li className="nav-item mt-4">
          <button className="btn btn-danger w-100" onClick={handleLogout}>
            Logout
          </button>
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;