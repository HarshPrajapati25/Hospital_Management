const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  schedule_name: {
    type: String,
  },
  interval: {
    type: Number, //minutes
  },
  duration: {
    type: Number, //minutes
  },
  status: {
    type: Boolean,
  },
  book_from: {
    type: Number,
  },
  book_to: {
    type: Number,
  },
},
{
  timestamps: true,
});

const Schedule = mongoose.model(" Schedule", scheduleSchema);
module.exports = Schedule;
