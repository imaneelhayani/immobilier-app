<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\ImmobilierController;
use App\Http\Controllers\Api\PropertyController;
use App\Http\Controllers\Api\DemandeController;

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
});
use App\Http\Controllers\Api\ContactController;

Route::post('/contacts', [ContactController::class, 'store']);
