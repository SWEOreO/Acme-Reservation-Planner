const client = require('./client.js');

const createCustomer = async(customerName, uuid) => {
  try{
    await client.query(`
      INSERT INTO customers (name, my_uuid)
      VALUES ($1,$2 )  
    `,[customerName, uuid]);
  } catch(err) {
    console.log(err);
  }
}

const fetchAllCustomers = async() => {
  try {
    const { rows: retrievedCustomers } = await client.query(`
      SELECT * FROM customers;
    `);

    return retrievedCustomers;
  } catch(err) {
    console.log(err);
  }
}

module.exports = {
  createCustomer,
  fetchAllCustomers
}