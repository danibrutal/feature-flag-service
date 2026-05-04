<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FeatureFlag;
use Illuminate\Support\Carbon;

class FeatureFlagController extends Controller
{
    public function index()
    {
        $now = Carbon::now();

        $flags = FeatureFlag::all()
            ->mapWithKeys(function (FeatureFlag $flag) use ($now) {
                $isActive =
                    $flag->enabled &&
                    (!$flag->starts_at || $flag->starts_at->lte($now)) &&
                    (!$flag->ends_at || $flag->ends_at->gte($now));

                return [
                    $flag->key => $isActive,
                ];
            });

        return response()->json($flags);
    }
}
