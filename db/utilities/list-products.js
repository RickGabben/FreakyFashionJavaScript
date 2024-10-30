const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(
  "../product-manager.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) return console.error(err.message);
  }
);

const sql = `SELECT * FROM products`;

db.all(sql, [], function (err, rows) {
  rows.forEach((row) => {
    console.log(row.name);
  });
});
