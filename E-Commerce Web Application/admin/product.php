<?php
require_once __DIR__ . '/../functions.php'; requireAdmin();
$id = (int) ($_GET['id'] ?? 0); $product = null;
if ($id) { $statement = db()->prepare('SELECT * FROM products WHERE id = ?'); $statement->execute([$id]); $product = $statement->fetch(); }
$categories = db()->query('SELECT * FROM categories ORDER BY name')->fetchAll(); $error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = [trim($_POST['name'] ?? ''), trim($_POST['description'] ?? ''), (float) ($_POST['price'] ?? 0), (int) ($_POST['category_id'] ?? 0), trim($_POST['image_url'] ?? '')];
    if ($data[0] === '' || $data[1] === '' || $data[2] <= 0) $error = 'Name, description, and a positive price are required.';
    else { if ($id) { $statement = db()->prepare('UPDATE products SET name=?, description=?, price=?, category_id=?, image_url=? WHERE id=?'); $statement->execute([...$data, $id]); } else { $statement = db()->prepare('INSERT INTO products (name, description, price, category_id, image_url) VALUES (?, ?, ?, ?, ?)'); $statement->execute($data); } flash('success', 'Product saved.'); redirect('index.php'); }
}
$title = $id ? 'Edit Product' : 'Add Product'; require __DIR__ . '/../partials/header.php';
?><h1><?= $id ? 'Edit product' : 'Add product' ?></h1><?php if ($error): ?><div class="flash error"><?= e($error) ?></div><?php endif; ?><form class="form" method="post"><label>Name<input name="name" value="<?= e($product['name'] ?? '') ?>" required></label><label>Description<textarea name="description" required><?= e($product['description'] ?? '') ?></textarea></label><label>Price<input type="number" step="0.01" name="price" value="<?= e((string) ($product['price'] ?? '')) ?>" required></label><label>Category<select name="category_id"><?php foreach ($categories as $category): ?><option value="<?= $category['id'] ?>" <?= ($product['category_id'] ?? 0) == $category['id'] ? 'selected' : '' ?>><?= e($category['name']) ?></option><?php endforeach; ?></select></label><label>Image URL<input name="image_url" value="<?= e($product['image_url'] ?? '') ?>"></label><button class="button">Save product</button></form><?php require __DIR__ . '/../partials/footer.php'; ?>
