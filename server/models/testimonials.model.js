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