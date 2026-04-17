<?php

/**
 * PRODUCTION FIX SCRIPT
 * This script clears Laravel caches to ensure subdirectory settings are applied.
 * 
 * Usage: 
 * 1. Upload to /public/fix_production.php
 * 2. Visit https://forahia.com/flowslot/fix_production.php
 * 3. DELETE THE FILE IMMEDIATELY AFTER USE.
 */

define('LARAVEL_START', microtime(true));

// Load Laravel
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
);

echo "<h1>Production Fix Utility</h1>";

echo "<h2>1. Clearing Caches</h2>";
try {
    Artisan::call('config:clear');
    echo "<p>✅ Config cache cleared.</p>";
    
    Artisan::call('cache:clear');
    echo "<p>✅ Application cache cleared.</p>";
    
    Artisan::call('view:clear');
    echo "<p>✅ View cache cleared.</p>";
    
    Artisan::call('route:clear');
    echo "<p>✅ Route cache cleared.</p>";
} catch (Exception $e) {
    echo "<p>❌ Error clearing caches: " . $e->getMessage() . "</p>";
}

echo "<h2>2. Environment Check</h2>";
echo "<ul>";
echo "<li><strong>APP_ENV:</strong> " . app()->environment() . "</li>";
echo "<li><strong>APP_URL:</strong> " . config('app.url') . "</li>";
echo "<li><strong>ASSET_URL:</strong> " . (config('app.asset_url') ?: '<em>(null - using default)</em>') . "</li>";
echo "<li><strong>Subdirectory check:</strong> Request URI: " . $_SERVER['REQUEST_URI'] . "</li>";
echo "</ul>";

echo "<h2>3. Build Directory Check</h2>";
$manifestPath = public_path('build/manifest.json');
if (file_exists($manifestPath)) {
    echo "<p>✅ manifest.json found at: $manifestPath</p>";
    $manifest = json_decode(file_get_contents($manifestPath), true);
    echo "<pre>First 10 items in manifest:\n";
    print_r(array_slice($manifest, 0, 10));
    echo "</pre>";
} else {
    echo "<p>❌ manifest.json NOT FOUND at: $manifestPath</p>";
    // List directory content
    echo "<p>Contents of public/build:</p><pre>";
    $buildDir = public_path('build');
    if (is_dir($buildDir)) {
        print_r(scandir($buildDir));
    } else {
        echo "public/build is not a directory.";
    }
    echo "</pre>";
}

echo "<hr><p style='color:red;'><strong>ACTION REQUIRED: DELETING THIS SCRIPT FOR SECURITY.</strong></p>";
// Attempt to self-delete
// unlink(__FILE__); 
// (Commented out so user can see output first, but reminded to delete).
