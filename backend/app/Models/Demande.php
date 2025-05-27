<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Demande extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'immobilier_id',
        'etat_transation',  // كما هو في قاعدة البيانات
        'nom',
        'prenom',
        'telephone',
        'adresse',
        'date_demande',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function immobilier()
    {
        return $this->belongsTo(Immobilier::class);
    }
}
