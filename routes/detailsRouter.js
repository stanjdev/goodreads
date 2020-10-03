const express = require('express');
const detailsRouter = new express.Router();
const pool = require('../db');
const fetch = require('node-fetch');
const path = require('path');

require("dotenv").config();
const apiKey = process.env.GOODREADS_APIKEY;


/* DETAILS Page */

detailsRouter.get('/:book_id', (req, res, next) => {
  res.sendFile(__dirname, "../client/build/index.html");
  // console.log(res);
  // next();
})

detailsRouter.get('/:book_id', async (req, res, next) => {
  
  // BookID param must be integer:
  // console.log(!/\D/gi.test(req.params.book_id))
  if (/\D/gi.test(req.params.book_id)) return res.status(202).send("BookID must be an integer only!")
  
  // login is required
  // set result variable as: result = db.execute("SELECT * FROM books WHERE book_id = :book_id", {"book_id": book_id}).fetchone()
  const book = await pool.query(`SELECT * FROM books WHERE book_id = '${req.params.book_id}'`)
  // console.log(book.rows)

  if (book.rows.length > 0) {
    const resultISBN = book.rows[0].isbn;
    const comment_list = await pool.query(`SELECT u.userID, u.firstname, u.lastname, u.email, r.rating, r.comment, r.book_id, r.review_id
                                            FROM reviews r 
                                            JOIN users u 
                                            ON u.userID = r.user_id 
                                            WHERE book_id = '${req.params.book_id}'`);
    // console.log(comment_list.rows);
  
    // Sample: https://www.goodreads.com/book/review_counts.json?isbns=1416949658&key=YOUR_KEY
  
    fetch(`https://www.goodreads.com/book/review_counts.json?isbns=${resultISBN}&key=${apiKey}`)
      .then(response => response.json())
      .then(result => res.status(200).send({result: result, comment_list: comment_list.rows, bookInfo: book.rows[0]}))
      .catch(err => res.send(err))
  } else {
    res.status(202).send("Book not found!")
  }

  // Get API data from GoodReads and link to GoodReads page
  // try( set goodreads variable: goodreads = requests.get("https://www.goodreads.com/book/review_counts.json", params={"key": key, "isbns": result.isbn}))
  // catch( any error )

  
  // Get stored comments from my database particular to one book:
  // const comment_list = db.execute("SELECT u.firstname, u.lastname, u.email, r.rating, r.comment from reviews r JOIN users u ON u.userid=r.user_id WHERE book_id = :id", {"id": book_id}).fetchall()

  // if there is not that result variable: error "Invalid book ID"

  // return the unique book's details page: render_template("details.html", result=result, comment_list=comment_list , book_id=book_id, goodreads=goodreads.json()["books"][0]) # --- removing this worked..? 
});



// POST
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
                  else pool.query(`INSERT INTO reviews (user_id, book_id, rating, comment) VALUES (${user[2]}, ${req.params.book_id}, ${user[3]}, '${user[4]}')`, 
                                  (q_err, q_res) => {
                                    // res.send(q_res);
                                    res.sendFile(__dirname, "../client/build/index.html");
                                  });
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
});




// PUT
detailsRouter.put('/:book_id/:user_id/:review_id/', async (req, res, next) => {
  try {
    const { comment, ratingOption } = req.body;
    const { book_id, user_id, review_id } = req.params;
    console.log(book_id, user_id, review_id, comment, ratingOption);
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
    console.log(book_id, user_id)
    const deleteComment = await pool.query(`DELETE FROM reviews WHERE book_id = '${book_id}' AND user_id = '${user_id}'`)
    // res.json("Comment was deleted!")
    res.sendFile(__dirname, "../client/build/index.html");
  } 
  catch (error) {
    console.error(error);
  }
});






module.exports = detailsRouter;