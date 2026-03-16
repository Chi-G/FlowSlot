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

    Route::get('/notifications', [\App\Http\Controllers\Admin\NotificationController::class, 'index'])->name('notifications.index');
    Route::post('/notifications/{id}/read', [\App\Http\Controllers\Admin\NotificationController::class, 'markAsRead'])->name('notifications.markAsRead');
    Route::post('/notifications/mark-all-read', [\App\Http\Controllers\Admin\NotificationController::class, 'markAllAsRead'])->name('notifications.markAllAsRead');

    Route::get('/test-mail', function () {
        $user = auth()->user();
        $mailer = config('mail.default');
        $host = config('mail.mailers.smtp.host');
        $smtpUser = config('mail.mailers.smtp.username');
        $testEmail = request('email', $user->email);
        
        try {
            // Use notifyNow to ensure it's synchronous and gives immediate feedback
            \Illuminate\Support\Facades\Notification::route('mail', $testEmail)
                ->notifyNow(new \App\Notifications\BookingConfirmedNotification(\App\Models\Appointment::latest()->first() ?? new \App\Models\Appointment()));
            
            return "<h3>Diagnostic Result: SUCCESS</h3>" .
                   "<p>The application successfully connected to the SMTP server and handed over the mail.</p>" .
                   "<b>Recipient:</b> {$testEmail}<br>" .
                   "<b>SMTP Host:</b> <code style='color:blue'>{$host}</code><br>" .
                   "<b>SMTP User:</b> {$smtpUser}<br>" .
                   "<b>Driver:</b> {$mailer}<br><br>" .
                   "<b>If you don't see it in Gmail:</b><br>" .
                   "1. Check Spam.<br>" .
                   "2. If the Host above is <u>mailtrap.io</u>, it's NOT going to Gmail (check Mailtrap).<br>" .
                   "3. If the Host is your domain, then Gmail is rejecting it (usually SPF/DKIM issues).";
        } catch (\Exception $e) {
            return "<h3>Diagnostic Result: FAILED</h3>" .
                   "<b>Target Recipient:</b> {$testEmail}<br>" .
                   "<b>SMTP Host:</b> <code style='color:red'>{$host}</code><br>" .
                   "<b>Error:</b> " . $e->getMessage();
        }
    })->name('test-mail');
});

Route::prefix('admin')->group(function () {
    require __DIR__.'/auth.php';
});
