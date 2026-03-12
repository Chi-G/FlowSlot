<?php

use App\Models\Appointment;
use App\Models\Service;
use App\Models\TimeSlot;
use App\Notifications\BookingConfirmedNotification;
use Illuminate\Support\Facades\Notification;

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

echo "Testing SMTP Connection...\n";

try {
    Mail::raw('Test email from FlowSlot', function ($message) {
        $message->to('test@example.com')->subject('SMTP Test');
    });
    echo "SMTP Test Email Sent Successfully!\n";
} catch (\Exception $e) {
    echo "SMTP Test Failed: " . $e->getMessage() . "\n";
}

echo "\nTesting Notification Dispatch...\n";

$appointment = Appointment::with(['service', 'timeSlot'])->first();

if ($appointment) {
    try {
        Notification::route('mail', $appointment->customer_email)
            ->notify(new BookingConfirmedNotification($appointment));
        echo "Booking Confirmation Notification Sent Successfully to " . $appointment->customer_email . "!\n";
    } catch (\Exception $e) {
        echo "Notification Dispatch Failed: " . $e->getMessage() . "\n";
    }
} else {
    echo "No appointment found to test notification.\n";
}
