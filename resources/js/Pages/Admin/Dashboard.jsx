import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ recentActivities, produits, categories, Users, rapports }) {
    // Helper function to check if stock increased or decreased
    const getStockChangeIcon = (description) => {
        if (description?.includes('augmenté')) {
            return <i className="bi bi-arrow-up-circle-fill text-success me-1"></i>;
        }
        if (description?.includes('diminué')) {
            return <i className="bi bi-arrow-down-circle-fill text-danger me-1"></i>;
        }
        return null;
    };

    const getStockChangeClass = (description) => {
        if (description?.includes('augmenté')) return 'text-success';
        if (description?.includes('diminué')) return 'text-danger';
        return '';
    };

    const totalEmployees = Users?.filter(user => user.role === 'employee').length || 0;

    return (
        <AuthenticatedLayout
            header={<h1 className="h3 mb-0 fw-semibold text-dark">Tableau de bord Admin</h1>}
        >
            <Head title="Dashboard Admin" />

            <div className="container-fluid px-4 py-4">
                {/* KPI Cards Row */}
                <div className="row g-4 mb-5">
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
                                    <Link href={route('admin.categories.index')} className="small text-decoration-none">
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
                                    <Link href={route('admin.produits.index')} className="small text-decoration-none">
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
                                        <div className="bg-info bg-opacity-10 rounded-3 p-3">
                                            <i className="bi bi-people-fill fs-2 text-info"></i>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <h2 className="mb-0 fw-bold">{totalEmployees}</h2>
                                        <span className="text-muted small text-uppercase">Employés</span>
                                    </div>
                                </div>
                                <div className="border-top pt-3">
                                    <Link href={route('admin.employees.index')} className="small text-decoration-none">
                                        Gérer les employés <i className="bi bi-arrow-right ms-1"></i>
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
                                        <h2 className="mb-0 fw-bold">{rapports?.length || 0}</h2>
                                        <span className="text-muted small text-uppercase">Rapports</span>
                                    </div>
                                </div>
                                <div className="border-top pt-3">
                                    <Link href={route('reports.index')} className="small text-decoration-none">
                                        Voir les rapports <i className="bi bi-arrow-right ms-1"></i>
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







                {/* Recent Activities Table */}
                <div className="row">
                    <div className="col-12">
                        <div className="card border-0 shadow-sm">
                            <div className="card-header bg-white border-bottom p-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5 className="mb-0 fw-semibold">
                                            <i className="bi bi-clock-history me-2 text-primary"></i>
                                            Activités récentes
                                        </h5>
                                        <p className="text-muted small mb-0">Historique des modifications de stock et actions</p>
                                    </div>
                                    <span className="badge bg-light text-dark rounded-pill">
                                        {recentActivities?.length || 0} activités
                                    </span>
                                </div>
                            </div>
                            <div className="card-body p-0">
                                {recentActivities && recentActivities.length > 0 ? (
                                    <div className="table-responsive">
                                        <table className="table table-hover align-middle mb-0">
                                            <thead className="table-light">
                                                <tr>
                                                   
                                                    <th scope="col">Action</th>
                                                    <th scope="col">Détails</th>
                                                    <th scope="col">Utilisateur</th>
                                                    <th scope="col" className="pe-4">Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {recentActivities.map((activity, index) => (
                                                    <tr key={activity.id}>
                                                      
                                                        <td>
                                                            <span className={`badge px-3 py-2 ${activity.action === 'created' ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'}`}>
                                                                {activity.action === 'created' ? (
                                                                    <><i className="bi bi-plus-circle me-1"></i> Ajout</>
                                                                ) : (
                                                                    <><i className="bi bi-pencil-square me-1"></i> Modification</>
                                                                )}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                {getStockChangeIcon(activity.description)}
                                                                <span className={getStockChangeClass(activity.description)}>
                                                                    {activity.description}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <div className="bg-secondary bg-opacity-10 rounded-circle p-2 me-2">
                                                                    <i className="bi bi-person fs-6 text-secondary"></i>
                                                                </div>
                                                                <span className="small fw-medium">{activity.user_name || 'Inconnu'}</span>
                                                            </div>
                                                        </td>
                                                        <td className="pe-4 text-muted small">
                                                            <i className="bi bi-calendar3 me-1"></i>
                                                            {new Date(activity.created_at).toLocaleString('fr-FR')}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="text-center py-5">
                                        <i className="bi bi-inbox fs-1 text-muted"></i>
                                        <p className="text-muted mt-3 mb-0">Aucune activité récente à afficher</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>
                {`
                    .transition-hover {
                        transition: all 0.2s ease-in-out;
                    }
                    .transition-hover:hover {
                        background-color: #f8f9fa !important;
                        transform: translateX(4px);
                    }
                    .table > :not(caption) > * > * {
                        border-bottom-width: 1px;
                    }
                `}
            </style>
        </AuthenticatedLayout>
    );
}