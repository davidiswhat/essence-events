var mongoose = require('mongoose');

var testimonalSchema = new mongoose.Schema({
   Name:{
       type: String,
       required: true
   },
   Details:{
       type: String,
       required: true
   },
   image_file: String

  });

var Testimonials = mongoose.model('Testimonials', testimonialSchema);
module.exports = Testimonials;