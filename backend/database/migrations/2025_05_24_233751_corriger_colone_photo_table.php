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
        Schema::table('immobiliers', function (Blueprint $table) {
            // تعديل عمود الصور باش يكون نص طويل
$table->text('photo')->nullable()->change(); // غادي نخزن أسماء الصور في JSON

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('immobiliers', function (Blueprint $table) {
            //
        });
    }
};
