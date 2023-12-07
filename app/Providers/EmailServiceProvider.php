<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\EmailService;

class EmailServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(EmailService::class, function ($app) {
            return new EmailService();
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
