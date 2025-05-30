<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;  // ضروري هادي باش تستعمل $request->user()
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\ImmobilierController;
use App\Http\Controllers\Api\PropertyController;
use App\Http\Controllers\Api\DemandeController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\NotificationController;
Route::get('/properties/total', [PropertyController::class, 'getTotalProperties']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [LoginController::class, 'login'])->name('login');
Route::get('/immobiliers/filter', [ImmobilierController::class, 'filter']);
Route::get('/immobiliers', [ImmobilierController::class, 'index']);
Route::get('/immobiliers/{id}', [ImmobilierController::class, 'show']);
Route::put('/immobiliers/{id}', [ImmobilierController::class, 'update']);
Route::delete('/immobiliers/{id}', [ImmobilierController::class, 'destroy']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/immobiliers', [PropertyController::class, 'store']);
    Route::post('/demandes', [DemandeController::class, 'store']);
   Route::get('/user', function (Request $request) {
    return $request->user()->load('demandes.immobilier');
});

    Route::get('/demandes', function (Request $request) {
        return $request->user()->demandes()->with('immobilier')->get();
    });
});

Route::post('/contacts', [ContactController::class, 'store']);
Route::get('/demandes', [DemandeController::class, 'index']);
Route::patch('/demandes/{id}/status', [DemandeController::class, 'updateStatus']);

// routes sécurisées par auth:sanctum
Route::middleware('auth:sanctum')->group(function () {

    // جلب جميع الإشعارات ديال المستخدم
    Route::get('/notifications', [NotificationController::class, 'index']);

    // تأشير إشعار واحد كمقروء
    Route::put('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);

    // تأشير جميع الإشعارات كمقروءة
    Route::post('/notifications/mark-all-read', [NotificationController::class, 'markAllRead']);

    // إنشاء إشعار جديد (مثلاً من الأدمين)
    Route::post('/notifications', [NotificationController::class, 'store']);
    Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user/demandes', [DemandeController::class, 'userDemandes']);
});
Route::middleware('auth:sanctum')->group(function () {
    // ...

    Route::delete('/demandes/{id}', [DemandeController::class, 'destroy']);

    // ...
});


});
Route::middleware('auth:sanctum')->get('/contact', [ContactController::class, 'index']);
Route::delete('/contact/{id}', [ContactController::class, 'destroy']);
Route::get('/properties/stats', [PropertyController::class, 'stats']);
Route::get('/demandes/stats', [DemandeController::class, 'stats']);


