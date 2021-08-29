const mongoose = require("mongoose");
const MOschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: false,
  },
  institution: {
    type: String,
    required: false,
  },
  total: {
    type: Number,
    required: true,
  },
  paid: {
    type: Number,
    required: true,
  },
  selected: {
    type: Boolean,
    required: true,
  },
  tshirt: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  confirmationCode: {
    type: String,
    unique: true,
  },
});

const Matholympiad = mongoose.model("MathOlympiad", MOschema);
module.exports = Matholympiad;
