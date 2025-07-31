const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const csv = require("csv-parser");

const db = new sqlite3.Database("./db/ecommerce.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      title TEXT,
      description TEXT,
      price REAL,
      rating REAL,
      stock INTEGER,
      brand TEXT,
      category TEXT,
      thumbnail TEXT
    )
  `);

  const products = [];

  fs.createReadStream("./data/products.csv")
    .pipe(csv())
    .on("data", (row) => {
      products.push(row);
    })
    .on("end", () => {
      const stmt = db.prepare(`
        INSERT INTO products (id, title, description, price, rating, stock, brand, category, thumbnail)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      products.forEach((p) => {
        stmt.run(
          p.id,
          p.title,
          p.description,
          p.price,
          p.rating,
          p.stock,
          p.brand,
          p.category,
          p.thumbnail
        );
      });

      stmt.finalize();
      console.log("✅ Products loaded successfully.");
    });
});
