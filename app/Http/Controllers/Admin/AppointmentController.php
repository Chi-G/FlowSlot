<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Appointment;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Appointments/Index', [
            'appointments' => Appointment::with(['service', 'timeSlot', 'user'])
                ->orderBy('id', 'desc')
                ->paginate(15),
        ]);
    }

    public function show(Appointment $appointment)
    {
        return Inertia::render('Admin/Appointments/Show', [
            'appointment' => $appointment->load(['service', 'timeSlot', 'user']),
        ]);
    }

    public function updateStatus(Request $request, Appointment $appointment)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled,completed',
        ]);

        $appointment->update($validated);

        return back()->with('success', "Appointment status updated to {$validated['status']}.");
    }
}
