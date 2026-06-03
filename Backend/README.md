\# Vehicle Service Management System - Backend



\## Technologies

\- Node.js

\- Express.js

\- MySQL

\- JWT Authentication

\- Refresh Tokens

\- Multer



\## Installation



1\. Open terminal

2\. Navigate to Backend folder



npm install



3\. Create .env file



4\. Start server



npm start



\## API Features



\- Authentication

\- Customers CRUD

\- Vehicles CRUD

\- Appointments CRUD

\- Parts CRUD

\- Invoices CRUD

\- Technicians CRUD

\- User Claims CRUD

\- User Tokens CRUD

\- Car Reviews

\- Car Sale Requests









\## API Documentation



\### Authentication



POST /auth/register

Creates a new user account.



POST /auth/login

Authenticates a user and returns JWT tokens.



POST /auth/refresh-token

Generates a new access token.



\### Customers



GET /customers

Returns all customers.



GET /customers/:id

Returns a customer by ID.



POST /customers

Creates a new customer.



PUT /customers/:id

Updates a customer.



DELETE /customers/:id

Deletes a customer.



\### Vehicles



GET /vehicles

Returns all vehicles.



POST /vehicles

Creates a vehicle.



PUT /vehicles/:id

Updates a vehicle.



DELETE /vehicles/:id

Deletes a vehicle.



\### Car Reviews



GET /car-reviews

Returns public reviews.



POST /car-reviews

Creates a review.



DELETE /car-reviews/:id

Deletes a review.



\### Car Sale Requests



GET /car-sale-requests

Returns sale listings.



POST /car-sale-requests

Creates a sale listing.



DELETE /car-sale-requests/:id

Deletes a sale listing.

