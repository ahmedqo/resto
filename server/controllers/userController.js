const User = require("../models/userModel");
const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
const sendToken = require("../utils/sendToken");
const ErrorHandler = require("../utils/errorHandler");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// Register User
exports.registerUser = asyncErrorHandler(async(req, res) => {
    const { username, email, phone, password } = req.body;

    if (!username || !email || !phone || !password) {
        return next(new ErrorHandler("Tous les champs sont requis", 400));
    }

    const user = await User.create({
        username,
        email,
        phone,
        password,
    });

    sendToken(user, 201, res);
});

// Login User
exports.loginUser = asyncErrorHandler(async(req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return next(new ErrorHandler("Tous les champs sont requis", 400));
    }

    const user = await User.findOne({ username }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Nom d'utilisateur invalide", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Mot de passe invalide", 401));
    }

    sendToken(user, 201, res);
});

// Logout User
exports.logoutUser = asyncErrorHandler(async(req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});

// Get User Details
exports.getUserDetails = asyncErrorHandler(async(req, res) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
});

// Forgot Password
exports.forgotPassword = asyncErrorHandler(async(req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("User Not Found", 404));
    }

    const resetToken = await user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const link = `https://${req.get("host")}/reset-password/${resetToken}`;

    try {
        await sendEmail({
            email: user.email,
            sub: "Réinitialiser le mot de passe",
            path: "template/reset.mail",
            data: {
                name: user.username,
                link: link,
            },
        });

        res.status(200).json({
            success: true,
            message: `E-mail envoyé à ${user.email} avec succès`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }
});

// Reset Password
exports.resetPassword = asyncErrorHandler(async(req, res, next) => {
    // create hash token
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(new ErrorHandler("Jeton de mot de passe de réinitialisation invalide", 404));
    }

    user.password = req.body.new;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user, 200, res);
});

// Update Password
exports.updatePassword = asyncErrorHandler(async(req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.old);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("L'ancien mot de passe est invalide", 400));
    }

    user.password = req.body.new;
    await user.save();
    sendToken(user, 201, res);
});

// Update User Profile
exports.updateProfile = asyncErrorHandler(async(req, res) => {
    const newUserData = {
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
    };

    await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: true,
    });

    res.status(200).json({
        success: true,
    });
});

// Get All User Details --ADMIN
exports.getAllUsers = asyncErrorHandler(async(req, res) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    });
});

// Get Single User Details --ADMIN
exports.getSingleUser = asyncErrorHandler(async(req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User doesn't exist with id: ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        user,
    });
});

// Update User Role --ADMIN
exports.updateUserRole = asyncErrorHandler(async(req, res) => {
    const newUserData = {
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        role: req.body.role,
    };

    await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});

// Delete Role --ADMIN
exports.deleteUser = asyncErrorHandler(async(req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User doesn't exist with id: ${req.params.id}`, 404));
    }

    await user.remove();

    res.status(200).json({
        success: true,
    });
});