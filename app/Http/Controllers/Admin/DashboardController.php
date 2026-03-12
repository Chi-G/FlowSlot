<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Appointment;
use App\Models\Service;
use App\Models\TimeSlot;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $today = Carbon::today();
        
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalAppointments' => Appointment::count(),
                'pendingAppointments' => Appointment::where('status', 'pending')->count(),
                'revenue' => Appointment::where('status', 'confirmed')->join('services', 'appointments.service_id', '=', 'services.id')->sum('services.price'),
                'activeServices' => Service::where('is_active', true)->count(),
            ],
            'todayBookings' => Appointment::with(['service', 'timeSlot'])
                ->latest()
                ->limit(5)
                ->get(),
        ]);
    }
}
