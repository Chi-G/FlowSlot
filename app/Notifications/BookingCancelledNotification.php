<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class BookingCancelledNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public $appointment;

    /**
     * Create a new notification instance.
     */
    public function __construct(\App\Models\Appointment $appointment)
    {
        $this->appointment = $appointment;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
                    ->error()
                    ->subject('Booking Cancelled: ' . $this->appointment->reference_number)
                    ->line('Your booking for ' . $this->appointment->service->name . ' has been cancelled.')
                    ->line('Reference: ' . $this->appointment->reference_number)
                    ->line('If this was an error, please contact support or make a new booking.')
                    ->action('Book Again', url('/'))
                    ->line('Thank you for using FlowSlot!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'appointment_id' => $this->appointment->id,
            'message' => 'Your booking for ' . $this->appointment->service->name . ' was cancelled.',
        ];
    }
}
