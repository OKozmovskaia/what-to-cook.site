const mongoose = require("mongoose");
const connection = require("../database");

const productSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
    unique: true,
  },
  productList: [
    {
      title: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
      },
      checked: {
        type: Boolean,
      },
      groupTitle: {
        type: String,
      },
    },
  ],
});

const Product = connection.model("product", productSchema);
module.exports = Product;
