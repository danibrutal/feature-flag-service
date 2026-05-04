<?php

namespace App\Services\FeatureFlags;

use App\Models\FeatureFlag;
use Illuminate\Support\Carbon;

class FeatureFlagEvaluator
{
    /**
     * @return array<string, bool>
     */
    public function evaluateForUser(string $userId): array
    {
        $now = Carbon::now();

        return FeatureFlag::all()
            ->mapWithKeys(fn (FeatureFlag $flag) => [
                $flag->key => $this->evaluateFlag($flag, $now, $userId),
            ])
            ->all();
    }

    private function evaluateFlag(FeatureFlag $flag, Carbon $now, string $userId): bool
    {
        if (! $flag->enabled) {
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
