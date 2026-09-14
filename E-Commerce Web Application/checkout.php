<?php
require_once __DIR__ . '/functions.php';
requireLogin();
$products = cartProducts(); if (!$products) { flash('error', 'Your cart is empty.'); redirect('index.php'); }
$total = array_sum(array_column($products, 'subtotal'));
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $pdo = db(); $pdo->beginTransaction();
    try { $statement = $pdo->prepare('INSERT INTO orders (user_id, total) VALUES (?, ?)'); $statement->execute([currentUser()['id'], $total]); $orderId = (int) $pdo->lastInsertId(); $itemStatement = $pdo->prepare('INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price) VALUES (?, ?, ?, ?, ?)'); foreach ($products as $product) $itemStatement->execute([$orderId, $product['id'], $product['name'], $product['quantity'], $product['price']]); $pdo->commit(); $_SESSION['cart'] = []; flash('success', 'Order placed successfully.'); redirect('orders.php'); }
    catch (Throwable $exception) { $pdo->rollBack(); flash('error', 'Checkout could not be completed.'); }
}
$title = 'Checkout'; require __DIR__ . '/partials/header.php';
?><h1>Checkout</h1><div class="form"><p>Review your order before placing it. This demo uses offline payment.</p><p><strong>Total: $<?= number_format($total, 2) ?></strong></p><form method="post"><button class="button">Place order</button></form></div><?php require __DIR__ . '/partials/footer.php'; ?>
