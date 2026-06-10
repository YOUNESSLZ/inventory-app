import { Head, Link } from "@inertiajs/react";
import "../../css/welcome.css";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="StockManager" />

            <div className="welcome-page">

                {/* Navbar */}
                <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
                    <div className="container">
                        <Link href="/" className="navbar-brand fw-bold">
                            StockManager
                        </Link>

                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto align-items-center gap-3">

                                <li className="nav-item">
                                    <a href="#features" className="nav-link">
                                        Fonctionnalités
                                    </a>
                                </li>

                                <li className="nav-item">
                                    <a href="#stats" className="nav-link">
                                        Statistiques
                                    </a>
                                </li>

                                {auth.user ? (
                                    <li className="nav-item">
                                        <Link
                                            href={route("dashboard")}
                                            className="btn btn-primary-custom"
                                        >
                                            Dashboard
                                        </Link>
                                    </li>
                                ) : (
                                    <li className="nav-item">
                                        <Link
                                            href={route("login")}
                                            className="btn btn-primary-custom"
                                        >
                                            Connexion
                                        </Link>
                                    </li>
                                )}

                            </ul>
                        </div>
                    </div>
                </nav>

                {/* Hero */}
                <section className="hero-section">
                    <div className="container">
                        <div className="row align-items-center gy-5">

                            <div className="col-lg-6">
                                <span className="badge-custom">
                                    Gestion moderne des stocks
                                </span>

                                <h1 className="hero-title">
                                    Gérez votre entreprise avec précision.
                                </h1>

                                <p className="hero-description">
                                    Centralisez vos produits, employés,
                                    mouvements de stock et rapports dans une
                                    plateforme rapide, moderne et intuitive.
                                </p>

                                <div className="d-flex gap-3 flex-wrap mt-4">
                                    <Link
                                        href={route("login")}
                                        className="btn btn-primary-custom"
                                    >
                                        Commencer
                                    </Link>
                                 
                                
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="dashboard-preview">

                                    <div className="dashboard-header">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>

                                    <div className="dashboard-body">

                                        <div className="dashboard-stat">
                                            <h2>12,450</h2>
                                            <span>Produits</span>
                                        </div>

                                        <div className="dashboard-stat">
                                            <h2>450</h2>
                                            <span>Employés</span>
                                        </div>

                                        <div className="dashboard-stat">
                                            <h2>98%</h2>
                                            <span>Disponibilité</span>
                                        </div>

                                        <div className="dashboard-chart">
                                            <div className="bar h1"></div>
                                            <div className="bar h2"></div>
                                            <div className="bar h3"></div>
                                            <div className="bar h4"></div>
                                            <div className="bar h5"></div>
                                        </div>

                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Features */}
                <section id="features" className="features-section">
                    <div className="container">

                        <div className="section-title">
                            <h2>Fonctionnalités principales</h2>
                            <p>
                                Tout ce dont vous avez besoin pour gérer votre activité.
                            </p>
                        </div>

                        <div className="row g-4">

                            <div className="col-md-4">
                                <div className="feature-card">
                                    <div className="icon-box">
                                        📦
                                    </div>

                                    <h4>Gestion des Produits</h4>

                                    <p>
                                        Ajoutez, modifiez et suivez vos articles
                                        en temps réel.
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="feature-card">
                                    <div className="icon-box">
                                        👥
                                    </div>

                                    <h4>Employés</h4>

                                    <p>
                                        Contrôle des utilisateurs, rôles et
                                        permissions.
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="feature-card">
                                    <div className="icon-box">
                                        📊
                                    </div>

                                    <h4>Rapports</h4>

                                    <p>
                                        Analysez vos performances avec des
                                        tableaux de bord détaillés.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Statistics */}
                <section id="stats" className="stats-section">
                    <div className="container">
                        <div className="row text-center">

                            <div className="col-md-4">
                                <h2>10K+</h2>
                                <p>Produits gérés</p>
                            </div>

                            <div className="col-md-4">
                                <h2>500+</h2>
                                <p>Clients actifs</p>
                            </div>

                            <div className="col-md-4">
                                <h2>99.9%</h2>
                                <p>Disponibilité</p>
                            </div>

                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="cta-section">
                    <div className="container text-center">
                        <h2>Prêt à moderniser votre gestion ?</h2>

                        <p>
                            Commencez dès aujourd'hui avec StockManager.
                        </p>

                        <Link
                            href={route("login")}
                            className="btn btn-light btn-lg px-5 rounded-pill"
                        >
                            Démarrer maintenant
                        </Link>
                    </div>
                </section>

                {/* Footer */}
                <footer className="footer">
                    <div className="container text-center">
                        © {new Date().getFullYear()} StockManager
                    </div>
                </footer>

            </div>
        </>
    );
}