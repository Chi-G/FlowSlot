<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class BookingReminderNotification extends Notification
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
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
                    ->subject('Reminder: Your appointment is tomorrow!')
                    ->line('This is a reminder for your upcoming appointment.')
                    ->line('Service: ' . $this->appointment->service->name)
                    ->line('Date & Time: ' . $this->appointment->timeSlot->start_time->format('M j, Y H:i'))
                    ->action('View Details', url('/booking/' . $this->appointment->reference_number))
                    ->line('We look forward to seeing you!');
    }

    /**
     * Get the array representation of the notification.
     */
    public function toArray(object $notifiable): array
    {
        return [
            'appointment_id' => $this->appointment->id,
            'message' => 'Reminder: Appointment for ' . $this->appointment->service->name . ' is tomorrow.',
        ];
    }
}
