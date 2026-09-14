<?php
require_once __DIR__ . '/../functions.php'; requireAdmin();
$id = (int) ($_GET['id'] ?? 0); if ($id) { $statement = db()->prepare('UPDATE products SET active = 0 WHERE id = ?'); $statement->execute([$id]); flash('success', 'Product archived.'); }
redirect('index.php');
