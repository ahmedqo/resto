const Product = require("../models/productModel");
const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary");

// Get All Products ---Product Sliders
exports.getProducts = asyncErrorHandler(async(req, res, next) => {
    const products = await Product.find();

    res.status(200).json({
        success: true,
        products,
    });
});

// Get Product Details
exports.getProduct = asyncErrorHandler(async(req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    res.status(200).json({
        success: true,
        product,
    });
});

// Create Product ---ADMIN
exports.createProduct = asyncErrorHandler(async(req, res, next) => {
    let images = [];
    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    const imagesLink = [];

    for (let i = 0; i < images.length; i++) {
        imagesLink.push({
            type: "primary",
            url: images[i],
        });
    }

    req.body.images = imagesLink;

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product,
    });
});

// Update Product ---ADMIN
exports.updateProduct = asyncErrorHandler(async(req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    let images = [];
    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    const imagesLink = [];

    for (let i = 0; i < images.length; i++) {
        imagesLink.push({
            type: "primary",
            url: images[i],
        });
    }

    req.body.images = imagesLink;

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(201).json({
        success: true,
        product,
    });
});

// Delete Product ---ADMIN
exports.deleteProduct = asyncErrorHandler(async(req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    await product.remove();

    res.status(201).json({
        success: true,
    });
});