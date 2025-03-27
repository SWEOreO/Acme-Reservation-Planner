# Acme Reservation Planner

## Overview
The **Acme Reservation Planner** is a RESTful API that facilitates the management of restaurant reservations. The API interacts with a PostgreSQL database, allowing users to create, retrieve, and delete customers, restaurants, and reservations.

## Project Structure
The repository contains a **db** folder with the following files:

- **client.js**: Configures and exports the PostgreSQL client.
- **seed.js**: Handles database initialization, including table creation and seeding with sample data.
- **customers.js**: Manages operations related to customers.
- **restaurants.js**: Manages operations related to restaurants.
- **reservations.js**: Manages operations related to reservations.

## Data Layer Functions
The API includes the following database interaction methods:

- **client**: Exports the PostgreSQL client.
- **createTables**: Creates the necessary database tables.
- **dropTables**: Drops all database tables.
- **createCustomer**: Adds a new customer to the database and returns the created record.
- **createRestaurant**: Adds a new restaurant to the database and returns the created record.
- **fetchCustomers**: Retrieves an array of customers from the database.
- **fetchRestaurants**: Retrieves an array of restaurants from the database.
- **createReservation**: Adds a new reservation and returns the created record.
- **destroyReservation**: Deletes a specified reservation from the database.

Each function should be tested individually within **seed.js** before moving on to the next.

## API Endpoints
The Express application includes the following RESTful routes:

### Customers
- **GET /api/customers**: Returns an array of customers.

### Restaurants
- **GET /api/restaurants**: Returns an array of restaurants.

### Reservations
- **GET /api/reservations**: Returns an array of reservations.
- **POST /api/customers/:id/reservations**: Creates a reservation for a given customer. The request body must contain:
  ```json
  {
    "restaurant_id": <valid restaurant_id>,
    "date": "YYYY-MM-DD",
    "party_count": <number>
  }
  ```
  Returns the created reservation with a **201 Created** status.
- **DELETE /api/customers/:customer_id/reservations/:id**: Deletes a specific reservation associated with a customer and returns a **204 No Content** status.

### Error Handling
- An error-handling route returns an object with an **error** property for invalid requests.

## Testing
Use **Postman** or similar API testing tools to verify each route's functionality. Ensure that database operations execute as expected before integrating further features.

## Bonus Features
- Implement additional validations and error handling for robust API performance.
- Expand API functionality to include customer authentication and reservation modifications.
- Enhance database queries for optimized performance.

---
This project provides a structured approach to building a database-backed RESTful API, reinforcing backend development skills while ensuring best practices in Express.js and PostgreSQL.
