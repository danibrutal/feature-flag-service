<?php

namespace Database\Seeders;

use App\Models\DamageReport;
use Illuminate\Database\Seeder;

class DamageReportSeeder extends Seeder
{
    public function run(): void
    {
        $reports = [
            [
                'id' => 1,
                'title' => 'Front bumper damage',
                'vehicle' => 'Toyota Yaris',
                'status' => 'submitted',
                'description' => 'Front bumper has scratches and a small dent after parking incident.',
                'damage_severity' => 'medium',
            ],
            [
                'id' => 2,
                'title' => 'Rear door scratch',
                'vehicle' => 'Volkswagen Golf',
                'status' => 'draft',
                'description' => 'Visible scratch on rear passenger door.',
                'damage_severity' => 'low',
            ],
        ];

        foreach ($reports as $report) {
            DamageReport::updateOrCreate(
                ['id' => $report['id']],
                $report,
            );
        }
    }
}
