const {fetchAllCustomers} = require('./db/customers.js');
const {ferchAllRestaurants} = require('./db/restaurants.js');

const express = require('express');
const app = express();
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
app.use(express.json());


app.get('/', (req, res, next) => {
  res.send(`WELCOME`);
});

app.get('/api/customers', async(req, res, next)=> {
try{
  const test = await prisma.test.findMany();
  res.status(200).json(test);
} catch(err) {
  console.log(err);
}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
