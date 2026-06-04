import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function ProduitsIndex({ produits }) {
    const [searchTerm, setSearchTerm] = useState('');

    // Filter products directly without useMemo
    const filteredProduits = !searchTerm.trim()
        ? produits
        : produits.filter(produit =>
            produit.nom.toLowerCase().includes(searchTerm.toLowerCase())
        );

    return (
        <AuthenticatedLayout header="Produits">
            <Head title="Produits" />

            <div className="container py-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="fw-bold text-dark">Liste des produits</h4>
                    <Link href={route('admin.produits.create')} className="btn btn-primary">
                        <i className="bi bi-plus-circle me-2"></i> Ajouter un produit
                    </Link>
                </div>

                {/* 🔍 Search bar */}
                <div className="input-group mb-4">
                    <span className="input-group-text bg-white">🔍</span>
                    <input
                        type="text"
                        className="form-control border-start-0 ps-0"
                        placeholder="Rechercher par nom..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <button
                            className="btn btn-outline-secondary"
                            onClick={() => setSearchTerm('')}
                            type="button"
                        >
                            ✕
                        </button>
                    )}
                </div>

                {/* 📋 Products table */}
                <div className="card shadow-sm border-0">
                    <div className="card-body">
                        <table className="table table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>#</th>
                                    <th>Nom</th>
                                    <th>Catégorie</th>
                                    <th>Prix</th>
                                    <th>Stock</th>
                                    <th>Seuil d’alerte</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProduits.length > 0 ? (
                                    filteredProduits.map((produit, index) => (
                                        <tr key={produit.id}>
                                            <td>{index + 1}</td>
                                            <td>{produit.nom}</td>
                                            <td>{produit.categorie?.nom ?? 'Non définie'}</td>
                                            <td>{produit.prix} MAD</td>
                                            <td>{produit.quantiteStock}</td>
                                            <td>{produit.seuilAlert}</td>
                                            <td>
                                                <div className="btn-group">
                                                    <Link
                                                        href={route('admin.produits.show', produit.id)}
                                                        className="btn btn-sm btn-info    rounded-1
                                                        me-2"
                                                     
                                                    >
                                                        <i className="bi bi-eye"></i>
                                                    </Link>
                                                    <Link
                                                        href={route('admin.produits.edit', produit.id)}
                                                        className="btn btn-sm btn-secondary    rounded-1
                                                        me-2"
                                                       
                                                    >
                                                        <i className="bi bi-pencil"></i>
                                                    </Link>
                                                    <Link
                                                        href={route('admin.produits.destroy', produit.id)}
                                                        method="delete"
                                                        as="button"
                                                        className="btn btn-sm btn-danger rounded-1"
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center text-muted">
                                            Aucun produit disponible
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
