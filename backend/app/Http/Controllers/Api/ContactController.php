<?php

namespace App\Http\Controllers\Api;
use Illuminate\Support\Facades\Validator;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Contact;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        // Validation des données
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string',
            'telephone' => 'required|string|max:20',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // Création du contact
        $contact = Contact::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Message envoyé avec succès',
            'data' => $contact
        ], 201);
    }
    public function index()
{
    $contacts = Contact::latest()->get(); // tu peux ajouter pagination si besoin
    return response()->json([
        'success' => true,
        'data' => $contacts
    ]);
}
public function destroy($id)
{
    $contact = Contact::find($id);

    if (!$contact) {
        return response()->json(['message' => 'Message introuvable'], 404);
    }

    $contact->delete();

    return response()->json(['message' => 'Message supprimé avec succès']);
}


}
