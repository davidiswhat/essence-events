var mongoose = require('mongoose');

var vendorSchema = new mongoose.Schema({
    author: {
        type: String, 
        required: true
    },
	statement: {
        type: String, 
        required: true
    },
	image_file: String

   
  });

var Vendors = mongoose.model('Vendors', vendorSchema);
module.exports = Vendors;