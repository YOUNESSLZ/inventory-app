<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Categorie;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use App\Models\Activity;
use Illuminate\Support\Facades\Auth;
class CategorieController extends Controller
{
    public function index()
    {
        $categories = Categorie::all();
        return Inertia::render('Admin/categorie/categorielist', [
            'categories' => $categories,
        ]);
    }
public function create()
{
    return Inertia::render('Admin/categorie/CreateCategorie');
}

public function store(Request $request)
{
    $validated=$request->validate([
        'nom' => 'required|string|max:255',
        'description' => 'nullable|string',
        'image' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
    ]);


     if ($request->hasFile('photo')) {
        // Store file in storage/app/public/photos
        $path = $request->file('photo')->store('photos', 'public');
        $validated['photo'] = $path;
    }


     $cat = Categorie::create($validated);
        
        // Direct activity logging
        Activity::create([
            'action' => 'created',
            'description' => 'Added categorie: ' . $cat->nom,
            'user_name' => Auth::user()->name,
            'user_id' => Auth::id(),
            'model_type' => 'categorie',
            'model_id' => $cat->id
        ]);

    // $categorie->save();

    return redirect()->route('admin.categories.index')
        ->with('success', 'Catégorie créée avec succès.');
}
    public function edit($id)
    {
        $categorie = Categorie::findOrFail($id);
        return Inertia::render('Admin/categorie/Edit', [
            'categorie' => $categorie,
        ]);
    }

    public function update(Request $request, $id)
    {
            $categorie = Categorie::find($id);
        $validated=$request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
        ]);

     if ($request->hasFile('photo')) {
        // Store file in storage/app/public/photos
        $path = $request->file('photo')->store('photos', 'public');
        $validated['photo'] = $path;
    }

    $categorie->update($validated);


        // $categorie = Categorie::findOrFail($id);


        // // If new image uploaded
        // if ($request->hasFile('image')) {
        //     // Delete old image if exists
        //     if ($categorie->image) {
        //         Storage::delete($categorie->image);
        //     }

        //     // Store new image
        //     $path = $request->file('image')->store('categories', 'public');
        //     $categorie->image = $path;
        // }

        // $categorie->nom = $request->nom;
        // $categorie->description = $request->description;
        // $categorie->save();

        return redirect()->route('admin.categories.index')
            ->with('success', 'Catégorie mise à jour avec succès.');
    }

    public function destroy($id)
    {
        $categorie = Categorie::findOrFail($id);

        if ($categorie->image) {
            Storage::delete($categorie->image);
        }

        $categorie->delete();
         Activity::create([
            'action' => 'Delete',
            'description' => 'Delete categorie: ' . $categorie->nom,
            'user_name' => Auth::user()->name,
            'user_id' => Auth::id(),
            'model_type' => 'categorie',
            'model_id' => $categorie->id
        ]);

        return redirect()->route('admin.categories.index')
            ->with('success', 'Catégorie supprimée avec succès.');
    }
}
