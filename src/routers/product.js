const express = require("express");
const router = express.Router();
const { Product } = require("../models/product");
const multer = require("multer");
const sharp = require("sharp");

// router.post("/products", async (req, res) => {
//   const product = new Product(req.body);
//   console.log(req.body);

//   try {
//     await product.save();

//     res.status(201).send();
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

const upload = multer({
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error("Please upload an image"));
        }
        cb(undefined, true);
    },
});

// router.post(
//   "/product/images",
//   upload.single("images"),
//   async (req, res) => {
//     // req.user.avatar= req.file.buffer

//     const buffer = await sharp(req.file.buffer)
//       .resize({ width: 250, height: 250 })
//       .png()
//       .toBuffer();
//     // req.user.avatar = buffer;
//     console.log(buffer);

//     // await req.user.save();
//     res.send();
//   },
//   (error, req, res, next) => {
//     res.status(404).send({ error: error.message });
//   }
// );

router.post("/products/search", async (req, res) => {
    try {
        console.log("in product route search:", req.body);
        const obj = await Product.find(req.body);
        // console.log(
        //     "response from product route for query:",
        //     req.body,
        //     "is:\n",
        //     obj
        // );
        res.status(200).json(obj);
    } catch (error) {
        res.status(400).send(error);
    }
});

// //this one is for multiple images
// router.post(
//   "/products/images",
//   upload.array("images", 10),
//   async (req, res) => {
//     // req.user.avatar= req.file.buffer

//     // // const buffer = await sharp(req.file.buffer)
//     //   .resize({ width: 250, height: 250 })
//     //   .png()
//     //   .toBuffer();
//     // req.user.avatar = buffer;
//     console.log(req.files);

//     req.files.forEach((ele) => {
//       console.log(ele.buffer);
//     });

//     // await req.user.save();
//     res.send();
//   },
//   (error, req, res, next) => {
//     res.status(404).send({ error: error.message });
//   }
// );

//route that includes the images and the form data

router.post(
    "/products/insert",
    upload.array("images", 10),
    async (req, res) => {
        const data = req.body;

        const product = new Product(req.body);

        // console.log(req.body);

        // console.log(product);

        if (!req.files) {
            console.log("no files");
        } else {
            // req.files.forEach(async (ele, index) => {
            //   const buf = await sharp(ele.buffer).png().toBuffer();
            //   console.log(buf);
            //   product.images.push(buf);
            // });

            for (const file of req.files) {
                const buf = await sharp(file.buffer)
                    .resize({ width: 250, height: 250 })
                    .png()
                    .toBuffer();

                product.images.push(buf.toString("base64"));
                // product.images = product.images.concat({ buf });
            }
        }

        try {
            await product.save();

            res.status(201).send("ok");
        } catch (error) {
            console.log(error.message);
            res.status(400).send(error);
        }
    }
);

module.exports = router;
