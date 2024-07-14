const express = require("express");
const router = express.Router();
const pool = require('../db');
const cors = require('cors');
const path = require('path');

require("dotenv").config();
const apiKey = process.env.GOODREADS_APIKEY;


router.use(cors());

// Connected routers:
// we're using the searchRouter middleware!
const searchRouter = require('./searchRouter');
router.use('/search', searchRouter);

const loginRouter = require('./loginRouter');
router.use('/login', loginRouter);

const registerRouter = require('./registerRouter');
router.use('/register', registerRouter);

const detailsRouter = require('./detailsRouter');
router.use('/details', detailsRouter);


// router.get("/", (req, res) => {
//   res.send({ response: "Server up and running from the root! Message from router.js" }).status(200);
// });


/* My app's API that returns a JSON object of the book's info get('/api') route */
router.get("/api/:book_id", async (req, res, next) => {
  
  if (/\D/gi.test(req.params.book_id)) return res.sendFile(path.join(__dirname, "../../client/build/index.html"), {headers: {"error": "book_id must be integer!"}});
  const book = await pool.query(`SELECT * FROM books WHERE book_id = $1`, [req.params.book_id]);

  let options = {
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true,
      'name': 'GoodReads Reviews',
      'origin': 'React GoodReads',
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
    return res.sendFile(path.join(__dirname, "../../client/build/index.html"), {headers: {"error": "Book not found!"}});
  }
  res.send({ bookInfo: JSON.parse(options.headers.bookinfo), goodReadsInfo: JSON.parse(options.headers.result) }).status(200);

})

router.get('/testusers', async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  let teammembers = []
  console.log(await pool.query('SHOW TABLES;'))
  // pool
  //     .query('SHOW TABLES;')
      // .then(query_res => {
      //     for (let i = 0; i < query_res.rowCount; i++){
      //         teammembers.push(query_res.rows[i]);
      //     }
      //     const data = {teammembers: teammembers};
      //     console.log(teammembers);
      //     res.send(data)
      // });
});

// CATCH-ALL
router.get("*", (req,res) => {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
  // res.send("uh oh! catch all")
  // res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  // res.render("uh oh! catch all")
  // res.redirect('/');
})

// app.route or app.get for the '/logout'. clear the session. say "You have successfully logged out. Thanks for visiting!" redirect to "/" page - or just use flash message and redirect user to home page


module.exports = router;