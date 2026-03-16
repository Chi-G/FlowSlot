<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Appointment;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    #[OA\Get(
        path: '/admin/appointments',
        operationId: 'listAppointments',
        tags: ['Admin'],
        summary: 'List all appointments managed by admin',
        responses: [
            new OA\Response(
                response: 200, 
                description: 'Successful operation',
                content: new OA\JsonContent()
            )
        ]
    )]
    public function index(Request $request)
    {
        $search = $request->query('search');

        $appointments = Appointment::with(['service', 'timeSlot', 'user'])
            ->when($search, function ($query, $search) {
                $query->where('reference_number', 'like', "%{$search}%")
                      ->orWhere('customer_name', 'like', "%{$search}%")
                      ->orWhere('customer_email', 'like', "%{$search}%");
            })
            ->orderBy('id', 'desc')
            ->paginate(10)
            ->withQueryString();

        if ($request->wantsJson()) {
            return response()->json([
                'appointments' => $appointments,
                'filters' => [
                    'search' => $search,
                ],
            ]);
        }

        return Inertia::render('Admin/Appointments/Index', [
            'appointments' => $appointments,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    #[OA\Get(
        path: '/admin/appointments/{appointment}',
        operationId: 'getAppointmentDetails',
        tags: ['Admin'],
        summary: 'Get details of a specific appointment',
        parameters: [
            new OA\Parameter(name: 'appointment', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))
        ],
        responses: [
            new OA\Response(
                response: 200, 
                description: 'Successful operation',
                content: new OA\JsonContent()
            )
        ]
    )]
    public function show(Appointment $appointment)
    {
        if (request()->wantsJson()) {
            return response()->json([
                'appointment' => $appointment->load(['service', 'timeSlot', 'user']),
            ]);
        }

        return Inertia::render('Admin/Appointments/Show', [
            'appointment' => $appointment->load(['service', 'timeSlot', 'user']),
        ]);
    }

    #[OA\Patch(
        path: '/admin/appointments/{appointment}/status',
        operationId: 'updateAppointmentStatus',
        tags: ['Admin'],
        summary: 'Update the status of an appointment',
        parameters: [
            new OA\Parameter(name: 'appointment', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))
        ],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['status'],
                properties: [
                    new OA\Property(property: 'status', type: 'string', enum: ['pending', 'confirmed', 'cancelled', 'completed'])
                ]
            )
        ),
        responses: [
            new OA\Response(
                response: 200, 
                description: 'Appointment status updated successfully',
                content: new OA\JsonContent()
            )
        ]
    )]
    public function updateStatus(Request $request, Appointment $appointment)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled,completed',
        ]);

        \Illuminate\Support\Facades\DB::transaction(function () use ($appointment, $validated) {
            $appointment->update($validated);

            if ($validated['status'] === 'cancelled') {
                $appointment->timeSlot->update([
                    'status' => 'available',
                    'is_booked' => false,
                ]);
            } else {
                // If moving away from cancelled, ensure slot is reserved
                $appointment->timeSlot->update([
                    'status' => 'reserved',
                    'is_booked' => true,
                ]);
            }
        });

        if ($request->wantsJson()) {
            return response()->json([
                'message' => "Appointment status updated to {$validated['status']}.",
                'appointment' => $appointment->load(['service', 'timeSlot']),
            ]);
        }

        return back()->with('success', "Appointment status updated to {$validated['status']}.");
    }
}
