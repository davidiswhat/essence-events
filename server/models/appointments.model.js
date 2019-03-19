var mongoose = require('mongoose');

var appointmentSchema = new mongoose.Schema({
    start: {
        type: Date, 
        required: true
    },
	stop: {
        type: Date, 
        required: true
    }

  });