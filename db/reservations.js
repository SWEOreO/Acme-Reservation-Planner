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


const destoryReservation = async(reservationId, customer_id) => {
  try{
    const {rows} = await client.query(`
      DELETE FROM reservation WHERE id = ${reservationId} and customer_id = ${customer_id}
      RETURNING *`
      );

      if (rows[0]) {
        return rows[0];
      } else {
        throw Error({message:`reservation not found`});
      }
    
  } catch(err) {
    console.log(err);
  }
}


const fetchAllReservations = async() => {
  try{
    const {rows: fetchedReservations} = await client.query(`
      SELECT * FROM reservations; 
    `);

    return fetchedReservations;
  } catch(err) {
    console.log(err);
  }

}


const getReservationByCustomerAndReservationId = async(customer_id, reservationId) => {
  try{
    const {row} = await client.query(`
      `);
  } catch(err) {
    console.log(err);
  }
}

module.exports = {
  createReservation,
  destoryReservation,
  fetchAllReservations
}