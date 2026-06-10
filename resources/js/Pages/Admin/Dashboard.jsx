import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import '../../../css/dashbored_EMPL.css';

export default function Dashboard({
    recentActivities,
    produits,
    categories,
    Users,
    rapports
}) {

    const totalEmployees =
        Users?.filter(user => user.role === 'employee').length || 0;

    return (
        <AuthenticatedLayout
            header={<h2 className="fw-bold text-dark">Tableau de bord Admin</h2>}
        >
            <Head title="Dashboard Admin" />

            {/* HEADER */}
            <div className="dashboard-header-modern mb-5">
                <div>
                    <span className="dashboard-badge">Administration</span>

                    <h1 className="dashboard-title">
                        Bonjour Admin 👋
                    </h1>

                    <p className="dashboard-subtitle">
                        Vue globale de votre système de gestion.
                    </p>
                </div>
            </div>

            {/* STATS */}
            <div className="row g-4 mb-5">

                <div className="col-md-3">
                    <div className="modern-card stat-card-blue">
                        <div className="stat-icon">
                            <i className="bi bi-tags"></i>
                        </div>
                        <div>
                            <h2>{categories?.length || 0}</h2>
                            <p>Catégories</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="modern-card stat-card-green">
                        <div className="stat-icon">
                            <i className="bi bi-box-seam"></i>
                        </div>
                        <div>
                            <h2>{produits?.length || 0}</h2>
                            <p>Produits</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="modern-card stat-card-orange">
                        <div className="stat-icon">
                            <i className="bi bi-people"></i>
                        </div>
                        <div>
                            <h2>{totalEmployees}</h2>
                            <p>Employés</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="modern-card stat-card-secondary">
                        <div className="stat-icon">
                           <i className="bi bi-file-earmark-bar-graph me-2"></i> 
                        </div>
                        <div>
                            <h2>{rapports?.length || 0}</h2>
                            <p>Rapports</p>
                        </div>
                    </div>
                </div>

            </div>

            {/* QUICK ACTIONS */}
            <div className="modern-card mb-5">
                <h4 className="mb-4">Actions rapides</h4>

                <div className="d-flex flex-wrap gap-3">

                    <Link href={route('admin.categories.index')} className="btn btn-modern-primary">
                        <i className="bi bi-tags me-2"></i> Catégories
                    </Link>

                    <Link href={route('admin.produits.index')} className="btn btn-modern-secondary">
                        <i className="bi bi-box-seam me-2"></i> Produits
                    </Link>

                    <Link href={route('admin.employees.index')} className="btn btn-modern-warning">
                        <i className="bi bi-people me-2"></i> Employés
                    </Link>

                    <Link href={route('reports.index')} className="btn btn-modern-primary">
                        <i className="bi bi-file-earmark-bar-graph me-2"></i> Rapports
                    </Link>

                </div>
            </div>

            {/* STOCK ALERTS */}
            <div className="modern-card mb-5">

                <div className="d-flex align-items-center mb-4">
                    <i className="bi bi-exclamation-triangle-fill text-warning fs-3 me-3"></i>
                    <div>
                        <h4 className="mb-0">Produits en stock faible</h4>
                        <small className="text-muted">Surveillance des produits critiques</small>
                    </div>
                </div>

                {produits.filter(p => p.quantiteStock < p.seuilAlert).length > 0 ? (
                    <div className="row g-3">
                        {produits
                            .filter(p => p.quantiteStock < p.seuilAlert)
                            .map((p) => (
                                <div key={p.id} className="col-md-6">
                                    <div className="stock-alert-card">
                                        <h6>{p.nom}</h6>
                                        <span>
                                            Stock actuel: <strong>{p.quantiteStock}</strong>
                                        </span>
                                    </div>
                                </div>
                            ))}
                    </div>
                ) : (
                    <div className="alert alert-success border-0">
                        Aucun produit en stock faible.
                    </div>
                )}

            </div>

        {/* ✅ RECENT ACTIVITIES - PRO LEVEL DESIGN */}
<div className="modern-card">

    <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
            <h4 className="mb-1 fw-bold">Activités récentes</h4>
            <small className="text-muted">
                Historique complet des actions du système
            </small>
        </div>

        <Link
            href={route('admin.produits.clear')}
            method="delete"
            as="button"
            className="btn btn-modern-danger btn-sm"
            onClick={(e) => {
                if (!window.confirm("Voulez-vous vraiment vider les activités ?")) {
                    e.preventDefault();
                }
            }}
        >
            <i className="bi bi-trash me-1"></i>
            Vider
        </Link>

    </div>

    {recentActivities && recentActivities.length > 0 ? (

        <div className="activity-list">

            {recentActivities.map((activity) => (

                <div key={activity.id} className="activity-item">

                    {/* LEFT - ICON */}
                    <div className={`activity-icon ${
                        activity.action === 'created' ? 'success' : 'warning'
                    }`}>
                        <i className={`bi ${
                            activity.action === 'created'
                                ? 'bi-plus-circle'
                                : 'bi-pencil-square'
                        }`}></i>
                    </div>

                    {/* CENTER - CONTENT */}
                    <div className="activity-content">

                        <div className="activity-title">
                            {activity.action === 'created'
                                ? 'Ajout effectué'
                                : 'Modification effectuée'}
                        </div>

                        <div className="activity-desc">
                            {activity.description}
                        </div>

                    </div>

                    {/* USER */}
                    <div className="activity-user">
                        <i className="bi bi-person-circle me-1"></i>
                        {activity.user_name || 'Inconnu'}
                    </div>

                    {/* TIME */}
                    <div className="activity-time">
                        {new Date(activity.created_at).toLocaleString('fr-FR')}
                    </div>

                </div>

            ))}

        </div>

    ) : (

        <div className="text-center py-5 text-muted">
            <i className="bi bi-inbox fs-1"></i>
            <p className="mt-2">Aucune activité récente</p>
        </div>

    )}

</div>

        </AuthenticatedLayout>
    );
}