<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('immobiliers', function (Blueprint $table) {
            // عمود json لتخزين لائحة المميزات
            $table->json('caracteristiques')->nullable();
            $table->text('description')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('immobiliers', function (Blueprint $table) {
            $table->dropColumn('caracteristiques');
            $table->dropColumn('description');
        });
    }
};
