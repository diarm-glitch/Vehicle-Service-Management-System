import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";

import Navbar from "./components/Navbar";
import About from "./components/About";
import Services from "./components/Services";
import BuySell from "./components/BuySell";
import Assistance from "./components/Assistance";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Contact from "./components/Contact";

const Login = lazy(() => import ("./pages/Login"));
const Register = lazy(() => import ("./pages/Register"));
const Dashboard = lazy(() => import ("./pages/Dashboard"));
const Customers = lazy (() => import ("./pages/Customers"));
const Vehicles = lazy(() => import ("./pages/Vehicles"));
const ServiceTypes = lazy(() => import ("./pages/ServiceTypes"));
const Technicians = lazy(() => import ("./pages/Technicians"));
const Appointments = lazy(() => import ("./pages/Appointments"));
const Parts = lazy(() => import ("./pages/Parts"));
const ServiceRecords = lazy(() => import ("./pages/ServiceRecords"));
const ServiceParts = lazy(() => import ("./pages/ServiceParts"));
const Invoices = lazy(() => import ("./pages/Invoices"));
const ServiceReminders = lazy(() => import ("./pages/ServiceReminders"));
const Roles = lazy(() => import ("./pages/Roles"));
const UserRoles = lazy(() => import ("./pages/UserRoles"));
const Users = lazy(() => import ("./pages/Users"));
const UserClaims = lazy(() => import ("./pages/UserClaims"));
const UserTokens = lazy(() => import ("./pages/UserTokens"));
const MechanicApplication = lazy(() => import ("./pages/MechanicApplication"));
const EmergencyPickup = lazy(() => import ("./pages/EmergencyPickup"));
const ContactMessages = lazy(() => import ("./pages/ContactMessages"));
const EmergencyPickups = lazy(() => import ("./pages/EmergencyPickups"));
const MechanicApplications = lazy(() => import ("./pages/MechanicApplications"));
const Profile = lazy(() => import ("./pages/Profile"));
const CarStatus = lazy(() => import ("./pages/CarStatus"));
const AdminProfile = lazy(() => import ("./pages/AdminProfile"));
const StaffProfile = lazy(() => import ("./pages/StaffProfile"));
const Repairs = lazy(() => import ("./pages/Repairs"));
const Diagnostics = lazy(() => import ("./pages/Diagnostics"));
const Servicing = lazy(() => import ("./pages/Servicing"));
const Tyres = lazy(() => import ("./pages/Tyres"));
const Tuning = lazy(() => import ("./pages/Tuning"));
const PrePurchaseInspection = lazy(() => import ("./pages/PrePurchaseInspection"));
const ServicingRequests = lazy(() => import ("./pages/ServicingRequests"));
const MyServicingRequests = lazy(() => import ("./pages/MyServicingRequests"));
const PrePurchaseInspectionRequests = lazy(() => import ("./pages/PrePurchaseInspectionRequests"));
const MyPrePurchaseInspectionRequests = lazy(() => import ("./pages/MyPrePurchaseInspectionRequests"));
const RoadsideSubscription = lazy(() => import ("./pages/RoadsideSubscription"));
const RoadsideSubscriptions = lazy(() => import ("./pages/RoadsideSubscriptions"));
const NewCars = lazy(() => import("./pages/NewCars"));
const EVCars = lazy(() => import("./pages/EVCars"));
const SUVCars = lazy(() => import("./pages/SUVCars"));
const Vans = lazy(() => import("./pages/Vans"));
const Hybrids = lazy(() => import("./pages/Hybrids"));
const MyReviews = lazy (() => import("./pages/MyReviews"));
const MySales = lazy(() => import("./pages/MySales"));

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
          <Link to="/new-cars" className="outline-btn">Buy or Sell Cars</Link>
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
    <Suspense fallback={<h2>Loading...</h2>}>
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

      <Route path="/new-cars" element={<NewCars />} />

      <Route path="/ev-cars" element={<EVCars />} />

      <Route path="/suv-cars" element={<SUVCars />} />

      <Route path="/vans" element={<Vans />} />

      <Route path="/hybrids" element={<Hybrids />} />

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
      path="/vehicles"
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

      <Route 
      path="/my-reviews"
      element={
        <ProtectedRoute allowedRoles={["User", "user", "Premium User"]}>
          <AdminLayout>
            <MyReviews />
          </AdminLayout>
        </ProtectedRoute>
      }
      />

      <Route
      path="/my-sales"
      element={
        <ProtectedRoute allowedRoles={["User", "user", "Premium User"]}>
          <AdminLayout>
            <MySales />
          </AdminLayout>
        </ProtectedRoute>
      }
      />

    </Routes>
    </Suspense>
    </BrowserRouter>
  );
}

export default App;