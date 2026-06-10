import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function EmployeesList({ employees }) {

    const [search, setSearch] = useState('');

    const filteredEmployees = employees.filter(e =>
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AuthenticatedLayout header="Employés">

             <style>{`
             
/* ===== SEARCH (same system as products) ===== */
.search-bare {
    display: flex;
    align-items: center;
    gap: 10px;

    background: white;
    padding: 10px 12px;

    border-radius: 12px;
    border: 1px solid #e5e7eb;

    max-width: 420px;
}

.search-bare input {
    border: none;
    outline: none;
    flex: 1;
    font-size: 14px;
}

.search-bare button {
    border: none;
    background: transparent;
    color: #6b7280;
    cursor: pointer;
}

/* ===== TABLE ===== */
.modern-table {
    width: 100%;
    border-collapse: collapse;
}

.modern-table thead {
    background: #f9fafb;
}

.modern-table th {
    text-align: left;
    padding: 14px;
    font-size: 12px;
    text-transform: uppercase;
    color: #6b7280;
    border-bottom: 1px solid #e5e7eb;
}

.modern-table td {
    padding: 14px;
    border-bottom: 1px solid #f1f5f9;
}

.modern-table tr:hover {
    background: #f9fafb;
}

/* ===== AVATAR ===== */
.avatar-circle {
    width: 34px;
    height: 34px;
    border-radius: 10px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: rgba(79,70,229,0.1);
    color: #4f46e5;
}

/* ===== BADGES ===== */
.badge-success {
    background: #dcfce7;
    color: #166534;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
}

.badge-danger {
    background: #fee2e2;
    color: #991b1b;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
}

.badge-warning {
    background: #fef3c7;
    color: #92400e;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
}

/* ===== ICON BUTTONS ===== */
.btn-icon {
    width: 34px;
    height: 34px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 10px;
    border: 1px solid #e5e7eb;

    cursor: pointer;
    transition: 0.2s;
    text-decoration: none;
}

.btn-icon:hover {
    transform: translateY(-2px);
}

.btn-icon.success {
    background: rgba(34,197,94,0.1);
    color: #16a34a;
}

.btn-icon.warning {
    background: rgba(245,158,11,0.1);
    color: #d97706;
}

.btn-icon.danger {
    background: rgba(239,68,68,0.1);
    color: #dc2626;
}
             
             `}</style>


                {/* HEADER */}
                <div className="d-flex justify-content-between align-items-end mb-4">

                    <div>
                        <h2 className="fw-bold mb-1">Gestion des employés</h2>
                        <p className="text-muted mb-0">
                            Administration des comptes utilisateurs
                        </p>
                    </div>

                    <Link
                        href={route('admin.employees.create')}
                        className="btn btn-modern-primary"
                    >
                        <i className="bi bi-person-plus me-2"></i>
                        Ajouter
                    </Link>

                </div>

                {/* SEARCH */}
                <div className="search-bare mb-4">

                    <span>🔍</span>

                    <input
                        type="text"
                        placeholder="Rechercher un employé..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    {search && (
                        <button onClick={() => setSearch('')}>
                            ✕
                        </button>
                    )}

                </div>

                {/* TABLE */}
                <div className="modern-card">

                    <div className="table-responsive">

                        <table className="modern-table">

                            <thead>
                                <tr>
                                    <th>Employé</th>
                                    <th>Email</th>
                                    <th>Statut</th>
                                    <th>Validation</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>

                                {filteredEmployees.length > 0 ? (
                                    filteredEmployees.map((employee) => (

                                        <tr key={employee.id}>

                                            {/* NAME */}
                                            <td className="fw-semibold">
                                                <div className="d-flex align-items-center gap-2">
                                                    <div className="avatar-circle">
                                                        <i className="bi bi-person"></i>
                                                    </div>
                                                    {employee.name}
                                                </div>
                                            </td>

                                            {/* EMAIL */}
                                            <td className="text-muted">
                                                {employee.email}
                                            </td>

                                            {/* STATUS */}
                                            <td>
                                                <span className={
                                                    employee.estActif
                                                        ? "badge-success"
                                                        : "badge-danger"
                                                }>
                                                    {employee.estActif ? 'Actif' : 'Inactif'}
                                                </span>
                                            </td>

                                            {/* VALIDATION */}
                                            <td>
                                                <span className={
                                                    employee.estValide
                                                        ? "badge-success"
                                                        : "badge-warning"
                                                }>
                                                    {employee.estValide ? 'Validé' : 'En attente'}
                                                </span>
                                            </td>

                                            {/* ACTIONS */}
                                            <td>
                                                <div className="d-flex gap-2">

                                                    {!employee.estValide && (
                                                        <Link
                                                            href={route('admin.employees.approve', employee.id)}
                                                            method="post"
                                                            as="button"
                                                            className="btn-icon success"
                                                        >
                                                            <i className="bi bi-check2"></i>
                                                        </Link>
                                                    )}

                                                    <Link
                                                        href={route('admin.employees.toggle-active', employee.id)}
                                                        method="put"
                                                        as="button"
                                                        className="btn-icon warning"
                                                    >
                                                        {employee.estActif ? (
                                                            <i className="bi bi-person-dash"></i>
                                                        ) : (
                                                            <i className="bi bi-person-check"></i>
                                                        )}
                                                    </Link>

                                                    <Link
                                                        href={route('admin.employees.destroy', employee.id)}
                                                        method="delete"
                                                        as="button"
                                                        className="btn-icon danger"
                                                        onClick={(e) => {
                                                            if (!confirm('Supprimer cet employé ?')) {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </Link>

                                                </div>
                                            </td>

                                        </tr>

                                    ))
                                ) : (

                                    <tr>
                                        <td colSpan="5" className="text-center py-5 text-muted">
                                            <i className="bi bi-people fs-3"></i>
                                            <div className="mt-2">
                                                Aucun employé trouvé
                                            </div>
                                        </td>
                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

        

        </AuthenticatedLayout>
    );
}