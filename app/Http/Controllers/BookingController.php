<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

use App\Models\Service;
use App\Models\TimeSlot;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function index()
    {
        return Inertia::render('Public/Home');
    }

    #[OA\Get(
        path: '/api/services',
        operationId: 'getServices',
        tags: ['Public'],
        summary: 'Get available services',
        responses: [
            new OA\Response(
                response: 200,
                description: 'Successful operation'
            )
        ]
    )]
    public function services()
    {
        return Inertia::render('Public/Services', [
            'services' => Service::where('is_active', true)->paginate(6),
        ]);
    }

    #[OA\Get(
        path: '/book/{service}',
        operationId: 'getServiceDetails',
        tags: ['Public'],
        summary: 'Get service booking page details',
        parameters: [
            new OA\Parameter(name: 'service', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))
        ],
        responses: [
            new OA\Response(response: 200, description: 'Successful operation')
        ]
    )]
    public function show(Service $service)
    {
        return Inertia::render('Book/Show', [
            'service' => $service,
        ]);
    }

    #[OA\Get(
        path: '/api/slots/{service}',
        operationId: 'getAvailableSlots',
        tags: ['Public'],
        summary: 'Get available time slots for a service',
        parameters: [
            new OA\Parameter(name: 'service', in: 'path', required: true, schema: new OA\Schema(type: 'integer')),
            new OA\Parameter(name: 'date', in: 'query', required: true, schema: new OA\Schema(type: 'string', format: 'date'))
        ],
        responses: [
            new OA\Response(response: 200, description: 'Successful operation')
        ]
    )]
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

    #[OA\Get(
        path: '/book/confirm/{service}/{slot}',
        operationId: 'getConfirmationDetails',
        tags: ['Public'],
        summary: 'Get booking confirmation page details',
        parameters: [
            new OA\Parameter(name: 'service', in: 'path', required: true, schema: new OA\Schema(type: 'integer')),
            new OA\Parameter(name: 'slot', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))
        ],
        responses: [
            new OA\Response(response: 200, description: 'Successful operation')
        ]
    )]
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

    #[OA\Post(
        path: '/api/book',
        operationId: 'bookAppointment',
        tags: ['Public'],
        summary: 'Book a new appointment',
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['service_id', 'time_slot_id', 'customer_name', 'customer_email'],
                properties: [
                    new OA\Property(property: 'service_id', type: 'integer'),
                    new OA\Property(property: 'time_slot_id', type: 'integer'),
                    new OA\Property(property: 'customer_name', type: 'string'),
                    new OA\Property(property: 'customer_email', type: 'string'),
                    new OA\Property(property: 'customer_phone', type: 'string')
                ]
            )
        ),
        responses: [
            new OA\Response(response: 201, description: 'Appointment booked successfully'),
            new OA\Response(response: 400, description: 'Bad request')
        ]
    )]
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

    #[OA\Get(
        path: '/booking/{reference}',
        operationId: 'getBookingSuccess',
        tags: ['Public'],
        summary: 'Get appointment success details by reference',
        parameters: [
            new OA\Parameter(name: 'reference', in: 'path', required: true, schema: new OA\Schema(type: 'string'))
        ],
        responses: [
            new OA\Response(response: 200, description: 'Successful operation')
        ]
    )]
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
