<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FeatureFlag;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class FeatureFlagController extends Controller
{
    public function index(Request $request)
    {
        $now = Carbon::now();
        $userId = $request->query('user_id', 'anonymous');
        $cacheKey = "feature-flags:{$userId}";


        return Cache::remember($cacheKey, now()->addSeconds(30), function () use ($userId) {
            $now = Carbon::now();

            $flags = FeatureFlag::all()
                ->mapWithKeys(function (FeatureFlag $flag) use ($now, $userId) {
                    return [
                        $flag->key => $this->evaluateFlag($flag, $now, $userId),
                    ];
                });

            return response()->json($flags);
        });
    }

    private function evaluateFlag(FeatureFlag $flag, Carbon $now, string $userId): bool
    {
        if (!$flag->enabled) {
            return false;
        }

        if ($flag->starts_at && $flag->starts_at->gt($now)) {
            return false;
        }

        if ($flag->ends_at && $flag->ends_at->lt($now)) {
            return false;
        }

        if ($flag->rollout_type === 'boolean') {
            return true;
        }

        if ($flag->rollout_type === 'percentage') {
            return $this->isUserInPercentageRollout(
                $userId,
                $flag->key,
                (int) $flag->rollout_value
            );
        }

        return false;
    }

    // basic way to determine whether a user is included for a flag
    private function isUserInPercentageRollout(string $userId, string $flagKey, int $percentage): bool
    {
        if ($percentage <= 0) {
            return false;
        }

        if ($percentage >= 100) {
            return true;
        }

        $hash = crc32($userId . ':' . $flagKey);
        $bucket = $hash % 100;

        return $bucket < $percentage;
    }
}
