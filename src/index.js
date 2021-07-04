const express = require("express");
require("./db/connect");
const userRoute = require("./routers/user");
const productRoute = require("./routers/product");
const cartRoute = require("./routers/cart");
const insertRoute = require("./routers/insert");
const orderRoute = require("./routers/order");
const cors = require("cors");

app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(insertRoute);
app.use(userRoute);
app.use(productRoute);
app.use(cartRoute);
app.use(orderRoute);

port = process.env.PORT;

app.listen(port, () => {
    console.log("server up on port ", port);
});
