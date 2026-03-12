<?php

namespace App\Services;

use App\Models\Service;
use App\Models\TimeSlot;
use Carbon\Carbon;
use Carbon\CarbonPeriod;

class TimeSlotGenerator
{
    /**
     * Generate time slots for a specific service and date range.
     *
     * @param Service $service
     * @param Carbon $startDate
     * @param Carbon $endDate
     * @param array $businessHours e.g., ['09:00', '17:00']
     * @param array $daysOfWeek e.g., [1, 2, 3, 4, 5] (Monday to Friday)
     * @return int Number of slots created
     */
    public function generate(
        Service $service,
        Carbon $startDate,
        Carbon $endDate,
        array $businessHours = ['09:00', '17:00'],
        array $daysOfWeek = [1, 2, 3, 4, 5]
    ): int {
        $slotsCreated = 0;
        $period = CarbonPeriod::create($startDate, $endDate);

        foreach ($period as $date) {
            if (!in_array($date->dayOfWeek, $daysOfWeek)) {
                continue;
            }

            $startTime = $date->copy()->setTimeFromTimeString($businessHours[0]);
            $endTime = $date->copy()->setTimeFromTimeString($businessHours[1]);

            while ($startTime->copy()->addMinutes($service->duration_minutes)->lte($endTime)) {
                $slotEndTime = $startTime->copy()->addMinutes($service->duration_minutes);

                // Check if slot already exists to prevent duplicates
                $exists = TimeSlot::where('service_id', $service->id)
                    ->where('start_time', $startTime)
                    ->exists();

                if (!$exists) {
                    TimeSlot::create([
                        'service_id' => $service->id,
                        'start_time' => $startTime->toDateTimeString(),
                        'end_time' => $slotEndTime->toDateTimeString(),
                        'is_booked' => false,
                        'status' => 'available',
                    ]);
                    $slotsCreated++;
                }

                $startTime->addMinutes($service->duration_minutes);
            }
        }

        return $slotsCreated;
    }
}
