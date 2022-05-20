const Cuisine = require("../models/cuisineModel");
const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
const ErrorHandler = require("../utils/errorHandler");

// Get All Cuisines ---Cuisine Sliders
exports.getCuisines = asyncErrorHandler(async(req, res, next) => {
    const cuisines = await Cuisine.find();

    res.status(200).json({
        success: true,
        cuisines,
    });
});

// Get Cuisine Details
exports.getCuisine = asyncErrorHandler(async(req, res, next) => {
    const cuisine = await Cuisine.findById(req.params.id);

    if (!cuisine) {
        return next(new ErrorHandler("Cuisine Not Found", 404));
    }

    res.status(200).json({
        success: true,
        cuisine,
    });
});

// Create Cuisine ---ADMIN
exports.createCuisine = asyncErrorHandler(async(req, res, next) => {
    const cuisine = await Cuisine.create(req.body);

    res.status(201).json({
        success: true,
        cuisine,
    });
});

// Update Cuisine ---ADMIN
exports.updateCuisine = asyncErrorHandler(async(req, res, next) => {
    let cuisine = await Cuisine.findById(req.params.id);

    if (!cuisine) {
        return next(new ErrorHandler("Cuisine Not Found", 404));
    }

    cuisine = await Cuisine.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(201).json({
        success: true,
        cuisine,
    });
});

// Delete Cuisine ---ADMIN
exports.deleteCuisine = asyncErrorHandler(async(req, res, next) => {
    const cuisine = await Cuisine.findById(req.params.id);

    if (!cuisine) {
        return next(new ErrorHandler("Cuisine Not Found", 404));
    }

    await cuisine.remove();

    res.status(201).json({
        success: true,
    });
});