<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    // Table si smitha ghir contacts, ma khassekch t3tih smiya (default)
    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'message',
        'telephone',
    ];
}
