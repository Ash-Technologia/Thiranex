<?php
require_once __DIR__ . '/../functions.php';
$flash = pullFlash();
$user = currentUser();
$basePath = str_contains($_SERVER['PHP_SELF'], '/admin/') ? '../' : '';
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?= e($title ?? APP_NAME) ?> | <?= APP_NAME ?></title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="<?= $basePath ?>assets/style.css">
</head>
<body>
<header class="site-header"><a class="brand" href="<?= $basePath ?>index.php">Hidden<span>Store</span></a><nav>
  <a href="<?= $basePath ?>index.php">Shop</a><a href="<?= $basePath ?>cart.php">Cart <b><?= cartCount() ?></b></a>
  <?php if ($user): ?><a href="<?= $basePath ?>orders.php">Orders</a><?php endif; ?>
  <?php if ($user && $user['role'] === 'admin'): ?><a href="<?= $basePath ?>admin/index.php">Admin</a><?php endif; ?>
  <?php if ($user): ?><a href="<?= $basePath ?>logout.php">Log out</a><?php else: ?><a class="nav-button" href="<?= $basePath ?>login.php">Log in</a><?php endif; ?>
</nav></header>
<?php if ($flash): ?><div class="flash <?= e($flash['type']) ?>"><?= e($flash['message']) ?></div><?php endif; ?>
<main class="page-shell">
