<?php

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Config;

/**
 * Emergency Cache Cleanup
 * This script clears Laravel caches programmatically via the browser.
 */

// 1. Manually bootstrap Laravel
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$kernel->handle(Illuminate\Http\Request::capture());

echo "<h1>FlowSlot Emergency Cache Cleanup</h1>";

function runArtisan($command) {
    echo "Running 'php artisan $command'... ";
    try {
        Artisan::call($command);
        echo "<b style='color:green'>SUCCESS</b><br>";
        echo "<pre>" . Artisan::output() . "</pre>";
    } catch (\Exception $e) {
        echo "<b style='color:red'>FAILED: " . $e->getMessage() . "</b><br>";
    }
}

// Clear caches
runArtisan('config:clear');
runArtisan('route:clear');
runArtisan('view:clear');
runArtisan('cache:clear');

echo "<h2>Environment Status</h2>";
echo "APP_URL: " . config('app.url') . "<br>";
echo "ASSET_URL: " . config('app.asset_url') . "<br>";
echo "APP_ENV: " . config('app.env') . "<br>";

echo "<h2>Server Variables</h2>";
echo "REQUEST_URI: " . $_SERVER['REQUEST_URI'] . "<br>";
echo "SCRIPT_NAME: " . $_SERVER['SCRIPT_NAME'] . "<br>";

echo "<br><hr><p style='color:orange'>DELETE THIS FILE (public/emergency_clear.php) AFTER VERIFICATION!</p>";
