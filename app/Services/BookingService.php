<?php

namespace App\Services;

use App\Models\Appointment;
use App\Models\TimeSlot;
use App\Models\Service;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Exception;

class BookingService
{
    /**
     * Book an appointment with concurrency control.
     *
     * @param array $data
     * @return Appointment
     * @throws Exception
     */
    public function book(array $data): Appointment
    {
        return DB::transaction(function () use ($data) {
            $slot = TimeSlot::where('id', $data['time_slot_id'])
                ->lockForUpdate()
                ->firstOrFail();

            if ($slot->is_booked || $slot->status !== 'available') {
                throw new Exception('This time slot is no longer available.');
            }

            // Mark slot as booked
            $slot->update([
                'is_booked' => true,
                'status' => 'reserved', // Could move to 'booked' but the schema uses 'reserved/blocked'
            ]);

            // Create appointment
            $appointment = Appointment::create([
                'user_id' => $data['user_id'] ?? null,
                'service_id' => $slot->service_id,
                'time_slot_id' => $slot->id,
                'customer_name' => $data['customer_name'],
                'customer_email' => $data['customer_email'],
                'customer_phone' => $data['customer_phone'] ?? null,
                'status' => 'pending',
                'reference_number' => 'FS-' . strtoupper(Str::random(8)),
            ]);

            event(new \App\Events\BookingCreated($appointment));

            return $appointment;
        });
    }
}
