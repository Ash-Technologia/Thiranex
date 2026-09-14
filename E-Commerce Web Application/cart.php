<?php
require_once __DIR__ . '/functions.php';
if (!isset($_SESSION['cart'])) $_SESSION['cart'] = [];
$action = $_POST['action'] ?? '';
$id = (int) ($_POST['product_id'] ?? 0);
if ($action === 'add' && $id > 0) { $_SESSION['cart'][$id] = ($_SESSION['cart'][$id] ?? 0) + 1; flash('success', 'Product added to your cart.'); redirect('cart.php'); }
if (isset($_POST['remove_id'])) { unset($_SESSION['cart'][(int) $_POST['remove_id']]); redirect('cart.php'); }
if ($action === 'update') { foreach ($_POST['quantities'] ?? [] as $productId => $quantity) { $quantity = max(0, min(99, (int) $quantity)); if ($quantity === 0) unset($_SESSION['cart'][(int) $productId]); else $_SESSION['cart'][(int) $productId] = $quantity; } flash('success', 'Cart updated.'); redirect('cart.php'); }
if ($action === 'remove' && $id > 0) { unset($_SESSION['cart'][$id]); redirect('cart.php'); }
$products = cartProducts(); $total = array_sum(array_column($products, 'subtotal')); $title = 'Your Cart'; require __DIR__ . '/partials/header.php';
?><h1>Your cart</h1><?php if (!$products): ?><p>Your cart is empty. <a href="index.php">Continue shopping</a>.</p><?php else: ?><form method="post"><input type="hidden" name="action" value="update"><div class="table-wrap"><table><thead><tr><th>Product</th><th>Price</th><th>Quantity</th><th>Total</th><th></th></tr></thead><tbody><?php foreach ($products as $product): ?><tr><td><?= e($product['name']) ?></td><td>$<?= number_format((float) $product['price'], 2) ?></td><td><input type="number" name="quantities[<?= $product['id'] ?>]" value="<?= $product['quantity'] ?>" min="0" max="99" style="width:70px"></td><td>$<?= number_format($product['subtotal'], 2) ?></td><td><button class="button" type="submit" name="remove_id" value="<?= $product['id'] ?>" formaction="cart.php" formmethod="post">Remove</button></td></tr><?php endforeach; ?></tbody></table></div><p><strong>Total: $<?= number_format($total, 2) ?></strong></p><button class="button">Update cart</button> <a class="button" href="checkout.php">Checkout</a></form><?php endif; ?><?php require __DIR__ . '/partials/footer.php'; ?>
