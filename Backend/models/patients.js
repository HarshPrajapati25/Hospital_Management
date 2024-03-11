const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  phone_num: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  address: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
},
{
  timestamps: true,
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
