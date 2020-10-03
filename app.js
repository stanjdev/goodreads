// import express (after npm install express)
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// import { match, RouterContext } from 'react-router';


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

