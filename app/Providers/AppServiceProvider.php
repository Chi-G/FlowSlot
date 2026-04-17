<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        if ($this->app->environment('production')) {
            $rootUrl = config('app.url');
            \Illuminate\Support\Facades\URL::forceRootUrl($rootUrl);
            \Illuminate\Support\Facades\URL::forceScheme('https');
            
            // Force asset URL to match app URL to fix subdirectory issues
            config(['app.asset_url' => $rootUrl]);

            // Ensure the request URI is correctly identified for routing
            if (isset($_SERVER['REQUEST_URI'])) {
                $this->app['request']->server->set('REQUEST_URI', $_SERVER['REQUEST_URI']);
            }
        }

        \Illuminate\Support\Facades\Event::listen(
            \App\Events\BookingCreated::class,
            \App\Listeners\SendBookingNotifications::class,
        );
    }
}
