<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

use OpenApi\Attributes as OA;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    #[OA\Post(
        path: '/admin/login',
        operationId: 'login',
        tags: ['Auth'],
        summary: 'Log in a user',
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['email', 'password'],
                properties: [
                    new OA\Property(property: 'email', type: 'string', format: 'email'),
                    new OA\Property(property: 'password', type: 'string', format: 'password'),
                    new OA\Property(property: 'remember', type: 'boolean')
                ]
            )
        ),
        responses: [
            new OA\Response(
                response: 200, 
                description: 'Logged in successfully',
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: 'message', type: 'string', example: 'Logged in successfully'),
                        new OA\Property(property: 'redirect', type: 'string', example: '/admin/dashboard')
                    ]
                )
            ),
            new OA\Response(response: 401, description: 'Unauthorized')
        ]
    )]
    public function store(LoginRequest $request)
    {
        $request->authenticate();

        $request->session()->regenerate();

        if ($request->wantsJson()) {
            return response()->json([
                'message' => 'Logged in successfully',
                'redirect' => route('dashboard', absolute: false)
            ]);
        }

        return redirect()->intended(route('dashboard', absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    #[OA\Post(
        path: '/admin/logout',
        operationId: 'logout',
        tags: ['Auth'],
        summary: 'Log out the current user',
        responses: [
            new OA\Response(
                response: 200, 
                description: 'Logged out successfully',
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: 'message', type: 'string', example: 'Logged out successfully')
                    ]
                )
            )
        ]
    )]
    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        if ($request->wantsJson()) {
            return response()->json([
                'message' => 'Logged out successfully'
            ]);
        }

        return redirect('/');
    }
}
