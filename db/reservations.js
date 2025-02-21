const client = require('./client.js');

const createReservation = async(date, partyCount, customer_id, restaurant_id) => {
  try{
    const results = await client.query(`
      INSERT INTO reservation (date, party_count, customer_id, restaurant_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *; 
    `,[date, partyCount, customer_id, restaurant_id]);

    return results.rows[0];
  } catch(err) {
    console.log(err);
  }
}


const destoryReservation = async(reservationId) => {
  try{
    const result = await client.query(`
      DELETE FROM reservation WHERE id = $1 
      RETURNING *`, 
      [reservationId]);

      if (result.rowCount === 0) {
        console.log("No reservation found with the given ID.");
        return null;
      }
  
      return result.rows[0]; 
    
  } catch(err) {
    console.log(err);
  }
}

module.exports = {
  createReservation,
  destoryReservation
}