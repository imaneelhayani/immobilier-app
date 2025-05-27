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
        $table->enum('etat_transation', ['louer', 'acheter'])->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        
        Schema::table('immobiliers', function (Blueprint $table) {
            $table->dropColumn('etat_transation');
        });
    }
};
