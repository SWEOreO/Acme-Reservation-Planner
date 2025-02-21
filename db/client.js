const {Client} = require('pg');
const client = new Client(process.env.DATABASE_URL || 'postgres://kayhsu@localhost:5432/acme_reservation_planner');

module.exports = client;