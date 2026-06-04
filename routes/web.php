<?php
use App\Models\Activity;
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\ProduitemployeController;
use App\Http\Controllers\CategorieController;

use App\Models\Product;
use App\Models\Categorie;
use App\Models\User;
use App\Models\Raport;

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\EmployeeController;  
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
// use App\Http\Controllers\ProfilePhotoController;
use App\Http\Controllers\ReportController;
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Profile routes - accessible by both admin and employee (authenticated users)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/profile/photo', [ProfileController::class, 'updatephoto'])->name('profile.photo.update');
    Route::delete('/profile/photo', [ProfileController::class, 'deletePhoto'])->name('profile.photo.delete');
});

// Admin routes
Route::middleware(['auth', 'verified', 'admin'])->group(function () {
       
    Route::get('/admin/dashboard', function () {
            $recentActivities = Activity::latest()->take(5)->get();
        return Inertia::render('Admin/Dashboard', [
        'recentActivities' => $recentActivities,
        'produits' => Product::all(),
        'categories' => Categorie::all(),
        'Users' => User::all(),
        'rapports' => Raport::all(),
    ]);})->name('admin.dashboard');
    
    // Employee management routes - Remove 'Admin/' namespace
    Route::get('/admin/employees', [EmployeeController::class, 'index'])->name('admin.employees.index');
    Route::get('/admin/employees/create', [EmployeeController::class, 'create'])->name('admin.employees.create');
    Route::post('/admin/employees', [EmployeeController::class, 'store'])->name('admin.employees.store');
    Route::get('/admin/employees/{id}', [EmployeeController::class, 'show'])->name('admin.employees.show');
    Route::get('/admin/employees/{id}/edit', [EmployeeController::class, 'edit'])->name('admin.employees.edit');
    Route::put('/admin/employees/{id}', [EmployeeController::class, 'update'])->name('admin.employees.update');
    Route::post('/admin/employees/{id}/approve', [EmployeeController::class, 'approve'])->name('admin.employees.approve');
    Route::put('/admin/employees/{id}/toggle-active', [EmployeeController::class, 'toggleActive'])->name('admin.employees.toggle-active');
    Route::delete('/admin/employees/{id}', [EmployeeController::class, 'destroy'])->name('admin.employees.destroy');


    // Liste des rapports
    Route::get('admin/reports', [ReportController::class, 'index'])
    ->name('reports.index');
    // Créer un nouveau rapport
    Route::get('admin/reports/create', [ReportController::class, 'create'])
    ->name('reports.create');
    // Enregistrer un rapport
    Route::post('admin/reports', [ReportController::class, 'store'])
    ->name('reports.store');
    // Voir un rapport spécifique
    Route::get('admin/reports/{id}', [ReportController::class, 'show'])
    ->name('reports.show');
    // Télécharger un rapport
    Route::get('admin/reports/{id}/download', [ReportController::class, 'download'])
    ->name('reports.download');
    // Modifier un rapport
    Route::get('admin/reports/{id}/edit', [ReportController::class, 'edit'])
    ->name('reports.edit');
    // Mettre à jour un rapport
    Route::put('admin/reports/{id}', [ReportController::class, 'update'])
    ->name('reports.update');
    // Supprimer un rapport
    Route::delete('admin/reports/{id}', [ReportController::class, 'destroy'])
    ->name('reports.destroy');

Route::resource('/admin/produits', ProduitController::class)->names([
        'index' => 'admin.produits.index',
        'create' => 'admin.produits.create',
        'store' => 'admin.produits.store',
        'show' => 'admin.produits.show',
        'edit' => 'admin.produits.edit',
        'update' => 'admin.produits.update',
        'destroy' => 'admin.produits.destroy',
    ]);
Route::delete('/admin/produits', [ProduitController::class, 'clear'])
    ->name('admin.produits.clear');

    Route::resource('/admin/categories', CategorieController::class)->names([
        'index' => 'admin.categories.index',
        'create' => 'admin.categories.create',
        'store' => 'admin.categories.store',
        'edit' => 'admin.categories.edit',
        'update' => 'admin.categories.update',
        'destroy' => 'admin.categories.destroy',
        
    ]);



});

// Employee routes
Route::middleware(['auth', 'verified', 'checkuser', 'employee'])->group(function () {
    Route::get('/employee/dashboard', function () {
        return Inertia::render('Employee/Dashboard', [
        'produits' => Product::all(),
        'categories' => Categorie::all(),
        'Users' => User::all(),
        'rapports' => Raport::all(),]);
    })->name('employee.dashboard');




      

//     Route::put('produits/{id}/increase', [ProduitController::class, 'increase'])->name('produits.increase');
// Route::put('produits/{id}/decrease', [ProduitController::class, 'decrease'])->name('produits.decrease');
Route::resource('employee/produits', ProduitemployeController::class)
    ->names([
        'index' => 'employee.produits.index',
        'create' => 'employee.produits.create',
        'store' => 'employee.produits.store',
        'show' => 'employee.produits.show',
        'edit' => 'employee.produits.edit',
        'update' => 'employee.produits.update',
        'destroy' => 'employee.produits.destroy',
    ]);

    Route::resource('/employee/categories', CategorieController::class)->names([
        'index' => 'employee.categories.index',
        'create' => 'employee.categories.create',
        'store' => 'employee.categories.store',
        'edit' => 'employee.categories.edit',
        'update' => 'employee.categories.update',
        'destroy' => 'employee.categories.destroy',
        
    ]);
 Route::get('employee/reports', [ReportController::class, 'index'])
    ->name('reports.index');

Route::put('employee/produits/{id}/increase', [ProduitemployeController::class, 'increase'])
    ->name('employee.produits.increase');

Route::put('employee/produits/{id}/decrease', [ProduitemployeController::class, 'decrease'])
    ->name('employee.produits.decrease');

    Route::get('employee/reports/create', [ProduitemployeController::class, 'create'])
    ->name('employee.reports.create');
    Route::post('employee/reports', [ReportController::class, 'store'])
    ->name('employee.reports.store');
});

// Dashboard redirect route
Route::get('/dashboard', function () {
    $user = auth()->user();
    if ($user->role === 'admin') {
        return redirect()->route('admin.dashboard');
    }
    return redirect()->route('employee.dashboard');
})->middleware(['auth'])->name('dashboard');




Route::get('/pending-approval', function () {
    return Inertia::render('pendingApproval');
})->name('pending.approval')->middleware('auth');

require __DIR__.'/auth.php';