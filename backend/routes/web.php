<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\FeatureFlagController;

Route::get('/', function () {
    return view('welcome');
});

Route::prefix('admin')->name('admin.')->group(function () {
    Route::resource('feature-flags', FeatureFlagController::class);
});
