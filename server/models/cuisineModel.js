const mongoose = require("mongoose");

const cuisineSchema = new mongoose.Schema({
    label: {
        type: String,
        required: [true, "Please Enter Label"],
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Cuisine", cuisineSchema);