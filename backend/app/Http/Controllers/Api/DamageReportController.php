<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DamageReport;
use App\Services\FeatureFlags\FeatureFlagChecker;
use Illuminate\Http\Request;

class DamageReportController extends Controller
{
    public function index()
    {
        return DamageReport::latest()->get();
    }

    public function show(DamageReport $report)
    {
        return $report;
    }

    public function store(Request $request, FeatureFlagChecker $checker)
    {
        $checker->abortIfDisabled('allow_report_create');

        $data = $request->validate([
            'title' => ['required', 'string'],
            'vehicle' => ['required', 'string'],
            'description' => ['required', 'string'],
            'damage_severity' => ['required', 'in:low,medium,high'],
        ]);

        return DamageReport::create($data);
    }

    public function update(Request $request, DamageReport $report, FeatureFlagChecker $checker)
    {
        $checker->abortIfDisabled('allow_report_update');

        $data = $request->validate([
            'title' => ['required', 'string'],
            'vehicle' => ['required', 'string'],
            'description' => ['required', 'string'],
            'damage_severity' => ['required', 'in:low,medium,high'],
        ]);

        $report->update($data);

        return $report;
    }
}
