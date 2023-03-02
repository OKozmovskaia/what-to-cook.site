const mongoose = require("mongoose");
const config = require("config");

module.exports = mongoose.createConnection(config.get("mongodb.uri"));
