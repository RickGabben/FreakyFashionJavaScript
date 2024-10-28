var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  const colors = [
    "black",
    "red",
    "red",
    "black",
    "red",
    "red",
    "black",
    "black",
  ];

  const tshirt = Array.from({ length: 8 }, (_, i) => ({
    imageUrl: `/images/${colors[i]}-Tshirt.png`, // Use colors[i] instead of colors
    name: "T-Shirt",
    price: "199kr",
    brand: "Levis",
    color: colors[i],
  }));
  res.render("index", {
    title: "Express",

    tshirt: tshirt,
  });
});

module.exports = router;
