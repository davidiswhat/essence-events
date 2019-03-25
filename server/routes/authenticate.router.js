var express = require('express'), 
    router = express.Router();
    User = require('../models/account.model');

//GET route for reading data
router.route('/')
  .get(function (req, res) {
    console.log("This is the user's request:")
    console.log(req.session.userId);
    res.status(200).send("");
  });

//POST route for updating data
router.route('/')
  .post(function (req, res, next) {
    //This makes sure the passwords match
    if (req.body.password !== req.body.passwordConf) {
      res.status(400).json({"error": "Passwords do not match."});
      return;
    }
  
    if (req.body.email &&
      req.body.password &&
      req.body.passwordConf) {
  
      var userData = {
        email: req.body.email,
        password: req.body.password,
      }
      User.create(userData, function (error, user) {
        if (error) {
          res.status(400).send(error);
        } else {
          req.session.userId = user._id;
          res.json(user);
          //return res.redirect('/profile'); //This needs to change??
        }
      });
  
    } else if (req.body.logemail && req.body.logpassword) {
      User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
        if (error || !user) {
          var err = new Error('Wrong email or password.');
          err.status = 401;
          return next(err);
        } else {
          req.session.userId = user._id;
          return res.redirect('/AccountManagement.html');
        }
      });
    } else {
      var err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }
  })
  
  module.exports = router;