<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateImmobiliersTable extends Migration
{
    public function up()
    {
        Schema::create('immobiliers', function (Blueprint $table) {
            $table->id();

            // نوع العقار: maison, appartement, villa
            $table->enum('type', ['maison', 'appartement', 'villa']);

            // المساحة
            $table->integer('surface')->unsigned();

            // عدد الغرف
            $table->integer('nbr_chambres')->unsigned();

            // الحالة: disponible أو غير متاح
            $table->enum('etat', ['disponible', 'non_disponible'])->default('disponible');

            // الثمن
            $table->decimal('prix', 12, 2);

            // العنوان
            $table->string('adresse');

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('immobiliers');
    }
}
