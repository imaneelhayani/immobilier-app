<?php

namespace App\Http\Controllers\Api;

use App\Models\Demande;
use App\Models\Immobilier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class DemandeController extends Controller
{
    

    public function store(Request $request)
    {
        // Validation ديال البيانات
        $request->validate([
            'immobilier_id' => 'required|exists:immobiliers,id',
            'nom' => 'nullable|string|max:255',
            'prenom' => 'nullable|string|max:255',
            'telephone' => 'nullable|string|max:20',
            'adresse' => 'nullable|string|max:500',
        ]);

        // استرجاع المستخدم الحالي
        $user = Auth::user();

        // التأكد من وجود المستخدم
        if (!$user) {
            return response()->json(['message' => 'Vous devez être connecté'], 401);
        }

        // التحقق من وجود العقار
        $immobilier = Immobilier::find($request->immobilier_id);
        if (!$immobilier) {
            return response()->json(['message' => 'Propriété introuvable'], 404);
        }

        // إنشاء طلب جديد
        $demande = Demande::create([
            'user_id' => $user->id,
            'immobilier_id' => $immobilier->id,
            'etat_transation' => $immobilier->etat_transation,
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'telephone' => $request->telephone,
            'adresse' => $request->adresse,
            // 'date_demande' يمكن قاعدة البيانات تضيفها تلقائياً إذا كانت مفعلة timestamps
        ]);

        // إرجاع رسالة نجاح مع بيانات الطلب
        return response()->json([
            'message' => 'Demande enregistrée avec succès',
            'demande' => $demande,
        ]);
    }
}
