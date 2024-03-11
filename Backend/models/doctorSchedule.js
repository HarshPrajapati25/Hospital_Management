const mongoose = require("mongoose");

const doctorScheduleSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  schedule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Schedule",
    require: true,
  },
});

const DoctorSchedule = mongoose.model("DoctorSchedule", doctorScheduleSchema);
module.exports = DoctorSchedule;
