const express = require("express");
const router = express.Router();
const pool = require('../db');


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



router.get("/", (req, res) => {
  res.send({ response: "Server up and running from the root! Message from router.js" }).status(200);
});



// app.route or app.get for the '/logout'. clear the session. say "You have successfully logged out. Thanks for visiting!" redirect to "/" page - or just use flash message and redirect user to home page



/* Optionally create My app's API that returns a JSON object of the book's info -- already set up in details page?? */



module.exports = router;


