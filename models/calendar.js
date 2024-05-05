const mongoose = require('mongoose');

const calendarEventSchema = new mongoose.Schema({
 title:  String,
 date:  Date,
 time:  String,
 location:  String,
 description:  String
  
});

module.exports = mongoose.model('CalendarEvent', calendarEventSchema);