const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        comment: {
            type: String,
        },
    },
    items: [{
        quantity: {
            type: Number,
            required: true,
        },
        product: {
            type: mongoose.Schema.ObjectId,
            ref: "Product",
            required: true,
        },
    }, ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    total: {
        type: Number,
        required: true,
        default: 0,
    },
    status: {
        type: Number,
        required: true,
        default: 0,
    },
    deliveredAt: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Order", orderSchema);