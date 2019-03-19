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

var Appointments = mongoose.model('Appointments', appointmentSchema);
module.exports = Appointments;