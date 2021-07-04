const Order = require("../models/order");
const auth = require("../middleware/auth");
const router = require("express").Router();

router.get("/order", auth, async (req, res) => {
    try {
        const { email } = req.user;

        const order = await Order.findOne({ email });

        if (!order) {
            const newOrder = new Order({ email });
            await newOrder.save();
            console.log(
                "CREATED NEW ORDER HISTORY FOR",
                email,
                newOrder.history
            );
            return res.status(200).json(newOrder.history);
        }

        console.log("ORDER HISTORY OF", email, order.history);
        return res.status(200).json(order.history);
    } catch (err) {
        console.log(err.message);
    }
});

router.post("/order", auth, async (req, res) => {
    const { email } = req.user;

    const newOrderHistory = req.body.history;
    let order = await Order.findOne({ email });
    console.log("Order", order);
    if (!order) {
        order = new Order({ email });
        await order.save();
    }

    if (order) {
        console.log("IN ORDER POST", newOrderHistory);
        if (order.history) order.history.unshift({ products: newOrderHistory });
        else order.history = [{ products: newOrderHistory }];
        await order.save();
    }
});

module.exports = router;
