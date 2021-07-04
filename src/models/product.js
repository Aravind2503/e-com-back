const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    brand: {
        type: String,
        trim: true,
        required: true,
    },
    manufacturer: {
        type: String,
        trim: true,
        required: true,
    },
    country: {
        type: String,
        trim: true,
        required: true,
    },
    category: {
        type: String,
        trim: true,
        required: true,
    },
    subcategory: {
        type: String,
        trim: true,
        required: true,
    },
    size: {
        type: String,
        trim: true,
        // required: true,
        default: "",
    },
    colour: {
        type: String,
        trim: true,
        // required: true,
        default: "",
    },
    images: [String],
});

const Product = mongoose.model("Product", productSchema);

module.exports = { Product, productSchema };
