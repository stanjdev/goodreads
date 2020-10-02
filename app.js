// import express (after npm install express)
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

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

const router = require("./routes/router");
// we're using the router middleware!
app.use(router);


if (process.env.NODE_ENV === "production") {
  // serve static content(from when you run `npm run build`. aim for the index.html in your 'build' folder)
  app.use(express.static(path.join(__dirname, "client/build")));
  // app.use("/", express.static("./client/build"))

  router.get("/*", (req,res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  })
}



const server = http.createServer(app);

// make the server listen to requests
server.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));

