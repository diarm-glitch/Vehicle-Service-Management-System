const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const customerRoutes = require('./routes/customer.routes');
const vehicleRoutes = require('./routes/vehicle.routes');
const serviceTypeRoutes = require('./routes/serviceType.routes');
const appointmentRoutes = require('./routes/appointment.routes');
const technicianRoutes = require('./routes/technician.routes');
const serviceRecordRoutes = require('./routes/serviceRecord.routes');
const partRoutes = require('./routes/part.routes');
const servicePartRoutes = require('./routes/servicePart.routes');
const invoiceRoutes = require('./routes/invoice.routes');
const serviceReminderRoutes = require('./routes/serviceReminder.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const usersRoutes = require('./routes/users.routes');
const rolesRoutes = require('./routes/roles.routes');
const userRolesRoutes = require('./routes/userRoles.routes');
const userClaimsRoutes = require('./routes/userClaims.routes');
const userTokensRoutes = require('./routes/userTokens.routes');
const mechanicApplicationRoutes = require("./routes/mechanicApplication.routes");
const contactMessageRoutes = require("./routes/contactMessage.routes");
const emergencyPickupRoutes = require("./routes/emergencyPickup.routes");
const servicingRequestRoutes = require("./routes/servicingRequest.routes");
const prePurchaseInspectionRequestRoutes = require("./routes/prePurchaseInspectionRequest.routes");
const roadsideSubscriptionRoutes = require("./routes/roadsideSubscription.routes");
const carReviewRoutes = require("./routes/carReview.routes");
const carSaleRequestRoutes = require("./routes/carSaleRequest.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use('/auth', authRoutes);

app.use('/customers', customerRoutes);

app.use('/vehicles', vehicleRoutes);

app.use('/appointments', appointmentRoutes)

app.use('/service-types', serviceTypeRoutes);

app.use('/technicians', technicianRoutes);

app.use('/service-records', serviceRecordRoutes);

app.use('/parts', partRoutes);

app.use('/service-parts', servicePartRoutes);

app.use('/invoices', invoiceRoutes);

app.use('/service-reminders', serviceReminderRoutes);

app.use('/dashboard', dashboardRoutes);

app.use('/users', usersRoutes);

app.use('/roles', rolesRoutes);

app.use('/user-roles', userRolesRoutes);

app.use('/user-claims', userClaimsRoutes);

app.use('/user-tokens', userTokensRoutes);

app.use("/mechanic-applications", mechanicApplicationRoutes);

app.use("/contact-messages", contactMessageRoutes);

app.use("/emergency-pickups", emergencyPickupRoutes);

app.use("/servicing-requests", servicingRequestRoutes);

app.use("/pre-purchase-inspection-requests", prePurchaseInspectionRequestRoutes);

app.use("/roadside-subscriptions", roadsideSubscriptionRoutes);

app.use("/car-reviews", carReviewRoutes);

app.use("/car-sale-requests", carSaleRequestRoutes);

app.get('/', (req, res) => {
    res.send('API is running');
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});