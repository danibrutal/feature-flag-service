<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\FeatureFlagController;

Route::get('/feature-flags', [FeatureFlagController::class, 'index']);
