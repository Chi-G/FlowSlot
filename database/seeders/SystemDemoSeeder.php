<?php

namespace Database\Seeders;

use App\Models\Service;
use App\Models\TimeSlot;
use App\Models\User;
use App\Models\Appointment;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class SystemDemoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Create Admin User
        $admin = User::updateOrCreate(
            ['email' => 'admin@flowslot.com'],
            [
                'name' => 'Elite Admin',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );
        $admin->assignRole('admin');

        // 2. Create 30 Services
        $serviceTypes = [
            ['Executive Consultation', 'Premium 1-on-1 strategy session for enterprise leaders.', 60, 250, '#4f46e5', 'Strategy'],
            ['Technical Audit', 'Deep dive into your system architecture and performance.', 90, 450, '#0891b2', 'Technical'],
            ['Wellness Coaching', 'Holistic approach to professional burnout and peak performance.', 45, 125, '#059669', 'Wellness'],
            ['Quick Check-in', 'Short sync for existing clients to resolve minor blockers.', 15, 50, '#d97706', 'Support'],
            ['Strategy Workshop', 'Interactive session to align your team goals.', 120, 800, '#e11d48', 'Strategy'],
            ['Code Review', 'Expert analysis of your codebase for optimization.', 60, 300, '#7c3aed', 'Technical'],
        ];

        for ($i = 1; $i <= 30; $i++) {
            $type = $serviceTypes[($i - 1) % count($serviceTypes)];
            $name = $i > 6 ? "{$type[0]} Level {$i}" : $type[0];
            
            $service = Service::updateOrCreate(
                ['name' => $name],
                [
                    'category' => $type[5],
                    'description' => $type[1],
                    'duration_minutes' => $type[2],
                    'price' => $type[3] + ($i * 5),
                    'color_code' => $type[4],
                    'is_active' => true,
                ]
            );

            // 3. Generate Time Slots for the next 7 days for each service
            // Limiting to fewer slots per service to avoid database bloat with 30 services
            for ($d = 0; $d < 7; $d++) {
                $date = Carbon::today()->addDays($d);
                if ($date->isWeekend()) continue;

                // Create 4 slots per day per service
                $startTime = $date->copy()->hour(10)->minute(0);
                for ($s = 0; $s < 4; $s++) {
                    $slotEnd = $startTime->copy()->addMinutes($service->duration_minutes);
                    
                    TimeSlot::updateOrCreate(
                        [
                            'service_id' => $service->id,
                            'start_time' => $startTime->toDateTimeString(),
                        ],
                        [
                            'end_time' => $slotEnd->toDateTimeString(),
                            'is_booked' => false,
                            'status' => 'available',
                        ]
                    );

                    $startTime->addMinutes($service->duration_minutes + 60);
                }
            }
        }

        // 4. Create 20 demo appointments
        $services = Service::all();
        $names = ['Liam Smith', 'Olivia Johnson', 'Noah Williams', 'Emma Brown', 'James Jones', 'Sophia Garcia', 'Robert Miller', 'Isabella Davis', 'Michael Rodriguez', 'Charlotte Martinez', 'William Hernandez', 'Amelia Lopez', 'David Gonzales', 'Mia Wilson', 'Richard Anderson', 'Evelyn Thomas', 'Joseph Taylor', 'Harper Moore', 'Thomas Jackson', 'Abigail Martin'];

        for ($i = 0; $i < 20; $i++) {
            $service = $services->random();
            $slot = TimeSlot::where('service_id', $service->id)
                ->where('is_booked', false)
                ->inRandomOrder()
                ->first();

            if ($slot) {
                $status = collect(['confirmed', 'pending', 'cancelled'])->random();
                
                $slot->update([
                    'is_booked' => $status !== 'cancelled', 
                    'status' => $status === 'confirmed' ? 'reserved' : ($status === 'pending' ? 'reserved' : 'available')
                ]);

                Appointment::create([
                    'user_id' => $admin->id,
                    'service_id' => $service->id,
                    'time_slot_id' => $slot->id,
                    'customer_name' => $names[$i],
                    'customer_email' => strtolower(str_replace(' ', '.', $names[$i])) . '@example.com',
                    'customer_phone' => '+1' . rand(100, 999) . rand(100, 999) . rand(1000, 9999),
                    'status' => $status,
                    'reference_number' => 'FS-' . strtoupper(bin2hex(random_bytes(4))),
                    'created_at' => Carbon::now()->subDays(rand(0, 5)), // Some from previous days
                ]);
            }
        }
    }
}
