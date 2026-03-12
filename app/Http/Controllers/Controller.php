<?php

namespace App\Http\Controllers;

use OpenApi\Attributes as OA;

#[OA\Info(
    title: "FlowSlot API Documentation",
    version: "1.0.0",
    description: "Comprehensive API documentation for the FlowSlot Enterprise Appointment Booking System.",
    contact: new OA\Contact(email: "admin@flowslot.forahia.org.ng")
)]
#[OA\Server(
    url: "https://flowslot.forahia.org.ng",
    description: "Live Production Server"
)]
#[OA\Server(
    url: "http://127.0.0.1:8000",
    description: "Local Development Server"
)]
abstract class Controller
{
    //
}
