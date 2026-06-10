<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use App\Models\Activity;
class EmployeeController extends Controller
{
    /**
     * Display a listing of employees.
     */
    public function index(): Response
    {
        $employees = User::where('role', 'employee')
            ->orderBy('created_at', 'desc')
            ->get();
        
        return Inertia::render('Admin/EmployeesList', [
            'employees' => $employees
        ]);
    }

    /**
     * Show the form for creating a new employee.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/CreateEmployee');
    }

    /**
     * Store a newly created employee in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'employee',
            'estActif' => true,
            'estValide' => false, // Needs admin approval
            'photo' => null,
        ]);
               Activity::create([
            'action' => 'created',
            'description' => 'Added Employee: ' . $user->name,
            'user_name' => Auth::user()->name,
            'user_id' => Auth::id(),
            'model_type' => 'User',
            'model_id' => $user->id
        ]);

        return redirect()->route('admin.employees.index')
            ->with('success', 'Employee created successfully.');
    }

 
    /**
     * Update the specified employee in storage.
     */
    public function update(Request $request, string $id): RedirectResponse
    {
        $employee = User::where('role', 'employee')
            ->findOrFail($id);
        
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:users,email,' . $id,
            'password' => ['nullable', 'confirmed', Rules\Password::defaults()],
        ]);

        $employee->name = $request->name;
        $employee->email = $request->email;
        
        if ($request->filled('password')) {
            $employee->password = Hash::make($request->password);
        }
        
        $employee->save();

        return redirect()->route('admin.employees.index')
            ->with('success', 'Employee updated successfully.');
    }

    /**
     * Remove the specified employee from storage.
     */
    public function destroy(string $id): RedirectResponse
    {
        $employee = User::where('role', 'employee')
            ->findOrFail($id);
        
        $employee->delete();
                 Activity::create([
            'action' => 'delete',
            'description' => 'Delete Employee: ' . $employee->name,
            'user_name' => Auth::user()->name,
            'user_id' => Auth::id(),
            'model_type' => 'User',
            'model_id' => $employee->id
        ]);

        return redirect()->route('admin.employees.index')
            ->with('success', 'Employee deleted successfully.');
    }

    /**
     * Approve an employee (set estValide to true).
     */
    public function approve(string $id): RedirectResponse
    {
        $employee = User::where('role', 'employee')
            ->findOrFail($id);
        
        $employee->estValide = true;
        $employee->save();

        return redirect()->route('admin.employees.index')
            ->with('success', 'Employee approved successfully. They can now log in.');
    }

    /**
     * Toggle employee active status.
     */
    public function toggleActive(string $id): RedirectResponse
    {
        $employee = User::where('role', 'employee')
            ->findOrFail($id);
        
        $employee->estActif = !$employee->estActif;
        $employee->save();

        $status = $employee->estActif ? 'activated' : 'deactivated';
        
        return redirect()->route('admin.employees.index')
            ->with('success', "Employee {$status} successfully.");
    }

    /**
     * Bulk approve multiple employees.
     */
    public function bulkApprove(Request $request): RedirectResponse
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:users,id'
        ]);
        
        User::whereIn('id', $request->ids)
            ->where('role', 'employee')
            ->update(['estValide' => true]);

        return redirect()->route('admin.employees.index')
            ->with('success', 'Employees approved successfully.');
    }

    /**
     * Bulk delete multiple employees.
     */
    public function bulkDelete(Request $request): RedirectResponse
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:users,id'
        ]);
        
        User::whereIn('id', $request->ids)
            ->where('role', 'employee')
            ->delete();

        return redirect()->route('admin.employees.index')
            ->with('success', 'Employees deleted successfully.');
    }
}