const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('ecommerce.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      price REAL,
      category TEXT,
      image TEXT,
      rating_rate REAL,
      rating_count INTEGER
    )
  `);

  console.log("✅ Table created successfully");
});

db.close();
