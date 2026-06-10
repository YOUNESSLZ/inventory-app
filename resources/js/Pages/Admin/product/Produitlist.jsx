import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';


export default function ProduitsIndex({ produits }) {

    const [searchTerm, setSearchTerm] = useState('');

    const filteredProduits = !searchTerm.trim()
        ? produits
        : produits.filter(p =>
            p.nom.toLowerCase().includes(searchTerm.toLowerCase())
        );

    return (
        
        <AuthenticatedLayout header="Produits">
            <Head title="Produits" />
 <style>{`
 /* ===== BARE SEARCH (MODERN CLEAN) ===== */
.search-bare {
    display: flex;
    align-items: center;
    gap: 10px;

    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 12px;

    padding: 10px 12px;
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

/* ===== TABLE MODERN ===== */
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

/* ===== BADGE ===== */
.badge-modern {
    background: rgba(79, 70, 229, 0.1);
    color: #4f46e5;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 12px;
}

/* ===== STOCK STATUS ===== */
.stock-ok {
    color: #16a34a;
    font-weight: 600;
}

.stock-danger {
    color: #dc2626;
    font-weight: 700;
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

    text-decoration: none;
    cursor: pointer;
    transition: 0.2s;
}

.btn-icon:hover {
    transform: translateY(-2px);
}

.btn-icon.info {
    background: rgba(59,130,246,0.1);
    color: #2563eb;
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
                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>
                        <h3 className="fw-bold mb-1">Produits</h3>
                        <small className="text-muted">
                            Gestion et suivi des produits
                        </small>
                    </div>

                    <Link
                        href={route('admin.produits.create')}
                        className="btn btn-modern-primary"
                    >
                        <i className="bi bi-plus-circle me-2"></i>
                        Ajouter
                    </Link>

                </div>

                {/* 🔍 CLEAN SEARCH (BARE STYLE KEPT) */}
                <div className="search-bare mb-4">
                    <span>🔍</span>

                    <input
                        type="text"
                        placeholder="Rechercher un produit..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {searchTerm && (
                        <button onClick={() => setSearchTerm('')}>
                            ✕
                        </button>
                    )}
                </div>

                {/* TABLE CARD */}
                <div className="modern-card">

                    <div className="table-responsive">

                        <table className="modern-table">

                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Produit</th>
                                    <th>Catégorie</th>
                                    <th>Prix</th>
                                    <th>Stock</th>
                                    <th>Alerte</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>

                                {filteredProduits.length > 0 ? (
                                    filteredProduits.map((produit, index) => (

                                        <tr key={produit.id}>

                                            <td className="text-muted">
                                                {index + 1}
                                            </td>

                                            <td className="fw-semibold">
                                                {produit.nom}
                                            </td>

                                            <td>
                                                <span className="badge-modern">
                                                    {produit.categorie?.nom ?? 'Non définie'}
                                                </span>
                                            </td>

                                            <td className="text-success fw-semibold">
                                                {produit.prix} MAD
                                            </td>

                                            <td>
                                                <span className={
                                                    produit.quantiteStock <= produit.seuilAlert
                                                        ? "stock-danger"
                                                        : "stock-ok"
                                                }>
                                                    {produit.quantiteStock}
                                                </span>
                                            </td>

                                            <td className="text-muted">
                                                {produit.seuilAlert}
                                            </td>

                                            <td>
                                                <div className="d-flex gap-2">

                                                    <Link
                                                        href={route('admin.produits.show', produit.id)}
                                                        className="btn-icon info"
                                                    >
                                                        <i className="bi bi-eye"></i>
                                                    </Link>

                                                    <Link
                                                        href={route('admin.produits.edit', produit.id)}
                                                        className="btn-icon warning"
                                                    >
                                                        <i className="bi bi-pencil"></i>
                                                    </Link>

                                                    <Link
                                                        href={route('admin.produits.destroy', produit.id)}
                                                        method="delete"
                                                        as="button"
                                                        className="btn-icon danger"
                                                        onClick={(e) => {
                                                            if (!confirm('Supprimer ce produit ?')) {
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
                                        <td colSpan="7" className="text-center py-5 text-muted">
                                            <i className="bi bi-inbox fs-3"></i>
                                            <div className="mt-2">
                                                Aucun produit disponible
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