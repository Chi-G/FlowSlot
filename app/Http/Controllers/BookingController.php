<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Service;
use App\Models\TimeSlot;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function index()
    {
        return Inertia::render('Public/Home');
    }

    public function services()
    {
        return Inertia::render('Public/Services', [
            'services' => Service::where('is_active', true)->paginate(6),
        ]);
    }

    public function show(Service $service)
    {
        return Inertia::render('Book/Show', [
            'service' => $service,
        ]);
    }

    public function getSlots(Service $service, Request $request)
    {
        $date = $request->query('date');
        
        return TimeSlot::where('service_id', $service->id)
            ->whereDate('start_time', $date)
            ->where('status', 'available')
            ->where('is_booked', false)
            ->orderBy('start_time')
            ->get();
    }

    public function confirm(Service $service, TimeSlot $slot)
    {
        if ($slot->is_booked || $slot->service_id !== $service->id) {
            return redirect()->route('booking.show', $service)->with('error', 'This slot is no longer available.');
        }

        return Inertia::render('Book/Confirm', [
            'service' => $service,
            'slot' => $slot,
        ]);
    }

    public function store(Request $request, \App\Services\BookingService $bookingService)
    {
        $validated = $request->validate([
            'service_id' => 'required|exists:services,id',
            'time_slot_id' => 'required|exists:time_slots,id',
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'customer_phone' => 'nullable|string|max:20',
        ]);

        try {
            $appointment = $bookingService->book($validated);
            return redirect()->route('booking.success', $appointment->reference_number);
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function success($reference)
    {
        $appointment = \App\Models\Appointment::with(['service', 'timeSlot'])
            ->where('reference_number', $reference)
            ->firstOrFail();

        return Inertia::render('Book/Success', [
            'appointment' => $appointment,
        ]);
    }
}
