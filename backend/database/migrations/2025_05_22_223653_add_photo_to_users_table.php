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
    Schema::table('immobiliers', function (Blueprint $table) {
        $table->string('ville')->nullable();
        $table->string('photo')->nullable();
    });
}

public function down()
{
    Schema::table('immobiliers', function (Blueprint $table) {
        $table->dropColumn(['ville', 'photo']);
    });
}

};
