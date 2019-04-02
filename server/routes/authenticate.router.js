var express = require('express'), 
    router = express.Router();
    User = require('../models/account.model');

var admin = {
  email: "admin",
  password: "password123",
  phoneNum: "admin",
  fullName: "admin",
  isAdmin: true
}

User.create(admin, function (error, user) {
      if (error) {
        User.findOneAndUpdate({"email": "admin"}, {"isAdmin": true}, function(err, user) {
          if (err) {
            console.log(err);
          }
        });
      } else {
        console.log("created account");
        console.log(user);
      }
});

//GET route for reading data
router.route('/status')
  .get(function (req, res) {
    if (req.session.userId) {
      console.log("This is the user's request:")
      console.log(req.session.userId);
      res.status(200).send("Logged in.");
    }
    else {
      console.log("User is not logged in");
      res.status(401).send("User is not logged in.");
    }
  });

router.route('/delete')
  .post(function (req, res) {
    console.log("userid: ", req.body.userid);
    if (req.session.userId) {
      User.findById(req.session.userId).exec(function(err, user) {
        if(err) {
          console.log("UserId not recognized...")
          res.status(400).send(err);
        } else {
          if (user.isAdmin) {
            console.log("admin deleted account")
            User.findById(req.body.userid, function (err, user) {
              console.log(user);
              user.remove(function(err) {
                if (err) throw err;
              });
              res.status(200).send();
              if (err) console.log(err);
            });
          } else if (req.body.userid === req.session.userId) {
            console.log("user deleted their own account")
            User.findById(req.body.userid, function (err, user) {
              console.log(user);
              user.remove(function(err) {
                if (err) throw err;
              });
              req.session.userId = null;
              res.status(200).send();
              if (err) console.log(err);
            });
          }
          else {
            res.status(400).send();
          }
        }
      });
    }
    else {
      res.status(401).send("User is not logged in.");
      console.log("tried to delete account, but user not logged in")
    }
  });

router.route('/all')
  .get(function (req, res) {
    if (req.session.userId) {
      User.findById(req.session.userId).exec(function(err, user) {
        if(err) {
          console.log("UserId not recognized...")
          res.status(400).send(err);
        }
        else if (user.isAdmin) {
          User.find({}).sort('code').exec(function(err, users) {
            if (err) {
              console.log(err);
              res.status(400).send(err);
            } else {
              //console.log("all listings");
              res.send(users);
            }
          });
        } else {
          console.log("non-admin attempted to get accounts");
          res.status(401).json({"error": "permission denied"});

        }
      });
    }
    else {
      res.status(401).send("User is not logged in.");
      console.log("tried to delete account, but user not logged in")
    }
  })

router.route('/info')
  .get(function (req, res) {
    if (req.session.userId) {
      console.log("User requested info");
      User.findById(req.session.userId).exec(function(err, user) {
        if(err) {
          console.log("UserId not recognized...")
          res.status(400).send(err);
        } else {
          res.json(user);
        }
      });
    }
    else {
      console.log("User requested info, but is not logged in.");
      res.status(400).json({"error": "user is not logged in"});
    }
  })

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