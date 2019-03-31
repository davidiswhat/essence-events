var mongoose = require('mongoose');

var appointmentSchema = new mongoose.Schema({
  start: {
        type: Date, 
        required: true
  },
	stop: {
        type: Date, 
        required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true
  },
  approved: {
    type: Boolean,
    required: true,
  }
});

var Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;