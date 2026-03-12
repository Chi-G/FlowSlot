<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Service;
use App\Services\TimeSlotGenerator;
use Inertia\Inertia;

use OpenApi\Attributes as OA;

class SlotGeneratorController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Slots/Index', [
            'services' => Service::all(),
        ]);
    }

    #[OA\Post(
        path: '/admin/slots/generate',
        operationId: 'generateSlots',
        tags: ['Admin'],
        summary: 'Bulk generate time slots for a service',
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['service_id', 'start_date', 'end_date', 'start_time', 'end_time', 'interval_minutes'],
                properties: [
                    new OA\Property(property: 'service_id', type: 'integer'),
                    new OA\Property(property: 'start_date', type: 'string', format: 'date'),
                    new OA\Property(property: 'end_date', type: 'string', format: 'date'),
                    new OA\Property(property: 'start_time', type: 'string'),
                    new OA\Property(property: 'end_time', type: 'string'),
                    new OA\Property(property: 'interval_minutes', type: 'integer')
                ]
            )
        ),
        responses: [
            new OA\Response(response: 200, description: 'Slots generated successfully')
        ]
    )]
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
