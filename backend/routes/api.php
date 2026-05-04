<?php

use App\Http\Controllers\Api\DamageReportController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\FeatureFlagController;

Route::get('/feature-flags', [FeatureFlagController::class, 'index']);

Route::apiResource('reports', DamageReportController::class)
    ->only(['index', 'show', 'store', 'update']);
