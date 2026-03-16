<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewBookingAlertNotification extends Notification
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
        return ['mail', 'database', 'broadcast'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
                    ->subject('New Booking: ' . $this->appointment->reference_number)
                    ->line('A new booking has been made.')
                    ->line('Service: ' . $this->appointment->service->name)
                    ->line('Customer: ' . $this->appointment->customer_name)
                    ->action('View Dashboard', url('/admin/dashboard'))
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
            'reference_number' => $this->appointment->reference_number,
            'customer_name' => $this->appointment->customer_name,
            'service' => $this->appointment->service->name,
            'message' => 'New booking received from ' . $this->appointment->customer_name,
        ];
    }
}
