const express = require('express');
const loginRouter = new express.Router();
const pool = require('../db');


/* LOGIN Page */

loginRouter.get('/', (req, res) => {
  /* - ELSE, if it were a "GET" request, redirect/refresh user to login page again */
  // res.render('login', function(err, html) {res.send(html)});
  // res.redirect(200, '/login');
  // res.sendFile(path.join(__dirname, "client", "build", "index.html"));
})

loginRouter.post('/', (req, res, next) => {
  /* Forget any Email session.clear() thing */
  let loginInfo = [
    req.body.email,
    req.body.password
  ]
  // console.log(loginInfo);
  pool.query(`SELECT * FROM users WHERE email=$1`, [loginInfo[0]],  (q_err, q_res) => {
    if (q_err) next(q_err);
    // console.log(q_res.rows[0]);
    if (q_res.rows.length < 1) {
      res.status(202).send("Email does not exist")
      return
    } else if (q_res.rows[0]){
      pool.query(`SELECT * FROM users WHERE password=$1`, [loginInfo[1]], (q_err, q_res) => {
        if (q_err) next(q_err);
        if (q_res.rows.length < 1) {
          res.status(202).send("Incorrect password")
          return 
        }
      })
    } else {
        return;
    }
  })

  pool.query(`SELECT * FROM users WHERE email=$1 AND password=$2`, [loginInfo[0], loginInfo[1]], (q_err, q_res) => {
    if (q_err) next(q_err);
    if (q_res.rows.length >= 1) {
      console.log("success!")
      res.status(200).send({message: "login successful!", firstname: q_res.rows[0].firstname, email: q_res.rows[0].email, userid: q_res.rows[0].userid})
    }
  })
});

/*
The POST route for /:
- Forget any Email session.clear() thing

- IF the method was a "POST", set variables for those input values for email and password

  - validate and throw errors if email and password were not set

  - Query database for email and password entered

  - if the email OR the password don't exist in the DB, throw errors

  - Remember which user was logged in via variables holding onto the queried email, queried firstname, queried password. Notification on the screen that says "you've successfully logged in!"

  - redirect you automatically to the search page

- ELSE, if it were a "GET" request, redirect/refresh user to login page again

*/


module.exports = loginRouter;