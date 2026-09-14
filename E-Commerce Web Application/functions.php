<?php

declare(strict_types=1);

require_once __DIR__ . '/db.php';

function e(?string $value): string
{
    return htmlspecialchars($value ?? '', ENT_QUOTES, 'UTF-8');
}

function redirect(string $path): never
{
    header('Location: ' . $path);
    exit;
}

function flash(string $type, string $message): void
{
    $_SESSION['flash'] = ['type' => $type, 'message' => $message];
}

function pullFlash(): ?array
{
    $message = $_SESSION['flash'] ?? null;
    unset($_SESSION['flash']);
    return $message;
}

function currentUser(): ?array
{
    return $_SESSION['user'] ?? null;
}

function requireLogin(): void
{
    if (!currentUser()) {
        flash('error', 'Please log in to continue.');
        redirect('login.php');
    }
}

function requireAdmin(): void
{
    requireLogin();
    if (currentUser()['role'] !== 'admin') {
        http_response_code(403);
        exit('Forbidden');
    }
}

function cartCount(): int
{
    return array_sum($_SESSION['cart'] ?? []);
}

function cartProducts(): array
{
    $cart = $_SESSION['cart'] ?? [];
    if (!$cart) return [];

    $ids = array_map('intval', array_keys($cart));
    $placeholders = implode(',', array_fill(0, count($ids), '?'));
    $statement = db()->prepare("SELECT * FROM products WHERE id IN ($placeholders) AND active = 1");
    $statement->execute($ids);
    $products = $statement->fetchAll();

    foreach ($products as &$product) {
        $product['quantity'] = (int) ($cart[$product['id']] ?? 0);
        $product['subtotal'] = $product['quantity'] * (float) $product['price'];
    }
    return $products;
}
