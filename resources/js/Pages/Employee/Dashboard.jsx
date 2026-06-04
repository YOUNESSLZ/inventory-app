import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({produits, categories}) {
    return (
        <AuthenticatedLayout header={<h2 className="fw-bold text-dark">Tableau de bord Employé</h2>}>
            <Head title="Dashboard" />

            <div className="container py-4">

  
 <div className="row g-4 mb-5 justify-content-center">
                    <div className="col-sm-6 col-xl-3">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body p-4">
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <div className="flex-shrink-0">
                                        <div className="bg-primary bg-opacity-10 rounded-3 p-3">
                                            <i className="bi bi-tags fs-2 text-primary"></i>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <h2 className="mb-0 fw-bold">{categories?.length || 0}</h2>
                                        <span className="text-muted small text-uppercase">Catégories</span>
                                    </div>
                                </div>
                                <div className="border-top pt-3">
                                    <Link href={route('employee.categories.index')} className="small text-decoration-none">
                                        Gérer les catégories <i className="bi bi-arrow-right ms-1"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 col-xl-3">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body p-4">
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <div className="flex-shrink-0">
                                        <div className="bg-success bg-opacity-10 rounded-3 p-3">
                                            <i className="bi bi-box-seam fs-2 text-success"></i>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <h2 className="mb-0 fw-bold">{produits?.length || 0}</h2>
                                        <span className="text-muted small text-uppercase">Produits</span>
                                    </div>
                                </div>
                                <div className="border-top pt-3">
                                    <Link href={route('employee.produits.index')} className="small text-decoration-none">
                                        Gérer les produits <i className="bi bi-arrow-right ms-1"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 col-xl-3">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body p-4">
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <div className="flex-shrink-0">
                                        <div className="bg-danger bg-opacity-10 rounded-3 p-3">
                                            <i className="bi bi-graph-up-arrow fs-2 text-danger"></i>
                                        </div>
                                    </div>
                                    <div className="text-end">
      
                                        <span className="text-muted small text-uppercase">Rapports</span>
                                    </div>
                                </div>
                                <div className="border-top pt-3">
                                    <Link href={route('employee.reports.create')} className="small text-decoration-none">
                                        Ajouter rapport <i className="bi bi-arrow-right ms-1"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
<div className="alert alert-secondary">
  <strong>⚠️ Produits en stock bas :</strong>
  <ul>
    {produits
      .filter(p => p.quantiteStock < p.seuilAlert)
      .map(p => (
        <li key={p.id}>{p.nom} (Stock: {p.quantiteStock})</li>
      ))}
  </ul>
</div>

            </div>
        </AuthenticatedLayout>
    );
}
