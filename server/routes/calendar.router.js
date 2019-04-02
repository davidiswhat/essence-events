var express = require('express'), 
    router = express.Router();
    Appointment = require('../models/appointment.model');
    User = require('../models/account.model');

//request an appointment
router.route('/request')
  .post(function (req, res, next) {
    if (req.session.userId) {
      if (req.body.start && req.body.stop) {
        var apptData = {
            user: req.session.userId,
            start: req.body.start,
            stop: req.body.stop,
            approved : false
        }
        Appointment.create(apptData, function(error, appt) {
            if (error) {
                res.status(400).send(error);
            } else {
                res.json(appt);
            }
            next();
        });
      }
      else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
      }
    }
    else {
      res.redirect('../LogIn.html');
      next();
    }
  });

//approve an appointment
router.route('/approve')
  .post(function (req, res, next) {
    if (req.session.userId) {
        // find the account
        User.findById(req.session.userId).exec(function(err, user) {
            if(err) {
                console.log("USER NOT FOUND")
                res.status(400).send(err);
            } else {
                //find the appointment
                if (user.is_admin) {
                    Appointment.findOneAndUpdate({start: req.body.start}, {stop: req.body.code}, {approved: true}, function(err, appt) {
                        if (err) throw err;
                        console.log(appt)
                    });
                }
            }
          });
    }
    else {
      res.redirect('../LogIn.html');
      next();
    }
  })

  module.exports = router;