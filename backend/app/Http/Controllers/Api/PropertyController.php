<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Immobilier;
use Illuminate\Http\Request;


class PropertyController extends Controller
{
    public function getTotalProperties()
    {
        $total = Immobilier::count();
        $disponible = Immobilier::where('etat', 'disponible')->count();
        $vendue = Immobilier::where('etat', 'vendue')->count();
        $en_negociation = Immobilier::where('etat', 'en_negociation')->count();

        return response()->json([
            'total' => $total,
            'disponible' => $disponible,
            'vendue' => $vendue,
            'en_negociation' => $en_negociation,
        ]);
    }
  public function store(Request $request)
    {
        $request->validate([
            'type' => 'required|string',
            'ville' => 'required|string',
            'adresse' => 'required|string',
            'prix' => 'required|numeric',
            'prix_min' => 'required|numeric',
            'prix_max' => 'required|numeric',
            'surface' => 'required|numeric',
            'nbr_chambres' => 'required|integer',
            'nbr_salles_bain' => 'required|integer',
            'etat' => 'required|string',
            'etat_transation' => 'required|string',
            'description' => 'nullable|string',
            'caracteristiques' => 'nullable|array',
            'photo' => 'nullable|array',
            'photo.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $imagePaths = [];
        if ($request->hasFile('photo')) {
            foreach ($request->file('photo') as $file) {
                $path = $file->store('uploads', 'public');
                $imagePaths[] = $path;
            }
        }

        $propriete = Immobilier::create([
            'type' => $request->type,
            'ville' => $request->ville,
            'adresse' => $request->adresse,
            'prix' => $request->prix,
            'prix_min' => $request->prix_min,
            'prix_max' => $request->prix_max,
            'surface' => $request->surface,
            'nbr_chambres' => $request->nbr_chambres,
            'nbr_salles_bain' => $request->nbr_salles_bain,
            'etat' => $request->etat,
            'etat_transation' => $request->etat_transation,
            'description' => $request->description,
            'caracteristiques' => $request->caracteristiques,
            'photo' => $imagePaths,
        ]);

        return response()->json(['message' => 'Propriété ajoutée avec succès', 'data' => $propriete]);
    }
public function stats()
{
    $stats = [
        'location_vs_vente' => Immobilier::select('type', \DB::raw('count(*) as total'))
            ->groupBy('type')
            ->get(),

        'top_villes' => Immobilier::select('ville', \DB::raw('count(*) as total'))
            ->groupBy('ville')
            ->orderBy('total', 'desc')
            ->get()
    ];

    return response()->json($stats);
}



}
