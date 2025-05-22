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
        if ($request->has('type') && $request->type != '') {
            $query->where('type', $request->type);
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
}
