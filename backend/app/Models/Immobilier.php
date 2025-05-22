<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Immobilier extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'surface',
        'nbr_chambres',
        'etat',
        'prix',
        'adresse',
    ];
}
