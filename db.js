const { Pool } = require('pg');
require('dotenv').config();

const devConfig = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT
}

// another way to do it dev (localhost) This way goes into the connectionString:
// const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`

const prodConfig = {
  connectionString: process.env.DATABASE_URL // heroku addon Postgres database!
}

// create a new connection pool to the database
const pool = new Pool(process.env.NODE_ENV === "production" ? prodConfig : devConfig)

module.exports = pool