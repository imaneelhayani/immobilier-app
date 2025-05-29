<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    // جلب جميع الإشعارات ديال المستخدم
    public function index()
    {
        $user = Auth::user();

        $notifications = Notification::where('user_id', $user->id)
                                      ->orderBy('created_at', 'desc')
                                      ->get();

        return response()->json($notifications);
    }

    // تأشير الإشعار كمقروء
    public function markAsRead($id)
    {
        $notification = Notification::where('id', $id)
                                    ->where('user_id', Auth::id())
                                    ->firstOrFail();

        $notification->is_read = true;
        $notification->save();

        return response()->json(['message' => 'Notification marked as read']);
    }

    // إنشاء إشعار جديد (مثلاً الأدمين يرسل إشعار بعد قبول الطلب)
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'title' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $notification = Notification::create([
            'user_id' => $request->user_id,
            'title' => $request->title,
            'message' => $request->message,
            'is_read' => false,
        ]);

        return response()->json($notification, 201);
    }

    // تأشير جميع الإشعارات كمقروءة دفعة وحدة
    public function markAllRead()
    {
        $user = Auth::user();

        Notification::where('user_id', $user->id)
                    ->where('is_read', false)
                    ->update(['is_read' => true]);

        return response()->json(['message' => 'All notifications marked as read']);
    }
}
