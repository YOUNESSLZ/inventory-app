import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Reports({ reports }) {

    const [search, setSearch] = useState('');

    const filteredReports = reports.filter(r =>
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.type.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AuthenticatedLayout header="Rapports">

            <Head title="Rapports" />

            <div className="page">

                {/* HEADER */}
                <div className="header">
                    <div>
                        <h2>Gestion des rapports</h2>
                        <p>Analyse et suivi des documents générés</p>
                    </div>

                    <Link
                        href={route('reports.create')}
                        className="btn-primary-modern"
                    >
                        <i className="bi bi-file-earmark-plus me-2"></i>
                        Nouveau rapport
                    </Link>
                </div>

                {/* SEARCH */}
                <div className="search-box">

                    <span>🔍</span>

                    <input
                        type="text"
                        placeholder="Rechercher un rapport..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    {search && (
                        <button onClick={() => setSearch('')}>✕</button>
                    )}

                </div>

                {/* TABLE */}
                <div className="card">

                    <table>

                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Titre</th>
                                <th>Type</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {filteredReports.length > 0 ? (
                                filteredReports.map((report, index) => (

                                    <tr key={report.id}>

                                        <td className="muted">
                                            {index + 1}
                                        </td>

                                        <td className="name">
                                            {report.title}
                                        </td>

                                        <td>
                                            <span className="badge">
                                                {report.type}
                                            </span>
                                        </td>

                                        <td className="muted">
                                            {new Date(report.created_at).toLocaleString('fr-FR')}
                                        </td>

                                        <td>
                                            <div className="actions">

                                                <Link
                                                    href={route('reports.show', report.id)}
                                                    className="btn view"
                                                >
                                                    👁
                                                </Link>

                                                <a
                                                    href={route('reports.download', report.id)}
                                                    className="btn download"
                                                >
                                                    ⬇
                                                </a>

                                                <Link
                                                    href={route('reports.edit', report.id)}
                                                    className="btn edit"
                                                >
                                                    ✎
                                                </Link>

                                                <Link
                                                    href={route('reports.destroy', report.id)}
                                                    method="delete"
                                                    as="button"
                                                    className="btn danger"
                                                    onClick={(e) => {
                                                            if (!confirm('Supprimer ce Raport ?')) {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                >
                                                    🗑
                                                </Link>

                                            </div>
                                        </td>

                                    </tr>

                                ))
                            ) : (

                                <tr>
                                    <td colSpan="5" className="empty">
                                        Aucun rapport disponible
                                    </td>
                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

            {/* ===== INLINE CSS (MATCHING YOUR FULL SYSTEM) ===== */}
            <style>{`

                .page {
                    padding: 25px;
                    background: #f6f7fb;
                    min-height: 100vh;
                }

                /* HEADER */
                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }

                .header h2 {
                    font-size: 24px;
                    font-weight: 800;
                    margin: 0;
                }

                .header p {
                    margin: 0;
                    color: #6b7280;
                }

                .btn-primary-modern {
                    background: #4f46e5;
                    color: white;
                    padding: 10px 14px;
                    border-radius: 12px;
                    text-decoration: none;
                    font-weight: 600;
                    transition: 0.2s;
                }

                .btn-primary-modern:hover {
                    background: #4338ca;
                    transform: translateY(-2px);
                }

                /* SEARCH */
                .search-box {
                    display: flex;
                    align-items: center;
                    gap: 10px;

                    background: white;
                    padding: 10px 12px;

                    border-radius: 12px;
                    border: 1px solid #e5e7eb;

                    max-width: 420px;
                    margin-bottom: 20px;
                }

                .search-box input {
                    border: none;
                    outline: none;
                    flex: 1;
                }

                .search-box button {
                    border: none;
                    background: transparent;
                    cursor: pointer;
                    color: #6b7280;
                }

                /* CARD */
                .card {
                    background: white;
                    border-radius: 16px;
                    overflow: hidden;
                    border: 1px solid #e5e7eb;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.05);
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                }

                thead {
                    background: #f9fafb;
                }

                th {
                    text-align: left;
                    padding: 14px;
                    font-size: 12px;
                    text-transform: uppercase;
                    color: #6b7280;
                    border-bottom: 1px solid #e5e7eb;
                }

                td {
                    padding: 14px;
                    border-bottom: 1px solid #f1f5f9;
                }

                tr:hover {
                    background: #f9fafb;
                }

                .name {
                    font-weight: 600;
                }

                .muted {
                    color: #6b7280;
                }

                /* BADGE */
                .badge {
                    background: rgba(79,70,229,0.1);
                    color: #4f46e5;
                    padding: 4px 10px;
                    border-radius: 999px;
                    font-size: 12px;
                    font-weight: 600;
                }

                /* ACTION BUTTONS */
                .actions {
                    display: flex;
                    gap: 6px;
                }

                .btn {
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

                .btn:hover {
                    transform: translateY(-2px);
                }

                .view { background: rgba(59,130,246,0.1); color: #2563eb; }
                .download { background: rgba(16,185,129,0.1); color: #059669; }
                .edit { background: rgba(245,158,11,0.1); color: #d97706; }
                .danger { background: rgba(239,68,68,0.1); color: #dc2626; }

                /* EMPTY */
                .empty {
                    text-align: center;
                    padding: 40px;
                    color: #6b7280;
                }

            `}</style>

        </AuthenticatedLayout>
    );
}