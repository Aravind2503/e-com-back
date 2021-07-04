const mongoose = require("mongoose");
const validator = require("validator");

const historySchema = new mongoose.Schema(
    {
        products: Object,
    },
    {
        timestamps: true,
    }
);

const orderSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        },
    },

    history: [historySchema],
});

const order = mongoose.model("Order", orderSchema);
module.exports = order;
