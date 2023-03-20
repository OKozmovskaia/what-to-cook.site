const mongoose = require("mongoose");
const connection = require("../database");

const session = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  lastVisit: {
    type: Date,
    required: true,
    index: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
    unique: true,
  },
});

session.path("lastVisit").index({ expires: "1d" });
const Session = connection.model("session", session);
module.exports = Session;
