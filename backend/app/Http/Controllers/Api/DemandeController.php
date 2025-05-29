<?php

namespace App\Http\Controllers\Api;

use App\Models\Demande;
use App\Models\Immobilier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\Notification;

class DemandeController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'immobilier_id' => 'required|exists:immobiliers,id',
            'nom' => 'nullable|string|max:255',
            'prenom' => 'nullable|string|max:255',
            'telephone' => 'nullable|string|max:20',
            'adresse' => 'nullable|string|max:500',
        ]);

        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Vous devez être connecté'], 401);
        }

        $immobilier = Immobilier::find($request->immobilier_id);
        if (!$immobilier) {
            return response()->json(['message' => 'Propriété introuvable'], 404);
        }

        $demande = Demande::create([
            'user_id' => $user->id,
            'immobilier_id' => $immobilier->id,
            'etat_transation' => $immobilier->etat_transation,
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'telephone' => $request->telephone,
            'adresse' => $request->adresse,
        ]);

        return response()->json([
            'message' => 'Demande enregistrée avec succès',
            'demande' => $demande,
        ]);
    }

    public function index()
    {
        $demandes = Demande::with(['user', 'immobilier'])->get();
        return response()->json($demandes);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:accepté,refusé',
        ]);

        $demande = Demande::findOrFail($id);
        $demande->status = $request->status;
        $demande->save();

        // إنشاء Notification للمستخدم
        Notification::create([
            'user_id' => $demande->user_id,
            'title' => 'Mise à jour de votre demande',
            'message' => $request->status === 'accepté'
                ? 'Votre demande a été acceptée. Félicitations !'
                : 'Votre demande a été refusée. Merci de votre intérêt.',
            'is_read' => false,
        ]);

        return response()->json(['message' => 'Statut mis à jour et notification envoyée avec succès']);
    }
}
