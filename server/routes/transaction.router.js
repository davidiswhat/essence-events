var express = require('express'), 
    router = express.Router(),
    User = require('../models/account.model'),
    Transaction = require("../models/transaction.model");

router.route("/")
    .post(function (req, res) {
        console.log(req.session.userId);
        if (req.session.userId) {
            if (req.body.amount) {
                Transaction.create({email: req.body.email, username: req.body.username, amount: req.body.amount, userId: req.session.userId}, function (error, trans) {
                    if (error) {
                        console.log(error);
                        res.status(400).json({"error": "Failed to create transaction"})
                    }
                });
            }
            else {

                console.log("Transaction amount required.");
                res.status(400).json({"error": "Transaction amount required."})
            }
        }
        else {
          res.status(401).send("User is not logged in.");
          console.log("User tried to pay charge, but user is not logged in.")
        }
    });
router.route("/delete")
    .post(function (req, res) {
        console.log("adjustment", req.body.adjustment)
        console.log("id", req.body.chargeid);
        if (req.session.userId) {
            User.findById(req.session.userId).exec(function(err, user) {
                if(err) {
                    console.log("UserId not recognized...")
                    res.status(400).send(err);
                }
                else if (user.isAdmin) { 
                    if (req.body.adjustment) {
                        User.findById(req.body.userid, function (err, user) {
                            user.balance = user.balance - req.body.adjustment;
                            user.save( function(err) { 
                                console.log(err);
                            });
                            if (err) console.log(err);
                        });

                    }

                    Transaction.findById(req.body.chargeid, function (err, trans) {
                        console.log(err);
                        console.log(trans);
                        trans.remove(function(err) {
                            if (err) throw err;
                        });
                        res.status(200).send();
                  });
                } else {
                    console.log("non-admin attempted to delete charge");
                    res.status(401).json({"error": "permission denied"});
                }
            });
            }
            else {
                res.status(401).send("User is not logged in.");
                console.log("tried to delete charge, but user not logged in")
            }
    });

router.route("/all")
    .get(function (req, res) {
        if (req.session.userId) {
        User.findById(req.session.userId).exec(function(err, user) {
            if(err) {
                console.log("UserId not recognized...")
                res.status(400).send(err);
            }
            else if (user.isAdmin) {
            Transaction.find({}, function(err, transactions) {
                if (err) {
                    console.log(err);
                    res.status(400).send(err);
                } else {
                    console.log(transactions);
                    res.send(transactions);
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
            console.log("tried to view charges account, but user not logged in")
        }
  });

  module.exports = router;