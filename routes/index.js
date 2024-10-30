var express = require("express");
var router = express.Router();
const sqlite3 = require("sqlite3").verbose();
var path = require("path");

const dbfile = path.resolve(process.cwd(), "./db/product-manager.db");

const db = new sqlite3.Database(dbfile, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log("Connected to the SQLite database.");
});

router.get("/", function (req, res, next) {
  const sql = "SELECT * FROM products"; // Define your SQL query here

  db.all(sql, [], (err, products) => {
    if (err) {
      console.error("Error retrieving products:", err.message);
      return res.status(500).send("Database error");
    }

    res.render("index", {
      title: "Freaky Fashion",
      products: products,
    });
  });
});

module.exports = router;
