const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  category: {
    type: String,
    require: [true, "Enter Product Name"],
    trim: true,
  },
  name: {
    type: String,
    require: [true, "Enter Product Name"],
    trim: true,
  },
  description: {
    type: String,
    require: [true, "Enter Product Description"],
    trim: true,
  },
  price: {
    type: Number,
    require: [true, "Enter Product Price"],
    trim: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const productModel = new mongoose.model("products", productSchema);
module.exports = productModel;
