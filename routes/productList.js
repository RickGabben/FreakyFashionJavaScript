const express = require("express");
const router = express.Router();

// GET route to render the new product form
router.get("/", function (req, res) {
  res.render("admin/products", { title: "Add New Product" });
});

module.exports = router;
