const { Pool } = require('pg');
require('dotenv').config();

const devConfig = {
  // user: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  // host: process.env.DB_HOST,
  // port: process.env.DB_PORT,
  // database: process.env.DB_DATABASE,
  user: "postgres_render_db_uj2b_user",
  host: "dpg-cqa4ge5ds78s739m8obg-a.oregon-postgres.render.com",
  database: "postgres_render_db_uj2b",
  password: "N1X8BxHPOaY3YV3vJa8WTJWBieaYfMSr",
  port: 5432,
  ssl: true,
}

// another way to do it dev (localhost) This way goes into the connectionString:
// const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`

const prodConfig = {
  connectionString: process.env.DATABASE_URL // heroku addon Postgres database!
}

// create a new connection pool to the database
// const pool = new Pool(process.env.NODE_ENV === "production" ? prodConfig : devConfig)
const pool = new Pool(devConfig)

// Add process hook to shutdown pool
process.on('SIGINT', function() {
  pool.end();
  console.log('Application successfully shutdown');
  process.exit(0);
});

module.exports = pool
