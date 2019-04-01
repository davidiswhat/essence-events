var express = require('express'), 
    router = express.Router();
    User = require('../models/account.model');

//GET route for reading data
router.route('/status')
  .get(function (req, res) {
    if (req.session.userId) {
      console.log("This is the user's request:")
      console.log(req.session.userId);
      res.status(200).send("Logged in.");
    }
    else {
      console.log("User is not logged in")
      res.status(401).send("User is not logged in.")
    }
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
      req.body.phoneNum &&
      req.body.fullName &&
      req.body.password &&
      req.body.passwordConf) {
  
      var userData = {
        email: req.body.email,
        password: req.body.password,
        phoneNum: req.body.phoneNum,
        fullName: req.body.fullName
      }
      User.create(userData, function (error, user) {
        if (error) {
          console.log(error);
          res.status(400).json({"error": "Email already in use."});
        } else {
          req.session.userId = user._id;
          res.json(user);
          //return res.redirect('/profile'); //This needs to change??
        }
      });
  
    } else if (req.body.logemail && req.body.logpassword) {
      User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
        if (error || !user) {
          res.status(400).json({"error": "Wrong email or password."});
        } else {
          req.session.userId = user._id;
          return res.redirect('/AccountManagement.html');
        }
      });
    } else {
      res.status(400).json({"error": "Please fill out all fields."});
    }
  })
  
  module.exports = router;