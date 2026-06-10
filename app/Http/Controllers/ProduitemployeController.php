<?php

namespace App\Http\Controllers;
use App\Models\Product;
use App\Models\Categorie;
use Illuminate\Http\Request;
use Inertia\Inertia;
class ProduitemployeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
       public function index()
    {   
        $produits = Product::with('categorie')->get();
        return Inertia::render('Employee/product/Produitlist', ['produits' => $produits]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
       return inertia('Employee/CeateRaport');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
           $request->validate([
            'title' => 'required|string|max:255',
            'type'  => 'required|string|max:100',
            'file'  => 'nullable|file|mimes:pdf,docx,xlsx'
        ]);

        $path = null;
        if ($request->hasFile('file')) {
            $path = $request->file('file')->store('reports', 'public');
        }

        DB::table('reports')->insert([
            'title' => $request->title,
            'type'  => $request->type,
            'file'  => $path,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return redirect()->route('employee.reports.create')
            ->with('success', 'Rapport créé avec succès.');
    }

    /**
     * Display the specified resource.
     */
   public function show(string $id)
    {
        $produit = Product::with('categorie')->findOrFail($id);
        return Inertia::render('Employee/product/showproduits', [
            'produit' => $produit,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
          public function increase($id)
{
    $produit = Product::findOrFail($id);
    $produit->increment('quantiteStock');
    return redirect()->route('employee.produits.index')->with('success', 'Quantité augmentée.');
}

public function decrease($id)
{
    $produit = Product::findOrFail($id);
    if ($produit->quantiteStock > 0) {
        $produit->decrement('quantiteStock');
    }
    return redirect()->route('employee.produits.index')->with('success', 'Quantité diminuée.');
}
}
