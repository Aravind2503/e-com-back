const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");

router.get("/cart", auth, async (req, res) => {
    const { email } = req.user;

    const cart = await Cart.findOne({
        email,
    });

    if (!cart) {
        const newCart = new Cart({
            email,
            products: {
                length: 0,
            },
        });
        await newCart.save();
        // console.log("created a new cart !", newCart);

        return res.status(200).json(newCart.products);
    }
    // console.log("in cart route", "cart", cart.products);

    res.status(200).json(cart.products);
});

router.patch("/cart", auth, async (req, res) => {
    const { email } = req.user;

    // console.log("PATCH:::::: in cart route req body");

    const cart = await Cart.findOne({
        email,
    });
    // console.log("in cart", "req body:", req.body);
    if (req.body) {
        cart.products = req.body.products;

        try {
            const updatedCart = await cart.save();
            res.status(200).json(updatedCart);
        } catch (err) {
            console.log(err.message);
            res.status(400).json({ message: err.message });
        }
    } else {
        // console.log("ERROR COULDN'T SAVE");
    }
});

module.exports = router;
