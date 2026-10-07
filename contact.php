<?php
// Handles the contact form from contact.html.
// Change $to to your own email address before testing.
$to = "orders@goldencrust.example";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: contact.html");
    exit;
}

function clean($value) {
    return htmlspecialchars(trim($value), ENT_QUOTES, "UTF-8");
}

$name    = clean($_POST["name"] ?? "");
$email   = trim($_POST["email"] ?? "");
$subject = clean($_POST["subject"] ?? "General question");
$message = clean($_POST["message"] ?? "");

$errors = [];
if ($name === "") { $errors[] = "Please enter your name."; }
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) { $errors[] = "Please enter a valid email address."; }
if (strlen($message) < 10) { $errors[] = "Your message should be at least 10 characters."; }

$sent = false;
if (empty($errors)) {
    $headers = "From: website@goldencrust.example\r\nReply-To: " . $email . "\r\nContent-Type: text/plain; charset=UTF-8";
    $body = "Name: $name\nEmail: $email\n\n$message";
    $sent = mail($to, "Website: $subject", $body, $headers);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Message status | Golden Crust Bakery</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <main class="section">
    <?php if (!empty($errors)): ?>
      <h1>We couldn't send that</h1>
      <ul>
        <?php foreach ($errors as $e): ?><li><?= $e ?></li><?php endforeach; ?>
      </ul>
    <?php elseif ($sent): ?>
      <h1>Thanks, <?= $name ?></h1>
      <p>We got your message and will reply within one working day.</p>
    <?php else: ?>
      <h1>Something went wrong</h1>
      <p>Your message wasn't sent. Please call us on 011 555 0123.</p>
    <?php endif; ?>
    <p><a class="btn" href="contact.html">Back to contact page</a></p>
  </main>
</body>
</html>
