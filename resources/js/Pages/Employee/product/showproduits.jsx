import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function ShowProduit({ produit }) {
    return (
        <AuthenticatedLayout header="Détails du produit">
            <Head title="Détails produit" />

            <div className="container py-4">
                <div className="card shadow-sm border-0">
                    <div className="row g-0">
                        {/* Image section */}
                        <div className="col-md-4 d-flex align-items-center justify-content-center p-3">
                            {produit.photo ? (
                                <img
                                    src={`/storage/${produit.photo}`}
                                    alt={produit.nom}
                                    className="img-fluid rounded shadow-sm"
                                    style={{ maxHeight: '250px', objectFit: 'cover' }}
                                />
                            ) : (
                                <div className="text-muted fst-italic">Aucune image disponible</div>
                            )}
                        </div>

                        {/* Info section */}
                        <div className="col-md-8">
                            <div className="card-body">
                                <h4 className="fw-bold mb-4">Informations du produit</h4>

                                <table className="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <th>Nom</th>
                                            <td>{produit.nom}</td>
                                        </tr>
                                        <tr>
                                            <th>Description</th>
                                            <td>{produit.description || '—'}</td>
                                        </tr>
                                        <tr>
                                            <th>Prix</th>
                                            <td>{produit.prix} MAD</td>
                                        </tr>
                                        <tr>
                                            <th>Quantité en stock</th>
                                            <td>{produit.quantiteStock}</td>
                                        </tr>
                                        <tr>
                                            <th>Seuil d’alerte</th>
                                            <td>{produit.seuilAlert}</td>
                                        </tr>
                                        <tr>
                                            <th>Catégorie</th>
                                            <td>{produit.categorie?.nom ?? 'Non définie'}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div className="d-flex justify-content-between mt-4">
                                    <Link href={route('produits.index')} className="btn btn-secondary">
                                        <i className="bi bi-arrow-left me-2"></i>  Liste des produits
                                    </Link>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
