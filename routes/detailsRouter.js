const express = require('express');
const detailsRouter = new express.Router();
const pool = require('../db');
// const fetch = require('node-fetch');
const fetch = require('isomorphic-fetch');
const path = require('path');

require("dotenv").config();
const apiKey = process.env.GOODREADS_APIKEY;

// ReactDOMServer, StaticRouter attempt
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { StaticRouter, match, RouterContext } = require('react-router');


/* DETAILS Page */

// PLAIN sendFile ATTEMPT 4
detailsRouter.get('/:book_id', async (req, res, next) => {

  if (/\D/gi.test(req.params.book_id)) return res.sendFile(path.join(__dirname, "../client/build/index.html"), {headers: {"error": "book_id must be integer!"}});

  const book = await pool.query(`SELECT * FROM books WHERE book_id = $1`, [req.params.book_id])
  // console.log(book.rows)

  let options = {
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true,
      'name': 'stanimal',
      'origin':'my butt',
      'bookinfo': JSON.stringify(book.rows[0])
    }
  }

  if (book.rows.length > 0) {
    const resultISBN = book.rows[0].isbn;
    const comment_list = await pool.query(`SELECT u.userID, u.firstname, u.lastname, u.email, r.rating, r.comment, r.book_id, r.review_id
                                            FROM reviews r 
                                            JOIN users u 
                                            ON u.userID = r.user_id 
                                            WHERE book_id = $1`, [req.params.book_id]);
    // console.log(comment_list.rows);
  
    // Sample: https://www.goodreads.com/book/review_counts.json?isbns=1416949658&key=YOUR_KEY
  
    const goodReads = await fetch(`https://www.goodreads.com/book/review_counts.json?isbns=${resultISBN}&key=${apiKey}`)
      .then(response => response.json())
      .then(result => {
        options.headers = {...options.headers, 'result': JSON.stringify(result.books[0]), 'comment_list': comment_list.rows.length > 0 ? JSON.stringify(comment_list.rows) : ""}
        // console.log(options.headers)
      })
      .catch(err => console.log(err))
  } else {
    return res.sendFile(path.join(__dirname, "../client/build/index.html"), {headers: {"error": "Book not found!"}});
  }

  res.sendFile(path.join(__dirname, "../client/build/index.html"), options);
})


// // ATTEMPT 3: ReactDOMServer, StaticRouter.
// detailsRouter.get("/:book_id", (req, res, next) => {
//   const context = {};

//   const detailsPage = ReactDOMServer.renderToString(
//     <StaticRouter location={req.url} context={context}>
//       <Details />
//     </StaticRouter>
//   );

//   res.write(`
//     <!doctype html>
//     <div id="">${detailsPage}</div>
//   `);
//   res.end();
// })


// // ATTEMPT 2
// detailsRouter.get('/:book_id', (req, res, next) => {
//   res.sendFile(__dirname, "../client/build/index.html", async function() {

//     if (/\D/gi.test(req.params.book_id)) return res.status(202).send("BookID must be an integer only!")
    
//     // login is required
//     // set result variable as: result = db.execute("SELECT * FROM books WHERE book_id = :book_id", {"book_id": book_id}).fetchone()
//     const book = await pool.query(`SELECT * FROM books WHERE book_id = '${req.params.book_id}'`)
//     // console.log(book.rows)

//     if (book.rows.length > 0) {
//       const resultISBN = book.rows[0].isbn;
//       const comment_list = await pool.query(`SELECT u.userID, u.firstname, u.lastname, u.email, r.rating, r.comment, r.book_id, r.review_id
//                                               FROM reviews r 
//                                               JOIN users u 
//                                               ON u.userID = r.user_id 
//                                               WHERE book_id = '${req.params.book_id}'`);
//       // console.log(comment_list.rows);
    
//       // Sample: https://www.goodreads.com/book/review_counts.json?isbns=1416949658&key=YOUR_KEY
    
//       fetch(`https://www.goodreads.com/book/review_counts.json?isbns=${resultISBN}&key=${apiKey}`)
//         .then(response => response.json())
//         .then(result => res.status(200).send({result: result, comment_list: comment_list.rows, bookInfo: book.rows[0]}))
//         .catch(err => res.send(err))
//     } else {
//       res.status(202).send("Book not found!")
//     }
//   });
//   // console.log(res);
//   // next();
// })


// // ATTEMPT 1
// detailsRouter.get('/:book_id', async (req, res, next) => {
  
