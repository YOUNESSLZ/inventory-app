<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Categorie;
use App\Models\Activity;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProduitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {   
        $produits = Product::with('categorie')->get();
        return Inertia::render('Admin/product/Produitlist', ['produits' => $produits]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Categorie::all();
        return Inertia::render('Admin/product/CreateProduit', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {   
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'nullable|string',
            'prix' => 'required|numeric',
            'quantiteStock' => 'required|integer',
            'seuilAlert' => 'required|integer',
            'categorie_id' => 'required|exists:categories,id',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

      if ($request->hasFile('photo')) {
        // Store file in storage/app/public/photos
        $path = $request->file('photo')->store('photos', 'public');
        $validated['photo'] = $path;
    }


        $product = Product::create($validated);
        
        // Direct activity logging
        Activity::create([
            'action' => 'created',
            'description' => 'Added product: ' . $product->nom,
            'user_name' => Auth::user()->name,
            'user_id' => Auth::id(),
            'model_type' => 'Product',
            'model_id' => $product->id
        ]);

        return redirect()->route('admin.produits.index')->with('success', 'Produit ajouté avec succès.');
    }
    public function clear(){
        
    Activity::truncate(); // deletes all rows quickly
    return redirect()->route('admin.dashboard')
        ->with('success', 'Toutes les activités ont été supprimées.');
        
}



    public function show(string $id)
    {
        $produit = Product::with('categorie')->findOrFail($id);
        return Inertia::render('Admin/product/showproduits', [
            'produit' => $produit,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $produit = Product::find($id);
        $categories = Categorie::all();
        return Inertia::render('Admin/product/Edit', [
            'produit' => $produit,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
   public function update(Request $request, $id)
{
    $produit = Product::find($id);
    // Store old quantity before update
    $oldQuantity = $produit->quantiteStock;
    $oldName = $produit->nom;
    $oldphoto = $produit->photo;
    $validated = $request->validate([
        'nom' => 'required|string|max:255',
        'prix' => 'required|numeric',
        'quantiteStock' => 'required|integer',
        'seuilAlert' => 'required|integer',
        'categorie_id' => 'required|exists:categories,id',
        'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',

    ]);

       if ($request->hasFile('photo')) {
        // Store file in storage/app/public/photos
        $path = $request->file('photo')->store('photos', 'public');
        $validated['photo'] = $path;
       } else {
        // Keep the existing photo if no new one is uploaded
        $validated['photo'] = $oldphoto;
    }

    $produit->update($validated);
    
    // Get new quantity
    $newQuantity = $produit->quantiteStock;
    $difference = $newQuantity - $oldQuantity;
    
    // Create description based on quantity change

$case = null;

// Decide which case to handle
if ($oldName != $produit->nom) {
    $case = 'name';
} elseif ($oldphoto != $produit->photo) {
    $case = 'photo';
} elseif ($difference > 0) {
    $case = 'stock_up';
} elseif ($difference < 0) {
    $case = 'stock_down';
} else {
    $case = 'modified';
}

switch ($case) {
    case 'stock_up':
        $description = "Stock augmenté: {$produit->nom} (+{$difference})";
        break;

    case 'stock_down':
        $description = "Stock diminué: {$produit->nom} ({$difference})";
        break;

    case 'modified':
        $description = "Produit modifié: {$produit->nom}";
        break;

    case 'name':
        $description = "Produit modifié: {$oldName} → {$produit->nom}";
        if ($difference != 0) {
            $description .= ", stock " . ($difference > 0 ? "augmenté de +{$difference}" : "diminué de {$difference}");
        }
        break;

    case 'photo':
        $description = "La photo du produit a été modifiée";
        if ($difference != 0) {
            $description .= ", stock " . ($difference > 0 ? "augmenté de +{$difference}" : "diminué de {$difference}");
        }
        break;
}

    // Log activity
    Activity::create([
        'action' => 'updated',
        'description' => $description,
        'user_name' => Auth::user()->name,
        'user_id' => Auth::id(),
    ]);

    return redirect()->route('admin.produits.index')->with('success', 'Produit mis à jour avec succès.');
}
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $produit = Product::findOrFail($id);
        $productName = $produit->nom;
        
        $produit->delete();
        
        // Direct activity logging
        Activity::create([
            'action' => 'deleted',
            'description' => 'Deleted product: ' . $productName,
            'user_name' => Auth::user()->name,
            'user_id' => Auth::id(),
            'model_type' => 'Product',
            'model_id' => $id
        ]);

        return redirect()->route('admin.produits.index')->with('success', 'Produit supprimé avec succès.');
    }
 
}