DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS categories; 
DROP TABLE IF EXISTS order_details; 
DROP TABLE IF EXISTS orders; 
DROP TABLE IF EXISTS products; 

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL
);

CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    address TEXT
);

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    parent_category_id INT REFERENCES categories(category_id)
);

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category_id INT REFERENCES categories(category_id),
    price DECIMAL(10, 2) NOT NULL,
    sale_price DECIMAL(10, 2),
    on_sale BOOLEAN NOT NULL DEFAULT FALSE,
    stock INT NOT NULL
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(customer_id),
    order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10, 2) NOT NULL
);

CREATE TABLE order_details (
    order_detail_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(order_id),
    product_id INT REFERENCES products(product_id),
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL
);

INSERT INTO categories (name, parent_category_id) VALUES
('Video Game', NULL),
('Console', NULL),
('Accessory', NULL),
('PlayStation Games', 1),
('Xbox Games', 1),
('Nintendo Consoles', 2);

INSERT INTO customers (name, email, password, phone, address) VALUES
('John Doe', 'john.doe@example.com', 'password123', '123456789', '123 Fake Street'),
('Jane Smith', 'jane.smith@example.com', 'password456', '987654321', '456 Always Avenue');

INSERT INTO products (name, category_id, price, sale_price, on_sale, stock) VALUES
('Game A', 1, 59.99, NULL, FALSE, 100),
('Game B', 1, 39.99, 29.99, TRUE, 50),
('Console X', 2, 299.99, NULL, FALSE, 30),
('Accessory Y', 3, 19.99, 14.99, TRUE, 200),
('PlayStation Game A', 4, 49.99, 39.99, TRUE, 70),
('Xbox Game B', 5, 44.99, 34.99, TRUE, 60),
('Nintendo Console C', 6, 249.99, 199.99, TRUE, 40);

INSERT INTO orders (customer_id, total) VALUES (1, 119.98);
INSERT INTO order_details (order_id, product_id, quantity, unit_price) VALUES (1, 1, 1, 59.99), (1, 2, 1, 59.99);
INSERT INTO orders (customer_id, total) VALUES (2, 319.98);
INSERT INTO order_details (order_id, product_id, quantity, unit_price) VALUES (2, 3, 1, 299.99), (2, 4, 1, 19.99);
