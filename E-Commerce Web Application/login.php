<?php
require_once __DIR__ . '/functions.php';
if (currentUser()) redirect('index.php');
$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $statement = db()->prepare('SELECT * FROM users WHERE email = ?'); $statement->execute([trim($_POST['email'] ?? '')]); $user = $statement->fetch();
    if ($user && password_verify($_POST['password'] ?? '', $user['password_hash'])) { $_SESSION['user'] = ['id' => $user['id'], 'name' => $user['name'], 'role' => $user['role'], 'email' => $user['email']]; redirect('index.php'); }
    $error = 'Invalid email or password.';
}
$title = 'Log in'; require __DIR__ . '/partials/header.php';
?><h1>Welcome back</h1><?php if ($error): ?><div class="flash error"><?= e($error) ?></div><?php endif; ?><form class="form" method="post"><label>Email<input type="email" name="email" required></label><label>Password<input type="password" name="password" required></label><button class="button">Log in</button></form><p>New here? <a href="register.php">Create an account</a>.</p><?php require __DIR__ . '/partials/footer.php'; ?>
