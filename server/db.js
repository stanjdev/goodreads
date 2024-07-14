const { Pool } = require('pg');
require('dotenv').config();

// const devConfig = {
//   user: process.env.PG_USER,
//   host: process.env.PG_HOST,
//   database: process.env.PG_DATABASE,
//   password: process.env.PG_PASSWORD,
//   port: process.env.PG_PORT
// }

const devConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  // user: "postgres",
  // host: "goodreads-reviews-database.c5ioue8qqu6m.us-west-1.rds.amazonaws.com",
  // database: "",
  // password: ")Mz2zsC_S-K.73O0{N$A8?i$nY{g",
  // port: 5432
}

/* 
AWS Aurora RDS instance endpoint:
goodreads-reviews-database.c5ioue8qqu6m.us-west-1.rds.amazonaws.com
Port is also 5432, cuz PG

Master username
postgres

password: )Mz2zsC_S-K.73O0{N$A8?i$nY{g

Lambda Function URL: https://4iy5xxbqa7iirxjkshgzv6tiwy0pmmzf.lambda-url.us-west-1.on.aws/ 
*/

// another way to do it dev (localhost) This way goes into the connectionString:
// const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`

const prodConfig = {
  connectionString: process.env.DATABASE_URL // heroku addon Postgres database!
}

// console.log(process)

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

