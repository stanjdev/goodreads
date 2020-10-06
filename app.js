// import express (after npm install express)
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

require('ignore-styles')

require('@babel/register')({
  ignore: [/(node_modules)/],
  presets: ['@babel/preset-env', '@babel/preset-react']
})

// require('./server')


// import { match, RouterContext } from 'react-router';
// const React = require('react');
// const ReactDOMServer = require('react-dom/server');
// const { StaticRouter } = require('react-router');


// create new express app and save it as "app"
const app = express();

// server configuration
const PORT = process.env.PORT || 5000;

//process.env.PORT
//process.env.NODE_ENV => production or undefined

// MIDDLEWARE
// anytime we hit any route, parse/convert any req.body to json so we can use the data.
app.use(bodyParser.json());

// This will bypass CORS error when doing fetch request from a different client to this server.
app.use(cors())


// // react-router 'match' Attempt from https://stackoverflow.com/questions/35524117/express-status-404-with-react-router
// app.use((req, res, next) => {
//   match({ router, location: req.url }, (error, redirectLocation, renderProps) => {
//     if (error) {
//       res.status(500).send(error.message)
//     } else if (redirectLocation) {
//       res.redirect(302, redirectLocation.pathname + redirectLocation.search) 
//     } else if (renderProps) {
//       res.status(200).send("match works!")
//     } else {
//       res.status(404).send("Not Found")
//     }
//   })
// });






if (process.env.NODE_ENV === "production") {
  // serve static content(from when you run `npm run build`. aim for the index.html in your 'build' folder)
  app.use(express.static(path.join(__dirname, "client/build")));
  // app.use("/", express.static("./client/build"))

  // app.get("*", (req,res) => {
  //   res.sendFile(path.join(__dirname, "client/build/index.html"));
  // })

  // Attempt: https://www.reddit.com/r/reactjs/comments/apk207/react_router_urls_not_working_in_heroku/ 
  app.get('/search', (req, res, next) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  })
  app.get('/login', (req, res, next) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  })
  app.get('/register', (req, res, next) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  })


  // app.get('/details/:book_id', (req, res, next) => {
  //   res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  // })
  // app.get('/details/:book_id', async (req, res, next) => {
  //   if (/\D/gi.test(req.params.book_id)) return res.status(202).send("BookID must be an integer only!")

  //   const book = await pool.query(`SELECT * FROM books WHERE book_id = '${req.params.book_id}'`)

  //   if (book.rows.length > 0) {
  //     const resultISBN = book.rows[0].isbn;
  //     const comment_list = await pool.query(`SELECT u.userID, u.firstname, u.lastname, u.email, r.rating, r.comment, r.book_id, r.review_id
  //                                             FROM reviews r 
  //                                             JOIN users u 
  //                                             ON u.userID = r.user_id 
  //                                             WHERE book_id = '${req.params.book_id}'`);
    
  //     fetch(`https://www.goodreads.com/book/review_counts.json?isbns=${resultISBN}&key=${apiKey}`)
  //       .then(response => response.json())
  //       .then(result => res.status(200).send({result: result, comment_list: comment_list.rows, bookInfo: book.rows[0]}))
  //       .catch(err => res.send(err))
  //   } else {
  //     res.status(202).send("Book not found!")
  //   }
  // })

  
  app.get('/details', (req, res, next) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  })
}

const router = require("./routes/router");
// we're using the router middleware!
app.use(router);


const server = http.createServer(app);

// make the server listen to requests
server.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));

