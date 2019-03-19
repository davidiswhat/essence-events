var mongoose = require('mongoose');

var calendarSchema = new mongoose.Schema({
    available: [ObjectID]
	claimed: [ObjectID],
	Confirmed: [ObjectID]

   
  });
  
var Calendar = mongoose.model('Calendar', calendarSchema);
module.exports = Calendar;