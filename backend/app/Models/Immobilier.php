<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Immobilier extends Model
{
    protected $fillable = [
        'type', 'ville', 'adresse', 'prix', 'prix_min', 'prix_max', 'surface',
        'nbr_chambres', 'nbr_salles_bain', 'etat', 'etat_transation',
        'description', 'caracteristiques', 'photo'
    ];

    protected $casts = [
        'photo' => 'array',
        'caracteristiques' => 'array',  // إذا كانت كذلك مصفوفة في DB
    ];
}