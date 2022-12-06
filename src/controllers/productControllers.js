const catchAsyncError = require("../middlewares/catchAsyncError");
const productModel = require("../model/productsSchema");

// CREATE PRODUCT
exports.createProduct = catchAsyncError(async (req, res, next) => {
  const newProduct = await productModel.create(req.body);

  res.status(201).json({
    success: true,
    newProduct,
  });
  console.log("New Product Created...");
});

// GET PRODUCTS WITH FILTER OR PAGINATION
exports.getProducts = catchAsyncError(async (req, res, next) => {
  // FOR PAGINATION
  let currentPage = Number(req.query.page) || 1;
  const resultPerPage = 10;
  let skipedProduct = resultPerPage * (currentPage - 1);

  const productCount = await productModel.countDocuments();
  const products = await productModel
    .find()
    .skip(skipedProduct)
    .limit(resultPerPage);

  res.status(200).json({
    success: true,
    productCount,
    resultPerPage,
    products,
  });
  console.log("All Products Fetched...");
});

// GET SINGLE PRODUCT DETAILS
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  const product = await productModel.findById(req.params.id);

  if (!product) {
    return res
      .status(500)
      .json({ success: false, message: "Product not found with this id..." });
  }

  res.status(200).json({
    success: true,
    product,
  });
  console.log("Single Product Fetched...");
});

// UPDATE PRODUCT
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await productModel.findById(req.params.id);
  console.log(product);
  if (!product) {
    return res
      .status(500)
      .json({ success: false, message: "Product not found with this id..." });
  }

  product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(202).json({
    success: true,
    message: "Product Updated...",
  });
  console.log(product);
  console.log("Product Updated...");
});

// DELETE PRODUCT
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await productModel.findById(req.params.id);

  if (!product) {
    return res
      .status(500)
      .json({ success: false, message: "Product not found with this id..." });
  }

  await product.remove();
  res.status(200).json({
    success: true,
    message: "Product Deleted...",
  });
  console.log("Product Deleted...");
});
