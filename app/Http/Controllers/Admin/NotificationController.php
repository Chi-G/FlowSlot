<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

use OpenApi\Attributes as OA;

class NotificationController extends Controller
{
    #[OA\Get(
        path: '/api/admin/notifications',
        operationId: 'getNotifications',
        tags: ['Admin'],
        summary: 'Get all notifications for the authenticated admin',
        responses: [
            new OA\Response(response: 200, description: 'Successful operation')
        ]
    )]
    public function index(Request $request)
    {
        $notifications = $request->user()->notifications()->paginate(15);

        return Inertia::render('Admin/Notifications/Index', [
            'notifications' => $notifications
        ]);
    }

    #[OA\Post(
        path: '/api/admin/notifications/{id}/read',
        operationId: 'markNotificationAsRead',
        tags: ['Admin'],
        summary: 'Mark a specific notification as read',
        parameters: [
            new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'string'))
        ],
        responses: [
            new OA\Response(response: 200, description: 'Notification marked as read'),
            new OA\Response(response: 404, description: 'Notification not found')
        ]
    )]
    public function markAsRead(Request $request, $id)
    {
        $notification = $request->user()->notifications()->where('id', $id)->first();
        
        if ($notification) {
            $notification->markAsRead();
        }

        return back()->with('success', 'Notification marked as read');
    }

    #[OA\Post(
        path: '/api/admin/notifications/mark-all-read',
        operationId: 'markAllNotificationsAsRead',
        tags: ['Admin'],
        summary: 'Mark all notifications as read for the authenticated admin',
        responses: [
            new OA\Response(response: 200, description: 'All notifications marked as read')
        ]
    )]
    public function markAllAsRead(Request $request)
    {
        $request->user()->unreadNotifications->markAsRead();

        return back()->with('success', 'All notifications marked as read');
    }
}
