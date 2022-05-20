const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
const Order = require("../models/orderModel");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const sendEmail = require("../utils/sendEmail");

function setStatus(type) {
    let status;
    switch (type) {
        case -1:
            status = "Annulé";
            break;
        case 0:
            status = "En attente";
            break;
        case 1:
            status = "Confirmé";
            break;
        case 2:
            status = "Préparé";
            break;
        case 3:
            status = "Terminé";
            break;
        default:
            status = "En attente";
            break;
    }
    return status;
}

// Get Logged In User Orders
exports.myOrders = asyncErrorHandler(async(req, res, next) => {
    const orders = await Order.find({ user: req.user._id });

    if (!orders) {
        return next(new ErrorHandler("Commandes introuvable", 404));
    }

    res.status(200).json({
        success: true,
        orders,
    });
});

// Get All Orders ---ADMIN
exports.getOrders = asyncErrorHandler(async(req, res, next) => {
    const orders = await Order.find();

    if (!orders) {
        return next(new ErrorHandler("Commandes introuvable", 404));
    }

    let totalAmount = 0;
    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        orders,
        totalAmount,
    });
});

// Get Single Order Details
exports.getOrder = asyncErrorHandler(async(req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
        return next(new ErrorHandler("Commande introuvable", 404));
    }

    res.status(200).json({
        success: true,
        order,
    });
});

// Create New Order
exports.createOrder = asyncErrorHandler(async(req, res, next) => {
    const { shippingInfo, items, total } = req.body;
    const order = await Order.create({
        shippingInfo,
        items,
        total,
        user: req.user._id,
    });

    await sendEmail({
        email: req.user.email,
        sub: "commande " + order._id + " passée avec succès",
        path: "template/order.mail",
        data: {
            order: order._id,
            total: total,
            address: shippingInfo.address,
            comment: shippingInfo.comment,
            type: shippingInfo.type,
            items: items,
        },
    });

    res.status(201).json({
        success: true,
        order,
    });
});

// Update Order Status ---ADMIN
exports.updateOrder = asyncErrorHandler(async(req, res, next) => {
    let order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Commande introuvable", 404));
    }

    if (req.body.status === 3) {
        order.deliveredAt = Date.now();
    }

    order = await Order.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    const user = await User.findById(order.user);

    await sendEmail({
        email: user.email,
        sub: "Commande " + order._id + " est " + setStatus(req.body.status),
        path: "template/status.mail",
        data: {
            order: order._id,
            name: user.username,
            status: setStatus(req.body.status),
        },
    });

    res.status(200).json({
        success: true,
        order,
    });
});

// Delete Order ---ADMIN
exports.deleteOrder = asyncErrorHandler(async(req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Commande introuvable", 404));
    }

    await order.remove();

    res.status(200).json({
        success: true,
    });
});