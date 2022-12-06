const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const productRoutes = require("./routes/productRoutes");
const productModel = require("./model/productsSchema");

const app = express();

if (process.env.NODE_ENV != "PRODUCTION") {
  require("dotenv").config({ path: "src/config/.env" });
}

// use app
app.use(express.json());
app.use(bodyParser.json());

// set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// home page
app.get("/", (req, res) => {
  res.render("index", {
    title: "Nimap Infotech",
    products: null,
  });
});

//  PRODUCT LIST
app.get("/products", (req, res) => {
  productModel.find({}, function (err, products) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", {
        title: "Nimap Infotech - product list",
        products,
      });
    }
  });
});

// routes
app.use("/api", productRoutes);

// and lastly export app
module.exports = app;
