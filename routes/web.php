<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/dashboard', function () {
    return redirect()->route('admin.dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/', [\App\Http\Controllers\BookingController::class, 'index'])->name('booking.index');
Route::get('/services', [\App\Http\Controllers\BookingController::class, 'services'])->name('services');

Route::get('/book/{service}', [\App\Http\Controllers\BookingController::class, 'show'])->name('booking.show');
Route::get('/api/available-dates/{service}', [\App\Http\Controllers\BookingController::class, 'getAvailableDates']);
Route::get('/api/slots/{service}', [\App\Http\Controllers\BookingController::class, 'getSlots']);
Route::post('/api/book', [\App\Http\Controllers\BookingController::class, 'store']);

Route::get('/book/confirm/{service}/{slot}', [\App\Http\Controllers\BookingController::class, 'confirm'])->name('booking.confirm');
Route::get('/booking/{reference}', [\App\Http\Controllers\BookingController::class, 'success'])->name('booking.success');

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');
    Route::resource('services', \App\Http\Controllers\Admin\ServiceController::class);
    Route::resource('appointments', \App\Http\Controllers\Admin\AppointmentController::class);
    Route::patch('/appointments/{appointment}/status', [\App\Http\Controllers\Admin\AppointmentController::class, 'updateStatus'])->name('appointments.updateStatus');
    Route::get('/slots/generate', [\App\Http\Controllers\Admin\SlotGeneratorController::class, 'index'])->name('slots.index');
    Route::post('/slots/generate', [\App\Http\Controllers\Admin\SlotGeneratorController::class, 'store'])->name('slots.store');
});

require __DIR__.'/auth.php';
