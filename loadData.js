const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const csv = require('csv-parser');

const db = new sqlite3.Database('ecommerce.db');

db.serialize(() => {
  const insert = db.prepare(`
    INSERT INTO products (title, description, price, category, image, rating_rate, rating_count)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  fs.createReadStream('products.csv')
    .pipe(csv())
    .on('data', (row) => {
      insert.run(
        row.title,
        row.description,
        parseFloat(row.price),
        row.category,
        row.image,
        parseFloat(row.rating_rate),
        parseInt(row.rating_count)
      );
    })
    .on('end', () => {
      insert.finalize();
      console.log('✅ Data loaded into products table');
      db.close();
    });
});
