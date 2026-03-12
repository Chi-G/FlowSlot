<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class BookingConfirmedNotification extends Notification
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
                    ->subject('Booking Confirmed: ' . $this->appointment->reference_number)
                    ->greeting('Hello ' . $this->appointment->customer_name . '!')
                    ->line('Your booking for ' . $this->appointment->service->name . ' has been confirmed.')
                    ->line('Date & Time: ' . $this->appointment->timeSlot->start_time->format('M j, Y H:i'))
                    ->line('Reference: ' . $this->appointment->reference_number)
                    ->action('View Booking', route('booking.success', ['reference' => $this->appointment->reference_number]))
                    ->line('Thank you for choosing FlowSlot!');
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
            'message' => 'Your booking for ' . $this->appointment->service->name . ' is confirmed.',
        ];
    }
}
