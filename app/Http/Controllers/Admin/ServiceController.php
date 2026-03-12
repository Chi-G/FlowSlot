<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Service;
use Inertia\Inertia;

use OpenApi\Attributes as OA;

class ServiceController extends Controller
{
    #[OA\Get(
        path: '/admin/services',
        operationId: 'listServices',
        tags: ['Admin'],
        summary: 'List all services managed by admin',
        responses: [
            new OA\Response(response: 200, description: 'Successful operation')
        ]
    )]
    public function index()
    {
        return Inertia::render('Admin/Services/Index', [
            'services' => Service::all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Services/Create');
    }

    #[OA\Post(
        path: '/admin/services',
        operationId: 'createService',
        tags: ['Admin'],
        summary: 'Create a new service',
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['name', 'description', 'duration_minutes', 'price', 'color_code'],
                properties: [
                    new OA\Property(property: 'name', type: 'string'),
                    new OA\Property(property: 'description', type: 'string'),
                    new OA\Property(property: 'duration_minutes', type: 'integer'),
                    new OA\Property(property: 'price', type: 'number'),
                    new OA\Property(property: 'color_code', type: 'string'),
                    new OA\Property(property: 'is_active', type: 'boolean')
                ]
            )
        ),
        responses: [
            new OA\Response(response: 201, description: 'Service created successfully')
        ]
    )]
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'duration_minutes' => 'required|integer|min:5',
            'price' => 'required|numeric|min:0',
            'color_code' => 'required|string|regex:/^#[0-9A-Fa-f]{6}$/',
            'is_active' => 'boolean',
        ]);

        Service::create($validated);

        return redirect()->route('admin.services.index')->with('success', 'Service created successfully.');
    }

    public function edit(Service $service)
    {
        return Inertia::render('Admin/Services/Edit', [
            'service' => $service,
        ]);
    }

    #[OA\Put(
        path: '/admin/services/{service}',
        operationId: 'updateService',
        tags: ['Admin'],
        summary: 'Update an existing service',
        parameters: [
            new OA\Parameter(name: 'service', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))
        ],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                properties: [
                    new OA\Property(property: 'name', type: 'string'),
                    new OA\Property(property: 'description', type: 'string'),
                    new OA\Property(property: 'duration_minutes', type: 'integer'),
                    new OA\Property(property: 'price', type: 'number'),
                    new OA\Property(property: 'color_code', type: 'string'),
                    new OA\Property(property: 'is_active', type: 'boolean')
                ]
            )
        ),
        responses: [
            new OA\Response(response: 200, description: 'Service updated successfully')
        ]
    )]
    public function update(Request $request, Service $service)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'duration_minutes' => 'required|integer|min:5',
            'price' => 'required|numeric|min:0',
            'color_code' => 'required|string|regex:/^#[0-9A-Fa-f]{6}$/',
            'is_active' => 'boolean',
        ]);

        $service->update($validated);

        return redirect()->route('admin.services.index')->with('success', 'Service updated successfully.');
    }

    #[OA\Delete(
        path: '/admin/services/{service}',
        operationId: 'deleteService',
        tags: ['Admin'],
        summary: 'Delete a service',
        parameters: [
            new OA\Parameter(name: 'service', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))
        ],
        responses: [
            new OA\Response(response: 200, description: 'Service deleted successfully')
        ]
    )]
    public function destroy(Service $service)
    {
        $service->delete();
        return redirect()->route('admin.services.index')->with('success', 'Service deleted successfully.');
    }
}
