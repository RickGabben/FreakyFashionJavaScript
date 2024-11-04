const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(
  "../product-manager.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) return console.error(err.message);
  }
);

let sql = `
  ALTER TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    brand TEXT,
    price TEXT,
    color TEXT,
    image TEXT
    description TEXT
  );
`;

db.run(sql);
