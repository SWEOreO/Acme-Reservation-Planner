// import the client
const client = require('./client.js');
const { createCustomer, fetchAllCustomers } = require('./customers.js');
const { createRestaurant,fetchAllRestaurants } = require('./restaurants.js');
const {createReservation, destoryReservation} = require('./reservations.js');
const {v4: uuidv4} = require('uuid');

// drop tables function (invoke later in syncAndSeed)
const dropTables = async() => {
  try{
    await client.query(`
      DROP TABLE IF EXISTS reservation;
      DROP TABLE IF EXISTS restaurants;
      DROP TABLE IF EXISTS customers;
      `);
  } catch (err) {
    console.log(err);
  }
}

// create tables function (invoke later in syncAndSeed)
const createTables = async() => {
  try{
    //CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    //CREATE TABLE customers (
    //   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    //   name VARCHAR(30) NOT NULL,
    //   my_uuid UUID 
    // );

    await client.query(`
      CREATE TABLE customers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        my_uuid UUID 
      );
      CREATE TABLE restaurants (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL
        );
        
        CREATE TABLE reservation (
          id SERIAL PRIMARY KEY,
          date DATE NOT NULL,
          party_count INTEGER NOT NULL,
          customer_id INTEGER REFERENCES customers(id) NOT NULL,
          restaurant_id INTEGER REFERENCES restaurants(id) NOT NULL 
          );
      `);
  } catch (err) {
    console.log(err);
  }
}


// main function
const syncAndSeed = async() => {

  // connect to db
  await client.connect();
  console.log(`CONNECTED TO THE DB`);

  // drop the table
  console.log(`DROPPING TABLES`);
  await dropTables();
  console.log(`TABLE DROPPED`);
  // create tables
  console.log('CREATING TABLES');
  await createTables();
  console.log('TABLES CREATED');

  // create data
  console.log(`CREATING CUSTOMERS`);
  await createCustomer('Joe', uuidv4());
  await createCustomer('James', uuidv4());
  await createCustomer('Hans', uuidv4());
  await createCustomer('Katherine', uuidv4());
  await createCustomer('Olivia', uuidv4());
  await createCustomer('Faith', uuidv4());
  await createCustomer('Sandy', uuidv4());
  await createCustomer('Nick', uuidv4());
  await createCustomer('Linda', uuidv4());
  await createCustomer('Pilavi', uuidv4());
  await createCustomer('Mohamod', uuidv4());
  await createCustomer('Chunli', uuidv4());
  await createCustomer('Seven', uuidv4());
  await createCustomer('Alice', uuidv4());
  await createCustomer('Brandon', uuidv4());
  await createCustomer('Tim', uuidv4());
  await createCustomer('Erick', uuidv4());
  await createCustomer('Dahlia', uuidv4());
  console.log(`CUSTOMERS CREATED`);

  // fetch all customers
  console.log(`FETCH ALL CUSTOMERS`)
  const allCustomers = await fetchAllCustomers();
  console.log(allCustomers);

  console.log(`CREATING RESTAURANTS`);
  await createRestaurant('BBQ');
  await createRestaurant('Pizza');
  await createRestaurant('Sports Bar');
  await createRestaurant('Salad');
  await createRestaurant('Taco');
  await createRestaurant('Buffet');
  await createRestaurant('Luxury Meal');
  await createRestaurant('Sushi');
  await createRestaurant('Noodle');
  console.log(`RESTAURANTS CREATED`);

   // fetch all restaurants
   console.log(`FETCH ALL RESTAURANTS`)
   const allRestaurants = await fetchAllRestaurants();
   console.log(allRestaurants);

  console.log(`CREATING RESERVATION`);
  console.log(`RESERVATION CREATED`);

  // create reservation
  console.log(`CREATE RESERVATION`);
  console.log(new Date(2025,1,22).toISOString().slice(0,19).replace('T',' '));
  await createReservation('2025-01-01',4,2,1);
  await createReservation('2025-02-01',5,3,9);
  await createReservation('2025-03-01',2,6,7);

  // destory reservation
  console.log(`DESTORY RESERVATION`);
  await destoryReservation(2);
  await destoryReservation(4);
  await destoryReservation(7);

  // disconnect to db
  await client.end();
  console.log(`DISCONNECTED TO THE DB`);

}

syncAndSeed();