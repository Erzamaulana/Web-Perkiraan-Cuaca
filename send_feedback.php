<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer-6.9.1/src/Exception.php';
require 'PHPMailer-6.9.1/src/PHPMailer.php';
require 'PHPMailer-6.9.1/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    $mail = new PHPMailer(true);

    try {
        //Server settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'wanzamolan@gmail.com';
        $mail->Password   = 'your-password'; // Use an app-specific password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        //Recipients
        $mail->setFrom('wanzamolan@gmail.com', 'erza');
        $mail->addAddress('wanzamolan@gmail.com');

        // Content
        $mail->isHTML(true);
        $mail->Subject = 'Kritik dan Saran';
        $mail->Body    = "<h3>Kritik dan Saran dari: $name ($email)</h3><p>$message</p>";

        $mail->send();
        echo 'Pesan anda telah terkirim';
    } catch (Exception $e) {
        echo "Pesan tidak bisa dikirim. Mailer Error: {$mail->ErrorInfo}";
    }
} else {
    echo "Invalid request method";
}
?>
