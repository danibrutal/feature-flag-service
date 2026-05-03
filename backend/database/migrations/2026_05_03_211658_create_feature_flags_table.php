<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('feature_flags', function (Blueprint $table) {
            $table->id();

            $table->string('key')->unique();        // internal identifier
            $table->string('name');                 // human readable

            $table->boolean('enabled')->default(false);

            $table->string('rollout_type')->default('boolean');
            // boolean | percentage | targeted

            $table->integer('rollout_value')->nullable();
            // e.g. 50 for 50%

            $table->timestamp('starts_at')->nullable();
            $table->timestamp('ends_at')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('feature_flags');
    }
};
