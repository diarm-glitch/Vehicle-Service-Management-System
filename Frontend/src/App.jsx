import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import Customers from "./pages/Customers";

import Navbar from "./components/Navbar";
import About from "./components/About";
import Services from "./components/Services";
import BuySell from "./components/BuySell";
import Assistance from "./components/Assistance";
import Footer from "./components/Footer"
import Sidebar from "./components/Sidebar";
import Contact from "./components/Contact";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Vehicles from "./pages/Vehicles";
import ServiceTypes from "./pages/ServiceTypes";
import Technicians from "./pages/Technicians";
import Appointments from "./pages/Appointments";
import Parts from "./pages/Parts";
import ServiceRecords from "./pages/ServiceRecords";
import ServiceParts from "./pages/ServiceParts";
import Invoices from "./pages/Invoices";
import ServiceReminders from "./pages/ServiceReminders";
import Roles from "./pages/Roles";
import UserRoles from "./pages/UserRoles";
import Users from "./pages/Users";
import UserClaims from "./pages/UserClaims";
import UserTokens from "./pages/UserTokens";
import MechanicApplication from "./pages/MechanicApplication";
import EmergencyPickup from "./pages/EmergencyPickup";
import ContactMessages from "./pages/ContactMessages";
import EmergencyPickups from "./pages/EmergencyPickups";
import MechanicApplications from "./pages/MechanicApplications";
import Profile from "./pages/Profile";
import CarStatus from "./pages/CarStatus";
import AdminProfile from "./pages/AdminProfile";
import StaffProfile from "./pages/StaffProfile";
import Repairs from "./pages/Repairs";
import Diagnostics from "./pages/Diagnostics";
import Servicing from "./pages/Servicing";
import Tyres from "./pages/Tyres";
import Tuning from "./pages/Tuning";
import PrePurchaseInspection from "./pages/PrePurchaseInspection";
import ServicingRequests from "./pages/ServicingRequests";
import MyServicingRequests from "./pages/MyServicingRequests";
import PrePurchaseInspectionRequests from "./pages/PrePurchaseInspectionRequests";
import MyPrePurchaseInspectionRequests from "./pages/MyPrePurchaseInspectionRequests";
import RoadsideSubscription from "./pages/RoadsideSubscription";
import RoadsideSubscriptions from "./pages/RoadsideSubscriptions";

function HomePage() {
  return (
    <>
    <header className="hero">
      <Navbar />

      <section className="hero-content">
        <h1>All your vehicle needs, in one place</h1>
        <p>Book services, find mechanics, or get help instantly</p>

        <div className="hero-buttons">
          <a href="#services" className="book-btn">Book a Service</a>
          <a href="#buysell" className="outline-btn">Buy or Sell Cars</a>
          <Link to="/emergency-pickup" className="outline-btn"> Emergency Pickup </Link>
        </div>
      </section>
    </header>

    <About />
    <Services />
    <BuySell />
    <Assistance />
    <Footer />
    </>
  );
}

