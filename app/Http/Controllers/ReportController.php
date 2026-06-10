<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Activity;
use App\Models\Raport;
use Illuminate\Support\Facades\Auth;
class ReportController extends Controller
{
    /**
     * Afficher la liste des rapports.
     */
    public function index()
    {
        $reports = Raport::orderBy('created_at', 'desc')->get();

        return inertia('Admin/Raport/index', [
            'reports' => $reports
        ]);
    }

    /**
     * Formulaire de création.
     */
    public function create()
    {
        return inertia('Admin/Raport/Create');
    }

    /**
     * Enregistrer un rapport.
     */
 public function store(Request $request)
{
    $val=$request->validate([
        'title' => 'required|string|max:255',
        'type'  => 'required|string|max:100',
        'file'  => 'nullable|file|mimes:pdf,docx,xlsx'
    ]);

    $path = null;
    if ($request->hasFile('file')) {
        $path = $request->file('file')->store('reports', 'public');
    }

    // Create report using Eloquent model
    $report = Raport::create($val);

    // Log activity
    Activity::create([
        'action'      => 'created',
        'description' => 'Added report: ' . $report->title,
        'user_name'   => Auth::user()->name,
        'user_id'     => Auth::id(),
        'model_type'  => 'report',
        'model_id'    => $report->id,
    ]);

    return redirect()->route('reports.index')
        ->with('success', 'Rapport créé avec succès.');
}
    /**
     * Afficher un rapport.
     */
    public function show($id)
    {
        $report = Raport::find($id);

        return inertia('Admin/Raport/Show', [
            'report' => $report
        ]);
    }

    /**
     * Télécharger un rapport.
     */
    public function download($id)
    {
        $report = Raport::find($id);

        if ($report && $report->file && Storage::disk('public')->exists($report->file)) {
            return Storage::disk('public')->download(
                $report->file,
                $report->title . '.' . pathinfo($report->file, PATHINFO_EXTENSION)
            );
        }

        return redirect()->route('reports.index')
            ->with('error', 'Fichier introuvable.');
    }

    /**
     * Formulaire d’édition.
     */
    public function edit($id)
    {
        $report = Raport::find($id);

        return inertia('Admin/Raport/Edit', [
            'report' => $report
        ]);
    }

    /**
     * Mettre à jour un rapport.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'type'  => 'required|string|max:100',
            'file'  => 'nullable|file|mimes:pdf,docx,xlsx'
        ]);

        $report = Raport::find($id);

        $path = $report->file;
        if ($request->hasFile('file')) {
            $path = $request->file('file')->store('reports', 'public');
        }

        $report=Raport::where('id', $id)->update([
            'title' => $request->title,
            'type'  => $request->type,
            'file'  => $path,
            'updated_at' => now(),
        ]);
 Activity::create([
        'action'      => 'Updated',
        'description' => 'Update report: ' . $report->title,
        'user_name'   => Auth::user()->name,
        'user_id'     => Auth::id(),
        'model_type'  => 'report',
        'model_id'    => $report->id,
    ]);
        return redirect()->route('reports.index')
            ->with('success', 'Rapport mis à jour avec succès.');
    }

    /**
     * Supprimer un rapport.
     */
    public function destroy($id)
    {
        $report = Raport::find($id);

        if ($report && $report->file && Storage::disk('public')->exists($report->file)) {
            Storage::disk('public')->delete($report->file);
        }

        Raport::where('id', $id)->delete();
  Activity::create([
            'action' => 'delete',
            'description' => 'Delete raport: ' . $report->title,
            'user_name' => Auth::user()->name,
            'user_id' => Auth::id(),
            'model_type' => 'raport',
            'model_id' => $report->id
        ]);
        return redirect()->route('reports.index')
            ->with('success', 'Rapport supprimé avec succès.');
    }
}
