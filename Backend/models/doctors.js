const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  phone: {
    type: String,
    require: true,
  },
  address: {
    type: String,
  },
  speciality: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
    defaul: "",
  },
},
{
  timestamps: true,
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
