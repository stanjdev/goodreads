const express = require('express');
const searchRouter = express.Router();
const pool = require('../db');


/* SEARCH Router */

// searchRouter.get('/' , (req, res, next) => {
//   // res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// })

searchRouter.post('/', (req, res, next) => {
  let keywords = req.body.query;
  // console.log(keywords, "from front end!");
  // User must be logged in. Login Required
  // render the search page
  const sql = `SELECT * FROM books WHERE 
                LOWER(isbn) LIKE LOWER($1) OR
                LOWER(title) LIKE LOWER($1) OR
                LOWER(author) LIKE LOWER($1)`;
  const values = [`%${keywords}%`]
  pool.query(sql, values, (q_err, q_res) => {
    if (q_err) next(q_err);
    console.log("search results from searchRouter: ", q_res.rows);
    return res.status(200).send(q_res.rows)
    // return res.writeHead(301, {Location: '/results' + q_res.rows})
   })
})

module.exports = searchRouter;