
/* Dependencies */
var mongoose = require('mongoose'), 
    Listing = require('../models/listings.server.model.js');

/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update listings.
  On an error you should send a 404 status code, as well as the error message. 
  On success (aka no error), you should send the listing(s) as JSON in the response.

  HINT: if you are struggling with implementing these functions, refer back to this tutorial 
  from assignment 3 https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
 */

/* Create a listing */
exports.create = function(req, res) {

  /* Instantiate a Listing */
  var listing = new Listing(req.body);

  /* Then save the listing */
  listing.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(listing);
    }
  });
};

/* Show the current listing */
exports.read = function(req, res) {
  /* send back the listing as json from the request */
  res.json(req.listing);
};

/* Update a listing */
exports.update = function(req, res) {
  //console.log("trying to update");
  //console.log(req.listing);
  //console.log(req.body);
  var listing = new Listing(req.listing);
  listing.code = req.body.code;
  listing.name = req.body.name;
  listing.address = req.body.address;
  listing.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(listing);
    }
  });
  /*
  Listing.findByIdAndUpdate(req.listing._id, {$set:req.body}, function(err, inner_listing) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      console.log("updated");
      console.log(inner_listing);
      res.status(200).send(inner_listing);
    }
  });*/

    /* Replace the article's properties with the new properties found in req.body */
    /* Save the article */
};

/* Delete a listing */
exports.delete = function(req, res) {
  var listing = req.listing;

  listing.remove(function(err) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      console.log("Deleted listing");
      res.status(200).send("ok");
    }
  });

};

/* Retreive all the directory listings, sorted alphabetically by listing code */
exports.list = function(req, res) {
  Listing.find({}).sort('code').exec(function(err, listings) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      //console.log("all listings");
      res.send(listings);
    }
  });
  /** TODO **/
  /* Your code here */
};

/* 
  Middleware: find a listing by its ID, then pass it to the next request handler. 

  Find the listing using a mongoose query, 
        bind it to the request object as the property 'listing', 
        then finally call next
 */
exports.listingByID = function(req, res, next, id) {
  Listing.findById(id).exec(function(err, listing) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.listing = listing;
      next();
    }
  });
};