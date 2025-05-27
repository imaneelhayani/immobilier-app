<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Immobilier;

class ImmobilierController extends Controller
{
    public function filter(Request $request)
    {
        $query = Immobilier::query();

        // فلترة حسب النوع (type)
        if ($request->has('nbr_chambres') && $request->nbr_chambres != '') {
            $query->where('nbr_chambres', $request->nbr_chambres);
        }
        if ($request->has('nbr_salles_bain') && $request->nbr_salles_bain != '') {
            $query->where('nbr_salles_bain', $request->nbr_salles_bain);
        }
        if ($request->has('type') && $request->type != '') {
            $query->where('type', $request->type);
        }
        if ($request->has('ville') && $request->ville != '') {
        $query->where('ville', $request->ville);
    }
        // فلترة حسب المساحة الدنيا (surface_min)
        if ($request->has('surface_min') && is_numeric($request->surface_min)) {
            $query->where('surface', '>=', $request->surface_min);
        }

        // فلترة حسب المساحة القصوى (surface_max)
        if ($request->has('surface_max') && is_numeric($request->surface_max)) {
            $query->where('surface', '<=', $request->surface_max);
        }

        // نقدر نزيد فلترة أخرى إلا بغيتي (مثلا السعر، الحالة...)

        $immobiliers = $query->get();

        return response()->json([
            'success' => true,
            'data' => $immobiliers
        ]);
    }
    public function index()
    {
        $immobiliers = Immobilier::all();
        return response()->json($immobiliers);
    }
    public function show($id)
{
    $immobilier = Immobilier::findOrFail($id);
    return response()->json($immobilier);
}

public function update(Request $request, $id)
{
    $immobilier = Immobilier::findOrFail($id);

    $immobilier->update($request->all());

    return response()->json(['message' => 'Propriété modifiée avec succès']);
}

public function destroy($id)
{
    Immobilier::destroy($id);
    return response()->json(['message' => 'Propriété supprimée avec succès']);
}

}
