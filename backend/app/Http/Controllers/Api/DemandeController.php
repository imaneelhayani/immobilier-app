<?php

namespace App\Http\Controllers\Api;

use App\Models\Demande;
use App\Models\Immobilier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB; // ✅ ضروري هادا
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
    public function userDemandes(Request $request)
{
    $user = $request->user();

    $demandes = $user->demandes()->with('immobilier')->get();

    return response()->json($demandes);
}
public function destroy(Request $request, $id)
{
    $user = $request->user();

    $demande = Demande::find($id);

    if (!$demande) {
        return response()->json(['message' => 'Demande introuvable'], 404);
    }

    // Vérifier que la demande appartient bien à l'utilisateur connecté
    if ($demande->user_id !== $user->id) {
        return response()->json(['message' => "Vous n'êtes pas autorisé à supprimer cette demande"], 403);
    }

    // On autorise la suppression uniquement si le statut est "en_attente"
    if ($demande->status !== 'en_attente') {
        return response()->json(['message' => "La demande ne peut être supprimée car son statut n'est pas 'en_attente'"], 403);
    }

    $demande->delete();

    return response()->json(['message' => 'Demande supprimée avec succès']);
}

public function stats()
{
    $topVilles = DB::table('demandes')
        ->join('immobiliers', 'demandes.immobilier_id', '=', 'immobiliers.id')
        ->select('immobiliers.ville', DB::raw('count(*) as total'))
        ->groupBy('immobiliers.ville')
        ->orderByDesc('total')
        ->limit(5)
        ->get();

    $topTypes = Demande::select('etat_transation as type', \DB::raw('count(*) as total'))
        ->groupBy('etat_transation')
        ->orderByDesc('total')
        ->get();

    return response()->json([
        'top_villes' => $topVilles,
        'top_types' => $topTypes,
    ]);
}


}
