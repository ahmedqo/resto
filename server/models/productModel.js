const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Please enter product description"],
    },
    ingredients: [{
        type: String,
        required: true,
    }, ],
    price: {
        type: Number,
        required: [true, "Please enter product price"],
    },
    images: [{
        type: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    }, ],
    cuisine: {
        type: mongoose.Schema.ObjectId,
        ref: "Cuisine",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Product", productSchema);