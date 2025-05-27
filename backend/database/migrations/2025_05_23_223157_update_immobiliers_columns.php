<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateImmobiliersColumns extends Migration
{
    public function up()
    {
        Schema::table('immobiliers', function (Blueprint $table) {
            // تعديل الأعمدة الموجودة
            $table->enum('type', ['maison', 'villa', 'appartement', 'berau', 'local_commercial'])->change();
            $table->enum('etat', ['disponible', 'vendue', 'en_negociation'])->change();
            $table->enum('ville', ['tanger', 'casa', 'rabat', 'marrakech', 'fes'])->change();

            // إضافة أعمدة جديدة
            $table->decimal('prix_min', 12, 2)->nullable()->after('prix');
            $table->decimal('prix_max', 12, 2)->nullable()->after('prix_min');
            $table->integer('nbr_salles_bain')->unsigned()->default(1)->after('nbr_chambres');
        });
    }

    public function down()
    {
        Schema::table('immobiliers', function (Blueprint $table) {
            // استرجاع القيم القديمة
            $table->enum('type', ['maison', 'appartement', 'villa'])->change();
            $table->enum('etat', ['disponible', 'non_disponible'])->change();
            $table->string('ville')->change();

            // حذف الأعمدة الجديدة
            $table->dropColumn(['prix_min', 'prix_max', 'nbr_salles_bain']);
        });
    }
}
