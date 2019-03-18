var express = require('express'), 
    router = express.Router();
    User = require('../models/user');

//GET route for reading data
router.get('/', function (req, res, next) {
    return res.sendFile(path.join(__dirname + '/templateLogReg/index.html')); //Change this possibly?
  });

//POST route for updating data
router.post('/', function (req, res, next) {
    //This makes sure the passwords match
    if (req.body.password !== req.body.passwordConf) {
      var err = new Error('Passwords do not match.');
      err.status = 400;
      res.send("passwords don't match");
      return next(err);
    }
  
    if (req.body.email &&
      req.body.username &&
      req.body.password &&
      req.body.passwordConf) {
  
      var userData = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      }
  
      User.create(userData, function (error, user) {
        if (error) {
          return next(error);
        } else {
          req.session.userId = user._id;
          return res.redirect('/profile'); //This needs to change??
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
          return res.redirect('/profile');
        }
      });
    } else {
      var err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }
  })
  