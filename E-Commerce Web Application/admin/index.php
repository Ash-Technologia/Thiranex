<?php
require_once __DIR__ . '/../functions.php'; requireAdmin();
$products = db()->query('SELECT p.*, c.name AS category_name FROM products p LEFT JOIN categories c ON c.id = p.category_id ORDER BY p.created_at DESC')->fetchAll();
$categories = db()->query('SELECT * FROM categories ORDER BY name')->fetchAll();
$title = 'Admin Dashboard'; require __DIR__ . '/../partials/header.php';
?><div class="section-heading"><div><p class="eyebrow">ADMIN AREA</p><h1>Store dashboard</h1></div><a class="button" href="product.php">Add product</a></div><p><a href="orders.php">Manage orders</a></p><div class="table-wrap"><table><thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Actions</th></tr></thead><tbody><?php foreach ($products as $product): ?><tr><td><?= e($product['name']) ?></td><td><?= e($product['category_name']) ?></td><td>$<?= number_format((float) $product['price'], 2) ?></td><td><a href="product.php?id=<?= $product['id'] ?>">Edit</a> · <a href="product-delete.php?id=<?= $product['id'] ?>" onclick="return confirm('Delete this product?')">Delete</a></td></tr><?php endforeach; ?></tbody></table></div><?php require __DIR__ . '/../partials/footer.php'; ?>