//   // BookID param must be integer:
//   // console.log(!/\D/gi.test(req.params.book_id))
//   if (/\D/gi.test(req.params.book_id)) return res.status(202).send("BookID must be an integer only!")
  
//   // login is required
//   // set result variable as: result = db.execute("SELECT * FROM books WHERE book_id = :book_id", {"book_id": book_id}).fetchone()
//   const book = await pool.query(`SELECT * FROM books WHERE book_id = '${req.params.book_id}'`)
//   // console.log(book.rows)

//   if (book.rows.length > 0) {
//     const resultISBN = book.rows[0].isbn;
//     const comment_list = await pool.query(`SELECT u.userID, u.firstname, u.lastname, u.email, r.rating, r.comment, r.book_id, r.review_id
//                                             FROM reviews r 
//                                             JOIN users u 
//                                             ON u.userID = r.user_id 
//                                             WHERE book_id = '${req.params.book_id}'`);
//     // console.log(comment_list.rows);
  
//     // Sample: https://www.goodreads.com/book/review_counts.json?isbns=1416949658&key=YOUR_KEY
  
//     fetch(`https://www.goodreads.com/book/review_counts.json?isbns=${resultISBN}&key=${apiKey}`)
//       .then(response => response.json())
//       .then(result => res.status(200).send({result: result, comment_list: comment_list.rows, bookInfo: book.rows[0]}))
//       .catch(err => res.send(err))
//   } else {
//     res.status(202).send("Book not found!")
//   }

//   // Get API data from GoodReads and link to GoodReads page
//   // try( set goodreads variable: goodreads = requests.get("https://www.goodreads.com/book/review_counts.json", params={"key": key, "isbns": result.isbn}))
//   // catch( any error )

  
//   // Get stored comments from my database particular to one book:
//   // const comment_list = db.execute("SELECT u.firstname, u.lastname, u.email, r.rating, r.comment from reviews r JOIN users u ON u.userid=r.user_id WHERE book_id = :id", {"id": book_id}).fetchall()

//   // if there is not that result variable: error "Invalid book ID"

//   // return the unique book's details page: render_template("details.html", result=result, comment_list=comment_list , book_id=book_id, goodreads=goodreads.json()["books"][0]) # --- removing this worked..? 
// });



// POST
detailsRouter.post('/:book_id', (req, res, next) => {
  const user = [
    req.body.name,
    req.body.email,
    req.body.userid,
    req.body.userRating,
    req.body.userComment
  ]

  // console.log(user);

  // user_reviewed_before
  pool.query(`SELECT * FROM reviews 
                WHERE user_id = $1
                AND book_id = $2`, [user[2], req.params.book_id], (q_err, q_res) => {
                  if (q_err) next(q_err);
                  if (q_res) console.log(q_res.rows);
                  if (q_res && q_res.rows.length > 0) res.status(202).send("You've already reviewed this book!")
                  else pool.query(`INSERT INTO reviews (user_id, book_id, rating, comment) VALUES ($1, $2, $3, $4)`, [user[2], req.params.book_id, user[3], user[4]], 
                                  (q_err, q_res) => {
                                    res.send(q_res);
                                    // res.sendFile(__dirname, "../client/build/index.html");
                                  });
                });
});



// PUT
detailsRouter.put('/:book_id/:user_id/:review_id/', async (req, res, next) => {
  try {
    const { comment, ratingOption } = req.body;
    const { book_id, user_id, review_id } = req.params;
    // console.log(book_id, user_id, review_id, comment, ratingOption);
    const updateComment = await pool.query(
      "UPDATE reviews SET comment = $1, rating = $4 WHERE review_id = $2 AND user_id = $3", 
      [comment, review_id, user_id, ratingOption]
    );
  // this works: UPDATE reviews SET comment = 'I like butterflies' WHERE review_id = 33 AND user_id = 155;
    // res.json("comment was updated!")
    res.sendFile(__dirname, "../client/build/index.html");
  } catch (error) {
    console.error(error);
  }
});



// DELETE
detailsRouter.delete('/:book_id/:user_id', async (req, res, next) => {
  try {
    const { book_id, user_id } = req.params;
    // console.log(book_id, user_id)
    const deleteComment = await pool.query(`DELETE FROM reviews WHERE book_id = $1 AND user_id = $2`, [book_id, user_id])
    // res.json("Comment was deleted!")
    res.sendFile(__dirname, "../client/build/index.html");
  } 
  catch (error) {
    console.error(error);
  }
});



module.exports = detailsRouter;