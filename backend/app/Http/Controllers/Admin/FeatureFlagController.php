<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FeatureFlag;
use Illuminate\Http\Request;

class FeatureFlagController extends Controller
{
    public function index()
    {
        $flags = FeatureFlag::latest()->get();

        return view('admin.feature-flags.index', compact('flags'));
    }

    public function create()
    {
        return view('admin.feature-flags.create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'key' => ['required', 'string', 'max:255', 'unique:feature_flags,key'],
            'name' => ['required', 'string', 'max:255'],
            'enabled' => ['nullable', 'boolean'],
            'rollout_type' => ['required', 'in:boolean,percentage,targeted'],
            'rollout_value' => ['nullable', 'integer', 'min:0', 'max:100'],
            'starts_at' => ['nullable', 'date'],
            'ends_at' => ['nullable', 'date', 'after_or_equal:starts_at'],
        ]);

        $data['enabled'] = $request->boolean('enabled');

        FeatureFlag::create($data);

        return redirect()
            ->route('admin.feature-flags.index')
            ->with('success', 'Feature flag created.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    public function edit(FeatureFlag $featureFlag)
    {
        return view('admin.feature-flags.edit', compact('featureFlag'));
    }

    public function update(Request $request, FeatureFlag $featureFlag)
    {
        $data = $request->validate([
            'key' => ['required', 'string', 'max:255', 'unique:feature_flags,key,' . $featureFlag->id],
            'name' => ['required', 'string', 'max:255'],
            'enabled' => ['nullable', 'boolean'],
            'rollout_type' => ['required', 'in:boolean,percentage,targeted'],
            'rollout_value' => ['nullable', 'integer', 'min:0', 'max:100'],
            'starts_at' => ['nullable', 'date'],
            'ends_at' => ['nullable', 'date', 'after_or_equal:starts_at'],
        ]);

        $data['enabled'] = $request->boolean('enabled');

        $featureFlag->update($data);

        return redirect()
            ->route('admin.feature-flags.index')
            ->with('success', 'Feature flag updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FeatureFlag $featureFlag)
    {
        $featureFlag->delete();

        return redirect()
            ->route('admin.feature-flags.index')
            ->with('success', 'Feature flag deleted.');
    }
}