function AdminLayout({ children }) {
  return (
    <div className="d-flex vh-100 overflow-hidden">
      <Sidebar />
      <div className="flex-grow-1 overflow-auto"
        style={{scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        >
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
    <Routes>

      <Route path="/" element={<HomePage />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/contact" element={<Contact />} />

      <Route path="/mechanic-application" element={<MechanicApplication />} />

      <Route path="/emergency-pickup" element={<EmergencyPickup />}/>

      <Route path="/repairs" element={<Repairs />} />

      <Route path="/diagnostics" element={<Diagnostics />} />

      <Route path="/servicing" element={<Servicing />} />

      <Route path="/tyres" element={<Tyres />} />

      <Route path="/tuning" element={<Tuning />} />

      <Route path="/pre-purchase-inspection" element={<PrePurchaseInspection />} />

      <Route path="/servicing-requests" element={<ServicingRequests />} />

      <Route 
      path="/dashboard" 
      element = {
        <ProtectedRoute allowedRoles={["Admin", "Staff"]}>
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        </ProtectedRoute>
      } />

      <Route 
      path="/customers"
      element = {
        <ProtectedRoute allowedRoles={["Admin", "Staff"]}>
          <AdminLayout>
            <Customers />
          </AdminLayout>
        </ProtectedRoute>
      }
      />

      <Route 
      path="/Vehicles"
      element = {
        <ProtectedRoute allowedRoles={["Admin", "Staff"]}>
          <AdminLayout>
            <Vehicles />
          </AdminLayout>
        </ProtectedRoute>
      }
      />

      <Route
      path="/service-types"
      element={
        <ProtectedRoute allowedRoles={["Admin", "Staff"]}>
          <AdminLayout>
            <ServiceTypes />
          </AdminLayout>
        </ProtectedRoute>
      }
      />

      <Route
      path="/technicians"
      element={
        <ProtectedRoute allowedRoles={["Admin", "Staff"]}>
          <AdminLayout>
            <Technicians />
          </AdminLayout>
        </ProtectedRoute>
      }
      />

      <Route
      path="/appointments"
      element={
        <ProtectedRoute allowedRoles={["Admin", "Staff"]}>
          <AdminLayout>
            <Appointments />
          </AdminLayout>
        </ProtectedRoute>
      }
      />

      <Route
      path="/parts"
      element={
        <ProtectedRoute allowedRoles={["Admin", "Staff"]}>
          <AdminLayout>
            <Parts />
          </AdminLayout>
        </ProtectedRoute>
      }
      />

      <Route
      path="/service-records"
      element={
        <ProtectedRoute allowedRoles={["Admin", "Staff"]}>
          <AdminLayout>
            <ServiceRecords />
          </AdminLayout>
        </ProtectedRoute>
      }
      />

      <Route 
      path="/service-parts"
      element={
        <ProtectedRoute allowedRoles={["Admin", "Staff"]}>
          <AdminLayout>
            <ServiceParts />
          </AdminLayout>
        </ProtectedRoute>
      }
      />

      <Route
      path="/invoices"
      element={
        <ProtectedRoute allowedRoles={["Admin", "Staff"]}>
          <AdminLayout>
            <Invoices />
          </AdminLayout>
        </ProtectedRoute>
      }
      />

      <Route 
      path="/service-reminders"
      element={
        <ProtectedRoute allowedRoles={["Admin", "Staff"]}>
          <AdminLayout>
            <ServiceReminders />
          </AdminLayout>
        </ProtectedRoute>
      }
      />

      <Route
      path="/roles"
      element={
        <ProtectedRoute allowedRoles={["Admin"]}>
          <AdminLayout>
            <Roles />
          </AdminLayout>
        </ProtectedRoute>
      }
      />

      <Route
      path="/user-roles"
      element={
        <ProtectedRoute allowedRoles={["Admin"]}>
          <AdminLayout>
            <UserRoles />
          </AdminLayout>
        </ProtectedRoute>
      }
      />

      <Route 
      path="/users"
      element={
        <ProtectedRoute allowedRoles={["Admin"]}>
          <AdminLayout>
            <Users />
          </AdminLayout>
        </ProtectedRoute>
      }
      />

      <Route
      path="/user-claims"
      element={
      <ProtectedRoute allowedRoles={["Admin"]}>
        <AdminLayout>
          <UserClaims />
        </AdminLayout>
      </ProtectedRoute>
      }
      />

      <Route
      path="/user-tokens"
      element={
        <ProtectedRoute allowedRoles={["Admin"]}>
          <AdminLayout>
            <UserTokens />
          </AdminLayout>
        </ProtectedRoute>
      }
      />

      <Route
      path="/admin-profile"
      element={
        <ProtectedRoute allowedRoles={["Admin"]}>
          <AdminLayout>
            <AdminProfile />
          </AdminLayout>
        </ProtectedRoute>
      }
      />

      <Route
      path="/dashboard/contact-messages"
      element={
        <ProtectedRoute allowedRoles={["Admin", "Staff"]}>
            <AdminLayout>
              <ContactMessages />
            </AdminLayout>
        </ProtectedRoute>
      }
      />

      <Route
      path="/dashboard/emergency-pickups"
      element={
        <ProtectedRoute allowedRoles={["Admin", "Staff"]}>
          <AdminLayout>
            <EmergencyPickups />
          </AdminLayout>
        </ProtectedRoute>
      }
      />

      <Route
      path="/dashboard/mechanic-applications"
      element={
        <ProtectedRoute allowedRoles={["Admin", "Staff"]}>
          <AdminLayout>
            <MechanicApplications />
          </AdminLayout>
        </ProtectedRoute>
      }
      />

      <Route
      path="/dashboard/servicing-requests"
      element={
        <ProtectedRoute allowedRoles={["Admin", "Staff"]}>
          <AdminLayout>
            <ServicingRequests />
          </AdminLayout>
        </ProtectedRoute>
      }
      />

      <Route
      path="/dashboard/pre-purchase-inspection-requests"
      element={
        <ProtectedRoute allowedRoles={["Admin", "Staff"]}>
          <AdminLayout>
            <PrePurchaseInspectionRequests />
          </AdminLayout>
        </ProtectedRoute>
      }
      />

      <Route
      path="/dashboard/roadside-subscriptions"
      element={
        <ProtectedRoute allowedRoles={["Admin", "Staff"]}>
          <AdminLayout>
            <RoadsideSubscriptions />
          </AdminLayout>
        </ProtectedRoute>
      }
      />

      <Route
      path="/staff-profile"
      element={
        <ProtectedRoute allowedRoles={["Staff"]}>
          <AdminLayout>
            <StaffProfile />
          </AdminLayout>
        </ProtectedRoute>
      }
      />

      <Route
      path="/profile"
      element={
        <ProtectedRoute allowedRoles={["User", "user", "Premium User"]}>
          <AdminLayout>
            <Profile />
          </AdminLayout>
        </ProtectedRoute>
      }
      />

      <Route
      path="/car-status"
      element={
        <ProtectedRoute allowedRoles={["User", "user", "Premium User"]}>
          <AdminLayout>
            <CarStatus />
          </AdminLayout>
        </ProtectedRoute>
      }
      />

      <Route
      path="/my-servicing-requests"
      element={
        <ProtectedRoute allowedRoles={["User", "user", "Premium User"]}>
          <AdminLayout>
            <MyServicingRequests />
          </AdminLayout>
        </ProtectedRoute>
      }
      />

      <Route
      path="/my-pre-purchase-inspection-requests"
      element={
        <ProtectedRoute allowedRoles={["User", "User", "Premium User"]}>
          <AdminLayout>
            <MyPrePurchaseInspectionRequests />
          </AdminLayout>
        </ProtectedRoute>
      }
      />

      <Route
      path="/roadside-subscription"
      element={
        <ProtectedRoute allowedRoles={["User", "user", "Premium User"]}>
          <AdminLayout>
            <RoadsideSubscription />
          </AdminLayout>
        </ProtectedRoute>
      }
      />

    </Routes>
    </BrowserRouter>
  );
}

export default App;