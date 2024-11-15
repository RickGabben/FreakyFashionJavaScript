const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Set up the SQLite database connection
const dbfile = path.resolve(process.cwd(), "./db/product-manager.db");
const db = new sqlite3.Database(dbfile, sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message);
});

// Function to get random products from the database, excluding the specified product
const getRandomProducts = (count, excludedName, callback) => {
  const sql =
    "SELECT * FROM products WHERE name != ? ORDER BY RANDOM() LIMIT ?";
  db.all(sql, [excludedName, count], (err, rows) => {
    if (err) {
      console.error(err);
      callback([]);
    } else {
      callback(rows);
    }
  });
};

// GET product details route
// GET /products/:name
router.get("/:name", function (req, res) {
  const { name } = req.params; // e.g., "Black-Tshirt"

  // Query to get the product details from the database
  db.get(
    "SELECT * FROM products WHERE name = ?",
    [name],
    function (err, productDetails) {
      if (err) {
        return res.status(500).send("Database error");
      }

      if (productDetails) {
        // Fetch random products, excluding the current product
        getRandomProducts(3, name, (randomProducts) => {
          res.render("products", {
            title: productDetails.name,
            product: productDetails,
            randomProducts, // Pass random products to the view
          });
        });
      } else {
        res.status(404).send("Product not found");
      }
    }
  );
});

module.exports = router;
