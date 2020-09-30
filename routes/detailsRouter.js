const { request } = require('express');
const express = require('express');
const detailsRouter = new express.Router();
const pool = require('../db');
const fetch = require('node-fetch');

require("dotenv").config();
const apiKey = process.env.GOODREADS_APIKEY;


/* DETAILS Page */

detailsRouter.get('/:book_id', async (req, res, next) => {
  
  // console.log(req.params.book_id)
  // login is required
  // set result variable as: result = db.execute("SELECT * FROM books WHERE book_id = :book_id", {"book_id": book_id}).fetchone()
  const book = await pool.query(`SELECT * FROM books WHERE book_id = '${req.params.book_id}'`)
  // console.log(book.rows[0].book_id)
  const resultISBN = book.rows[0].isbn;
  
  const comment_list = await pool.query(`SELECT u.firstname, u.lastname, u.email, r.rating, r.comment 
                                          FROM reviews r 
                                          JOIN users u 
                                          ON u.userID = r.user_id 
                                          WHERE book_id = '${req.params.book_id}'`);
  // console.log(comment_list.rows);

  // Sample: https://www.goodreads.com/book/review_counts.json?isbns=1416949658&key=YOUR_KEY

  fetch(`https://www.goodreads.com/book/review_counts.json?isbns=${resultISBN}&key=${apiKey}`)
    .then(response => response.json())
    .then(result => res.status(200).send({result: result, comment_list: comment_list.rows}))

  // Get API data from GoodReads and link to GoodReads page
  // try( set goodreads variable: goodreads = requests.get("https://www.goodreads.com/book/review_counts.json", params={"key": key, "isbns": result.isbn}))
  // catch( any error )

  
  // Get stored comments from my database particular to one book:
  // const comment_list = db.execute("SELECT u.firstname, u.lastname, u.email, r.rating, r.comment from reviews r JOIN users u ON u.userid=r.user_id WHERE book_id = :id", {"id": book_id}).fetchall()

  // if there is not that result variable: error "Invalid book ID"

  // return the unique book's details page: render_template("details.html", result=result, comment_list=comment_list , book_id=book_id, goodreads=goodreads.json()["books"][0]) # --- removing this worked..? 
})





detailsRouter.post('/:book_id', (req, res, next) => {
  // login is required
  // When user is about to post a comment. Check if user commented on this particular book before:

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
                WHERE user_id = ${user[2]}
                AND book_id = ${req.params.book_id}`, (q_err, q_res) => {
                  if (q_err) next(q_err);
                  if (q_res) console.log(q_res.rows);
                  if (q_res && q_res.rows.length > 0) res.status(202).send("You've already reviewed this book!")
                  else pool.query(`INSERT INTO reviews (user_id, book_id, rating, comment) VALUES (${user[2]}, ${req.params.book_id}, ${user[3]}, '${user[4]}')`);
                });

  // if (!userComment) res.status(202).send("Comment section cannot be empty!");
  /* 
  user_reviewed_before = db.execute("SELECT * from reviews WHERE user_id = :user_id AND book_id = :book_id",  {"user_id": session["user_id"], "book_id": book_id}).fetchone()
  if user_reviewed_before:
      return render_template("error.html", message = "You reviewed this book before!")
  */
  // proceed to user posting comment.
  // encapsulate the user's comment and rating input values into variables userComment, userRating
  // if not userComment, error "Comment section cannot be empty"

  
  /* 
  try committing to DB, catch error if any
  db.execute("INSERT INTO reviews (user_id, book_id, rating, comment) VALUES (:user_id, :book_id, :rating, :comment)",
      {"user_id": session["user_id"], "book_id": book_id, "rating": user_rating, "comment": user_comment})
  */
 
 // success - db.commit(), "thanks for leaving a review!", redirect to that same details page. review should be updated now.
})


module.exports = detailsRouter;