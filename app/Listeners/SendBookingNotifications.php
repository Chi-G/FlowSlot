<?php

namespace App\Listeners;

use App\Events\BookingCreated;
use App\Models\User;
use App\Notifications\BookingConfirmedNotification;
use App\Notifications\NewBookingAlertNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Notification;

class SendBookingNotifications implements ShouldQueue
{
    use InteractsWithQueue;

    /**
     * Handle the event.
     */
    public function handle(BookingCreated $event): void
    {
        $appointment = $event->appointment;

        // 1. Send confirmation to the customer
        // We use Notification::route since the customer might not be a registered user
        Notification::route('mail', $appointment->customer_email)
            ->notify(new BookingConfirmedNotification($appointment));

        // 2. Send alert to the admin(s)
        $admins = User::role('admin')->get();
        
        // If no specifically assigned roles, notify the first user or based on env
        if ($admins->isEmpty()) {
            $admins = User::where('email', 'admin@flowslot.com')->get();
        }

        if ($admins->isNotEmpty()) {
            Notification::send($admins, new NewBookingAlertNotification($appointment));
        }
    }
}
