import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role")?.toLowerCase();

  if (!token) {
    return <Navigate to="/login" />;
  }

  const normalizedAllowedRoles = allowedRoles?.map((r) => r.toLowerCase());

  if (normalizedAllowedRoles && !normalizedAllowedRoles.includes(role)) {
    if (role === "user") {
      return <Navigate to="/profile" />;
    }

    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default ProtectedRoute;