<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Service;
use App\Services\TimeSlotGenerator;
use Inertia\Inertia;

class SlotGeneratorController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Slots/Index', [
            'services' => Service::all(),
        ]);
    }

    public function store(Request $request, TimeSlotGenerator $generator)
    {
        $validated = $request->validate([
            'service_id' => 'required|exists:services,id',
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after_or_equal:start_date',
            'start_time' => 'required|string',
            'end_time' => 'required|string',
            'interval_minutes' => 'required|integer|min:5',
        ]);

        $generator->generate(
            Service::find($validated['service_id']),
            $validated['start_date'],
            $validated['end_date'],
            $validated['start_time'],
            $validated['end_time'],
            $validated['interval_minutes']
        );

        return redirect()->route('admin.dashboard')->with('success', 'Time slots generated successfully.');
    }
}
