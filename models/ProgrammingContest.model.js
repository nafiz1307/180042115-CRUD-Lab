const mongoose = require("mongoose");
const PCschema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
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
  date: {
    type: Date,
    default: Date.now,
  },
  coachName: {
    type: String,
    required: true,
  },
  coachContact: {
    type: String,
    required: true,
  },
  coachEmail: {
    type: String,
    required: true,
  },
  coachTshirt: {
    type: String,
    required: true,
  },
  m_name0: {
    type: String,
    required: true,
  },
  m_email0: {
    type: String,
    required: true,
  },
  m_contact0: {
    type: String,
    required: true,
  },
  m_tshirt0: {
    type: String,
    required: true,
  },
  m_name1: {
    type: String,
    required: true,
  },
  m_email1: {
    type: String,
    required: true,
  },
  m_contact1: {
    type: String,
    required: true,
  },
  m_tshirt1: {
    type: String,
    required: true,
  },
  m_name2: {
    type: String,
    required: true,
  },
  m_email2: {
    type: String,
    required: true,
  },
  m_contact2: {
    type: String,
    required: true,
  },
  m_tshirt2: {
    type: String,
    required: true,
  },
  confirmationCode: {
    type: String,
    unique: true,
  },
  verified: {
    type: Boolean,
    required: true,
  },
});

const ProgrammingContest = mongoose.model("ProgrammingContest", PCschema);
module.exports = ProgrammingContest;
