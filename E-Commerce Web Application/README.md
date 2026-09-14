# Hidden Store

A beginner-friendly PHP and MySQL e-commerce application based on the supplied course brief. It demonstrates a product catalog, sessions, authentication, role-based admin access, cart management, offline checkout, and order tracking.

## Requirements

- PHP 8.1+
- MySQL 8+
- Apache, XAMPP, or another PHP server
- PDO MySQL extension enabled

## Setup

1. Copy this folder into your web server directory, such as `htdocs` in XAMPP.
2. Create the database by importing `database/schema.sql` in phpMyAdmin or MySQL.
3. Check the credentials in `config.php`.
4. Start Apache and MySQL.
5. Open `http://localhost/E-Commerce%20Web%20Application/`.
6. Register a user. To create an admin, run the commented `UPDATE` statement in `database/schema.sql` with that user's email.

## Included Workflows

- Browse and search products.
- Filter by category.
- Add products to a session cart and update quantities.
- Register, log in, and log out securely with password hashing.
- Place an offline checkout order.
- View the signed-in user's orders.
- Admin-only product creation, editing, deletion, and order status updates.

This is an educational starter project. Payment processing, email notifications, image uploads, CSRF tokens, and production deployment should be added before real-world use.
