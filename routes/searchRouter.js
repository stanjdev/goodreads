const express = require('express');
const searchRouter = express.Router();
const pool = require('../db');


/* SEARCH Router */

searchRouter.get('/' , (req, res, next) => {
  // res.sendFile(path.join(__dirname, "client", "build", "index.html"));
})

searchRouter.post('/', (req, res, next) => {
  let keywords = req.body.query;
  console.log(keywords, "from front end!");
  // User must be logged in. Login Required
  // render the search page
  const sql = `SELECT * FROM books WHERE 
                LOWER(isbn) LIKE '%${keywords}%' OR
                LOWER(title) LIKE '%${keywords}%' OR
                LOWER(author) LIKE '%${keywords}%'`;
  pool.query(sql, (q_err, q_res) => {
    if (q_err) next(q_err);
    // console.log(q_res);
    return res.status(200).json(q_res.rows)
    // return res.writeHead(301, {Location: '/results' + q_res.rows})
   })
})


// searchRouter.post('/', (req, res, next) => {
  // User must be logged in. Login Required
  // set let query = the value of the input form. req.form.get("input_search")
  // if query is empty, "Search field can't be empty!"


    // database.query(`SELECT * FROM books WHERE LOWER(isbn) LIKE ${query} OR LOWER(title) LIKE ${query} OR LOWER(author) LIKE ${query}`)
   
    // pool.query(`SELECT * FROM books WHERE 
    //             LOWER(isbn) LIKE '${keywords}' OR
    //             LOWER(title) LIKE '${keywords} 'OR
    //             LOWER(author) LIKE '${keywords}' OR
    //             LOWER(year) LIKE '${keywords}'
    //             `, (q_err, q_res) => {
    //               if (q_err) return next(q_err);
    //               res.json(q_res.rows)
    //             })
  // try(result = db.execute("SELECT * FROM books WHERE LOWER(isbn) LIKE :query OR LOWER(title) LIKE :query OR LOWER(author) LIKE :query", {"query": "%" + query.lower() + "%"}).fetchall()), 
  // catch(exception, error)
  // if not result, "Book not found :("
  // after the search, message displaying: flash("You searched for: " + "'" + query + "'")
  // return ResultsList page where the result = result rendered out
// })

module.exports = searchRouter;