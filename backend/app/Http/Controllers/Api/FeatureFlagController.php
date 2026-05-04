<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\FeatureFlags\FeatureFlagEvaluator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class FeatureFlagController extends Controller
{
    public function __construct(private FeatureFlagEvaluator $evaluator)
    {
    }

    public function index(Request $request)
    {
        $userId = $request->query('user_id', 'anonymous');

        $flags = Cache::remember(
            "feature-flags:{$userId}",
            now()->addSeconds(30),
            fn () => $this->evaluator->evaluateForUser($userId)
        );

        return response()->json($flags);
    }
}
