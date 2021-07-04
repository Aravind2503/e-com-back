const router = require("express").Router();

router.get("/insert", (req, res) => {
    res.send(`<!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Node js Express Multiple Image Upload using Multer Example - ItSolutionStuff.com</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    
        <style>
          input{
            padding:10px;
            margin:5px;
          }
          form{
          
            justify-content: center;
            align-items: center;
          }
        </style>
      </head>
      <body>
          <form action="http://localhost:9001/products/insert" method="post" enctype="multipart/form-data">
            product name <input type="text" name = "name" id="product_name"/><br>
            description <input type="text" name = "description" id="description"/><br>
            price <input type="number" name = "price" id="price"/><br>
            brand <input type="text" name = "brand" id="brand"/><br>
            manufacturer <input type="text" name = "manufacturer" id="manufacturer"/><br>
            category <input type="text" name = "category" id="category"/><br>
            country <input type="text" name = "country" id="country"/><br>
            <input type="file" name="images" value="uploading_img" multiple>
            <input type="submit" value="uploading_img">
          </form>
    
        </form>
      </body>
    </html>`);
});

module.exports = router;
