const client = require('./client.js');

const createRestaurant = async(restaurantName) => {
  try{
    await client.query(`
      INSERT INTO restaurants (name)
      VALUES ($1)  
    `,[restaurantName]);
  } catch(err) {
    console.log(err);
  }
}

const fetchAllRestaurants = async() => {
  try {
    const { rows: retrievedRestaurants } = await client.query(`
      SELECT * FROM restaurants;
    `);

    return retrievedRestaurants;
  } catch(err) {
    console.log(err);
  }
}


module.exports = {
  createRestaurant,
  fetchAllRestaurants
}