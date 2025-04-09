<?php
header('Content-Type: application/json');

try {
    // Get JSON data
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validate data
    if (!$data['name'] || !$data['email'] || !$data['subject'] || !$data['message']) {
        throw new Exception('Missing required fields');
    }
    
    // Your email sending logic here
    $to = "davidasheer161@gmail.com";
    $subject = "Contact Form: " . $data['subject'];
    $message = "Name: " . $data['name'] . "\n";
    $message .= "Email: " . $data['email'] . "\n\n";
    $message .= $data['message'];
    
    $headers = "From: " . $data['email'] . "\r\n";
    
    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(['status' => 'success']);
    } else {
        throw new Exception('Failed to send email');
    }
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
?>