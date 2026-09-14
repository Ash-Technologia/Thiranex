<?php
require_once __DIR__ . '/functions.php'; requireLogin();
$statement = db()->prepare('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC'); $statement->execute([currentUser()['id']]); $orders = $statement->fetchAll();
$title = 'My Orders'; require __DIR__ . '/partials/header.php';
?><h1>My orders</h1><div class="table-wrap"><table><thead><tr><th>Order</th><th>Total</th><th>Status</th><th>Placed</th></tr></thead><tbody><?php foreach ($orders as $order): ?><tr><td>#<?= $order['id'] ?></td><td>$<?= number_format((float) $order['total'], 2) ?></td><td><?= e(ucfirst($order['status'])) ?></td><td><?= e($order['created_at']) ?></td></tr><?php endforeach; ?></tbody></table></div><?php if (!$orders): ?><p>You have not placed any orders yet.</p><?php endif; ?><?php require __DIR__ . '/partials/footer.php'; ?>
