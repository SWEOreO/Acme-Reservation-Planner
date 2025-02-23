const {fetchAllCustomers} = require('./db/customers.js');
const {fetchAllRestaurants} = require('./db/restaurants.js');
const {fetchAllReservations, createReservation, destoryReservation} = require('./db/reservations.js');

const express = require('express');
const app = express();

const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

// need to read a body from post request, so need this express json to 'translate'
app.use(express.json());


app.get('/', (req, res, next) => {
  res.send(`WELCOME`);
});


// // Prisma
// app.get('/api/customers', async(req, res, next)=> {
// try{
//   const test = await prisma.test.findMany();
//   res.status(200).json(test);
// } catch(err) {
//   console.log(err);
// }
// });


app.get('/api/customers', async(req, res, next) => {
  try{
    const allCustomers = await fetchAllCustomers();
  } catch(err) {
    next(err);
  }
});


app.get('/api/restaurants', async(req, res, next) => {
  try{
    const allRestaurants = await fetchAllRestaurants();
  } catch(err) {
    next(err);
  }
});


app.get('/api/reservations', async(req, res, next) => {
  try{
    const allReservations = await fetchAllReservations();
    res.send(allReservations);
  } catch(err) {
    next(err);
  }
});


app.post('/api/customer/:id/reservations', async(req, res, next) => {
  const {id: customer_id} = req.params;
  // console.log(id);
  const{restaurant_id, date, party_count} = req.body;

  try{
    const newReservation = await createReservation(date, party_count, restaurant_id, customer_id);
  }catch(err) {
    next(err);
  }
  res.status(201).send(newReservation);
});


app.delete('/api/customers/:customer_id/reservations/:id', async(req, res, next) => {
  const {customer_id, id: reservationId} = req.params;
  console.log(customer_id, reservationId)
  try{

    await destoryReservation(reservationId, customer_id);

    res.status(204).send({});
  } catch(err) {
    next(err);
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
