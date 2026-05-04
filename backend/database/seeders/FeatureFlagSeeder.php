<?php

namespace Database\Seeders;

use App\Models\FeatureFlag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FeatureFlagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * Some basic feature flags for show casing the system
     */
    public function run(): void
    {
        $flags = [
            [
                'key' => 'show_photo_upload',
                'name' => 'Show photo upload',
                'enabled' => true,
                'rollout_type' => 'boolean',
            ],
            [
                'key' => 'show_damage_severity_badge',
                'name' => 'Show damage severity badge',
                'enabled' => true,
                'rollout_type' => 'boolean',
            ],
            [
                'key' => 'show_internal_notes_panel',
                'name' => 'Show internal notes panel',
                'enabled' => false,
                'rollout_type' => 'boolean',
            ],
            [
                'key' => 'allow_report_create',
                'name' => 'Allow report creation',
                'enabled' => true,
                'rollout_type' => 'boolean',
            ],
            [
                'key' => 'allow_report_update',
                'name' => 'Allow report update',
                'enabled' => true,
                'rollout_type' => 'boolean',
            ],
            [
                'key' => 'allow_report_pdf_export',
                'name' => 'Allow report PDF export',
                'enabled' => false,
                'rollout_type' => 'boolean',
            ],
        ];

        foreach ($flags as $flag) {
            FeatureFlag::updateOrCreate(
                ['key' => $flag['key']],
                $flag
            );
        }
    }
}
