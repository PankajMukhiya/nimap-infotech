const express = require("express");
const {
  createProduct,
  getProducts,
  getProductDetails,
  updateProduct,
  deleteProduct,
} = require("../controllers/productControllers");

const router = express.Router();

// CREATE PRODUCT
router.route("/product/new").post(createProduct);

// GET PRODUCTS
router.route("/products").get(getProducts);

// UPDATE DELETE PRODUCTS
router
  .route("/product/:id")
  .get(getProductDetails)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
