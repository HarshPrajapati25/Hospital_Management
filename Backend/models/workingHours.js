const mongoose = require("mongoose");

const workingHoursSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    day: {
      type: Number, //0-6 for Sunday to Saturday
      min: 0,
      max: 6,
    },
    from: {
      type: String,
      format: "HH:mm",
    },
    to: {
      type: String,
      format: "HH:mm",
    },
    schedule_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "schedules",
    },
  },
  {
    timestamps: true,
  }
);

const WorkingHours = mongoose.model("WorkingHours", workingHoursSchema);
module.exports = WorkingHours;
