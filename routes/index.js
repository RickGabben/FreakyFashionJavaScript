var express = require("express");
var router = express.Router();
var products = require("../routes/data");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Express",

    products: products,
  });
});

module.exports = router;
