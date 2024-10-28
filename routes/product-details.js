// routes/product-details.js

const express = require("express");
const router = express.Router();
const { getRandomProduct } = require("./product-details");
// Route to handle dynamic product details by color
router.get("/:color", (req, res) => {
  const { color } = req.params;

  // Here, use the color parameter to fetch specific product details from the database
  // For example, using sample data based on color
  const products = {
    "black-tshirt": {
      name: "Black T-Shirt",
      price: "199kr",
      brand: "Levis",
      color: "Rlack",
      ImageUrl: "/images/black-Tshirt.png",
    },
    "red-tshirt": {
      name: "Red T-Shirt",
      price: "300kr",
      brand: "Levis",
      color: "Red",
      ImageUrl: "/images/red-Tshirt.png",
    },
  };

  function getRandomProduct() {
    const keys = Object.keys(products);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return products[randomKey];
  }

  const product = products[`${color}-tshirt`];
  const randomProducts = Array.from({ length: 3 }, getRandomProduct);
  if (product) {
    res.render("product-details", { product, randomProducts });
  } else {
    res.status(404).send("Product not found");
  }
});

module.exports = router;
