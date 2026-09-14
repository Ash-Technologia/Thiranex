<?php
require_once __DIR__ . '/functions.php';
if (currentUser()) redirect('index.php');
$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? ''); $email = trim($_POST['email'] ?? ''); $password = $_POST['password'] ?? '';
    if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($password) < 8) $error = 'Enter a name, valid email, and password of at least 8 characters.';
    else {
        try { $statement = db()->prepare('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)'); $statement->execute([$name, $email, password_hash($password, PASSWORD_DEFAULT)]); flash('success', 'Account created. You can now log in.'); redirect('login.php'); }
        catch (PDOException $exception) { $error = $exception->getCode() === '23000' ? 'That email is already registered.' : 'Unable to create your account.'; }
    }
}
$title = 'Register'; require __DIR__ . '/partials/header.php';
?><h1>Create your account</h1><?php if ($error): ?><div class="flash error"><?= e($error) ?></div><?php endif; ?><form class="form" method="post"><label>Name<input name="name" required></label><label>Email<input type="email" name="email" required></label><label>Password<input type="password" name="password" minlength="8" required></label><button class="button">Register</button></form><?php require __DIR__ . '/partials/footer.php'; ?>
