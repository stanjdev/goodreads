const express = require('express');
const registerRouter = new express.Router();
const pool = require('../db');

/* REGISTER Page */


registerRouter.get('/', (req, res) => {
  /* if GET request, show the registration form. return '/register' */
  console.log('GET to register page!');
  res.redirect(200, '/');
})


// Validate and commit to database
registerRouter.post('/', (req, res, next) => {
  let values = [
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.password,
  ]
  
  const sql = `SELECT * FROM users WHERE email = '${values[2]}'`
  pool.query(sql, (q_err, q_res) => {
    if (q_err) next(q_err);
    console.log(q_res.rows);
    if (q_res.rows.length >= 1) {
      res.status(202).send("Email already registered!")
    } else {
      pool.query(`INSERT INTO users(firstName, lastName, email, password)
                VALUES($1, $2, $3, $4)
                ON CONFLICT DO NOTHING`, values,
        (q_err, q_res) => {
          if (q_err) next(q_err); 
          console.log('Registration successful.')
          res.status(200).send('Registration successful!') // But, it sends the info in the res... confidential password...
      })
    }
  });


  // Optional form validation, but 'required' on each input seems to get it done.
  /* if email already registered, or pw validation:
  elif db.execute("SELECT * FROM users WHERE email LIKE :email", {"email": request.form.get("email")}).fetchone():
            return render_template("error.html", message="Email already registered.")
  elif not request.form.get("password") or not request.form.get("password_again"):
            return render_template("error.html", message="Must provide password.")
  elif request.form.get("password") != request.form.get("password_again"):
            return render_template("error.html", message="Passwords do not match.")
  */
 
  
              
  // return await res.redirect('/login');
  
  // ELSE - assign those inputted values into variables first_name, last_name, email, password
    // - try(to commit to database) and catch(the error page)
    /* 
      try:
          db.execute("INSERT INTO users (firstname, lastname, email, password) VALUES (:firstname, :lastname, :email, :password)",
          {"firstname": first_name, "lastname": last_name, "email": email, "password": generate_password_hash(password) })
      except Exception as e: 
          return render_template("error.html", message=e)
    */

  // commit to db, flash "You successfully registered! Now you can log in." Redirect to login page. 

  // return res.send(200, '/login');
  // res.status(200).send("/login");
})

module.exports = registerRouter;