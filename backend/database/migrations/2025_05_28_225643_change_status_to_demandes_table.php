<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::table('demandes', function (Blueprint $table) {
        $table->string('status')->default('en_attente')->change(); // en_attente | accepté | refusé
    });
}

public function down()
{
    Schema::table('demandes', function (Blueprint $table) {
        $table->dropColumn('status');
    });
}

};
