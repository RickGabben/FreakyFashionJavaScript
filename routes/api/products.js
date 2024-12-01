const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Set up the database
const dbFile = path.resolve(process.cwd(), "./db/product-manager.db");

const db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error("Database error:", err.message);
  }
});

// GET all products
router.get("/", (req, res) => {
  const query = "SELECT name, price, SKU FROM products"; // Only select name, price, and SKU

  // const select = db.prepare(query);

  // const rows = select.all();

  // res.json(rows);

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows); // Send selected fields of products in JSON format
  });
});

// POST a new product
router.post("/", (req, res) => {
  let { namn, beskrivning, pris, SKU, brand, bild } = req.body;
  console.log(req.body);
  // Insert the product into the database
  db.run(
    `INSERT INTO products (name, brand, price, image, description, SKU)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [namn, brand, pris, bild, beskrivning, SKU],
    function (err) {
      if (err) {
        console.error("Database insertion error:", err.message);
        return res.status(500).json({ message: "Failed to add product." });
      }
      res.redirect("/admin/products");
    }
  );
});

module.exports = router;
