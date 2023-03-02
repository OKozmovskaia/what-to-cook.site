const mongoose = require("mongoose");
const connection = require("../database");

const session = new mongoose.Schema({
  token: {
    type: String,
    unique: true,
    required: true,
  },
  lastVisit: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
});

session.path("lastVisit").index({ expires: "7d" });
const Session = connection.model("session", session);
module.exports = Session;
