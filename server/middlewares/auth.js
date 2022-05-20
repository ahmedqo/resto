const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const asyncErrorHandler = require("./asyncErrorHandler");

exports.isAuthenticatedUser = asyncErrorHandler(async(req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler("Veuillez vous connecter pour accéder", 401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
});

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler("Vous n'êtes pas autorisé", 403));
        }
        next();
    };
};