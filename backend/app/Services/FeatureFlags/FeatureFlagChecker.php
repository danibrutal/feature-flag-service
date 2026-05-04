<?php

namespace App\Services\FeatureFlags;

class FeatureFlagChecker
{
    public function __construct(
        private FeatureFlagEvaluator $evaluator
    ) {}

    public function isEnabled(string $key, string $userId = 'anonymous'): bool
    {
        $flags = $this->evaluator->evaluateForUser($userId);

        return $flags[$key] ?? false;
    }

    /**
     * To use like $checker->abortIfDisabled('allow_report_update');
     */
    public function abortIfDisabled(string $key, string $userId = 'anonymous'): void
    {
        if (! $this->isEnabled($key, $userId)) {
            abort(403, 'This feature is no longer available.');
        }
    }
}
