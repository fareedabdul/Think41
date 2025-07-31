const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./ecommerce.db');

app.use(express.json());

// GET all departments with product count
app.get('/api/departments', (req, res) => {
  const query = `
    SELECT d.id, d.name, COUNT(p.id) AS product_count
    FROM departments d
    LEFT JOIN products p ON p.department_id = d.id
    GROUP BY d.id
  `;
  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(rows);
  });
});

// GET department by ID
app.get('/api/departments/:id', (req, res) => {
  const query = `SELECT * FROM departments WHERE id = ?`;
  db.get(query, [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Department not found' });
    res.status(200).json(row);
  });
});

// GET products in a department
app.get('/api/departments/:id/products', (req, res) => {
  const query = `
    SELECT p.id, p.name, p.price, p.description, d.name AS department
    FROM products p
    JOIN departments d ON p.department_id = d.id
    WHERE d.id = ?
  `;
  db.all(query, [req.params.id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (rows.length === 0) return res.status(404).json({ error: 'No products found for this department' });
    res.status(200).json(rows);
  });
});
