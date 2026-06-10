import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import '../../../css/dashbored_EMPL.css';
export default function Dashboard({produits, categories}) {
    return (
        <AuthenticatedLayout header={<h2 className="fw-bold ">Tableau de bord Employé</h2>}>
            <Head title="Dashboard" />

            <div className="dashboard-header-modern mb-5">
    <div>
        <span className="dashboard-badge">
          Employe
        </span>

        <h1 className="dashboard-title">
            Bonjour 👋
        </h1>

        <p className="dashboard-subtitle">
            Bienvenue sur votre espace de gestion.
        </p>
    </div>
</div>

{/* Statistics */}

<div className="row g-4 mb-5">

    <div className="col-md-4">
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

    <div className="col-md-4">
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

    <div className="col-md-4">
        <div className="modern-card stat-card-orange">

            <div className="stat-icon">
                <i className="bi bi-file-earmark-bar-graph"></i>
            </div>

            <div>
                <h2>+</h2>
                <p>Rapports</p>
            </div>

        </div>
    </div>

</div>

{/* Quick Actions */}

<div className="modern-card mb-5">
    <h4 className="mb-4">Actions rapides</h4>

    <div className="d-flex flex-wrap gap-3">

        <Link
            href={route('employee.categories.index')}
            className="btn btn-modern-primary"
        >
            <i className="bi bi-tags me-2"></i>
            Catégories
        </Link>

        <Link
            href={route('employee.produits.index')}
            className="btn btn-modern-secondary"
        >
            <i className="bi bi-box-seam me-2"></i>
            Produits
        </Link>

        <Link
            href={route('employee.reports.create')}
            className="btn btn-modern-warning"
        >
            <i className="bi bi-file-earmark-bar-graph me-2"></i>
            Nouveau Rapport
        </Link>

    </div>
</div>

{/* Stock Alerts */}

<div className="modern-card">

    <div className="d-flex align-items-center mb-4">
        <i className="bi bi-exclamation-triangle-fill text-warning fs-3 me-3"></i>

        <div>
            <h4 className="mb-0">
                Produits en stock faible
            </h4>

            <small className="text-muted">
                Vérifiez les articles nécessitant un réapprovisionnement.
            </small>
        </div>
    </div>

    {produits.filter(
        p => p.quantiteStock < p.seuilAlert
    ).length > 0 ? (

        <div className="row g-3">

            {produits
                .filter(
                    p => p.quantiteStock < p.seuilAlert
                )
                .map((p) => (

                    <div
                        key={p.id}
                        className="col-md-6"
                    >
                        <div className="stock-alert-card">

                            <h6>{p.nom}</h6>

                            <span>
                                Stock actuel :
                                <strong>
                                    {" "}
                                    {p.quantiteStock}
                                </strong>
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
        </AuthenticatedLayout>
    );
}
