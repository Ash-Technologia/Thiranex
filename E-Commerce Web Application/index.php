<?php
require_once __DIR__ . '/functions.php';
$title = 'Shop';
$search = trim($_GET['q'] ?? '');
$category = (int) ($_GET['category'] ?? 0);
$categories = db()->query('SELECT * FROM categories ORDER BY name')->fetchAll();
$sql = 'SELECT p.*, c.name AS category_name FROM products p LEFT JOIN categories c ON c.id = p.category_id WHERE p.active = 1';
$params = [];
if ($search !== '') { $sql .= ' AND (p.name LIKE ? OR p.description LIKE ?)'; $params[] = "%$search%"; $params[] = "%$search%"; }
if ($category > 0) { $sql .= ' AND p.category_id = ?'; $params[] = $category; }
$sql .= ' ORDER BY p.created_at DESC';
$stmt = db()->prepare($sql); $stmt->execute($params); $products = $stmt->fetchAll();
require __DIR__ . '/partials/header.php';
?>
<section class="hero"><div><p class="eyebrow">CURATED EVERYDAY OBJECTS</p><h1>Things with a little more thought.</h1></div><p>Discover useful pieces for your desk, home, and everyday rituals. A small store built for learning the full e-commerce journey.</p></section>
<form class="search" method="get"><input name="q" value="<?= e($search) ?>" placeholder="Search products..."><select name="category"><option value="0">All categories</option><?php foreach ($categories as $item): ?><option value="<?= $item['id'] ?>" <?= $category === (int) $item['id'] ? 'selected' : '' ?>><?= e($item['name']) ?></option><?php endforeach; ?></select><button class="button">Search</button></form>
<div class="grid"><?php foreach ($products as $product): ?><article class="card"><img src="<?= e($product['image_url']) ?>" alt="<?= e($product['name']) ?>"><div class="card-body"><p class="eyebrow"><?= e($product['category_name']) ?></p><h3><?= e($product['name']) ?></h3><p><?= e($product['description']) ?></p><div class="price-row"><span class="price">$<?= number_format((float) $product['price'], 2) ?></span><form method="post" action="cart.php"><input type="hidden" name="product_id" value="<?= $product['id'] ?>"><input type="hidden" name="action" value="add"><button class="button">Add to cart</button></form></div></div></article><?php endforeach; ?></div>
<?php if (!$products): ?><p>No products matched your search.</p><?php endif; ?>
<?php require __DIR__ . '/partials/footer.php'; ?>
