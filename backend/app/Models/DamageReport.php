<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DamageReport extends Model
{
    protected $fillable = [
        'title',
        'vehicle',
        'status',
        'damage_severity',
        'description',
    ];
}
