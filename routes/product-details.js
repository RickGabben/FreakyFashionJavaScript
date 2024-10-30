const express = require("express");
const router = express.Router();
const products = require("./data"); // Adjust path if necessary

// Function to get random products, including duplicates
const getRandomProducts = (count) => {
  const randomProducts = [];
  for (let i = 0; i < count; i++) {
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    randomProducts.push(randomProduct);
  }
  return randomProducts;
};

// GET product details route
router.get("/:color", function (req, res) {
  const { color } = req.params;

  // Find the corresponding product based on color
  const productDetails = products.find(
    (p) => p.color.toLowerCase() === color.toLowerCase()
  );

  if (productDetails) {
    const randomProducts = getRandomProducts(3); // Get 3 random products (including duplicates)

    res.render("product-details", {
      title: productDetails.name,
      product: productDetails,
      randomProducts, // Pass random products to the view
    });
  } else {
    res.status(404).send("Product not found");
  }
});

module.exports = router;
