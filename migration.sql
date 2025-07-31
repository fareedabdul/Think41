-- Create departments table
CREATE TABLE departments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
);

-- Insert unique departments from existing products
INSERT INTO departments (name)
SELECT DISTINCT department FROM products;

-- Add department_id column to products
ALTER TABLE products ADD COLUMN department_id INTEGER;

-- Update products to reference correct department_id
UPDATE products
SET department_id = (
    SELECT id FROM departments
    WHERE departments.name = products.department
);

-- Remove old department column if needed (SQLite doesn’t support DROP COLUMN easily)

-- Enforce foreign key constraint
PRAGMA foreign_keys = OFF;

CREATE TABLE new_products AS
SELECT id, name, price, description, department_id
FROM products;

DROP TABLE products;

ALTER TABLE new_products RENAME TO products;

PRAGMA foreign_keys = ON;
