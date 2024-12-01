var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productDetailsRoute = require("./routes/products");
var newRoutes = require("./routes/new");
var productRoutes = require("./routes/productList");
var apiProductsRouter = require("./routes/api/products");

var app = express();
const sqlite3 = require("sqlite3").verbose();

// Setup SQLite database
const dbFile = path.resolve(process.cwd(), "./db/product-manager.db");
const db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error("Database error:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Define your routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productDetailsRoute);
app.use("/admin/products/new", newRoutes);
app.use("/admin/products", productRoutes);
app.use("/api/products", apiProductsRouter);

// Catch 404 errors and forward them to the error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
