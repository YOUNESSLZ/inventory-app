import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState, useMemo } from 'react';

export default function CategoriesIndex({ categories }) {
    const [searchTerm, setSearchTerm] = useState('');
    const { auth } = usePage().props;

    const filteredCategories = useMemo(() => {
        if (!searchTerm.trim()) return categories;
        return categories.filter(category =>
            category.nom.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, categories]);

    return (
        <AuthenticatedLayout header="Catégories">
            <Head title="Catégories" />

            <div className="page">

                {/* HEADER */}
                <div className="header">
                    <div>
                        <h2>Catégories</h2>
                        <p>Gestion des catégories de produits</p>
                    </div>

                    {auth?.user?.role === "admin" && (
                        <Link href={route('admin.categories.create')} className="primaryBtn">
                            + Ajouter
                        </Link>
                    )}
                </div>

                {/* SEARCH */}
                <div className="searchBox">
                    <span>🔍</span>
                    <input
                        type="text"
                        placeholder="Rechercher une catégorie..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <button onClick={() => setSearchTerm('')}>✕</button>
                    )}
                </div>

                {/* TABLE CARD */}
                <div className="card">
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Nom</th>
                                <th>Description</th>
                                <th>Créé</th>
                                <th>Mis à jour</th>
                                {auth?.user?.role === "admin" && <th>Actions</th>}
                            </tr>
                        </thead>

                        <tbody>
                            {filteredCategories.length > 0 ? (
                                filteredCategories.map((categorie, index) => (
                                    <tr key={categorie.id}>
                                        <td>{index + 1}</td>

                                        <td>
                                            {categorie.photo ? (
                                                <img
                                                    src={`/storage/${categorie.photo}`}
                                                    alt={categorie.nom}
                                                    className="img"
                                                />
                                            ) : (
                                                <span className="muted">✖️✖️✖️✖️</span>
                                            )}
                                        </td>

                                        <td className="name">{categorie.nom}</td>
                                        <td className="muted">{categorie.description}</td>

                                        <td>
                                            {new Date(categorie.created_at).toLocaleDateString('fr-FR')}
                                        </td>

                                        <td>
                                            {new Date(categorie.updated_at).toLocaleDateString('fr-FR')}
                                        </td>

                                        {auth?.user?.role === "admin" && (
                                            <td>
                                                <div className="actions">
                                          
                                                    
                                                    <Link
                                                         href={route('admin.categories.edit', categorie.id)}
                                                        className="btn-icon warning"
                                                    >
                                                        <i className="bi bi-pencil"></i>
                                                    </Link>

                                          

                                                    <Link
                                                         href={route('admin.categories.destroy', categorie.id)}
                                                        method="delete"
                                                        as="button"
                                                        className="btn-icon danger"
                                                        onClick={(e) => {
                                                            if (!confirm('Supprimer cet categorie ?')) {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </Link>
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="empty">
                                        Aucune catégorie disponible
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* INLINE CSS */}
            <style>{`
                :root {
                    --primary: #4f46e5;
                    --primary-light: rgba(79, 70, 229, 0.1);
                    --gray-bg: #f6f7fb;
                    --text: #111827;
                    --muted: #6b7280;
                    --border: #e5e7eb;
                }

                .page {
                    padding: 26px;
                    background: var(--gray-bg);
                    min-height: 100vh;
                }

                /* HEADER */
                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 18px;
                }

                .header h2 {
                    margin: 0;
                    font-size: 22px;
                    font-weight: 700;
                    color: var(--text);
                }

                .header p {
                    margin: 4px 0 0;
                    color: var(--muted);
                    font-size: 13px;
                }

                /* BUTTON */
                .primaryBtn {
                    background: var(--primary);
                    color: white;
                    padding: 10px 14px;
                    border-radius: 10px;
                    text-decoration: none;
                    font-weight: 500;
                    transition: 0.2s;
                }

                .primaryBtn:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 8px 18px rgba(79, 70, 229, 0.25);
                }

                /* SEARCH */
                .searchBox {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    background: white;
                    padding: 10px 12px;
                    border-radius: 12px;
                    border: 1px solid var(--border);
                    margin-bottom: 16px;
                    max-width: 420px;
                }

                .searchBox input {
                    border: none;
                    outline: none;
                    flex: 1;
                    font-size: 14px;
                }

                .searchBox button {
                    border: none;
                    background: transparent;
                    cursor: pointer;
                    color: var(--muted);
                    font-size: 16px;
                }

                /* CARD */
                .card {
                    background: white;
                    border-radius: 14px;
                    padding: 10px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
                    overflow: hidden;
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
                    color: var(--muted);
                    border-bottom: 1px solid var(--border);
                }

                td {
                    padding: 14px;
                    border-top: 1px solid #f3f4f6;
                    font-size: 14px;
                    color: var(--text);
                }

                tr:hover {
                    background: #fafafa;
                }

                /* IMAGE */
                .img {
                    width: 60px;
                    height: 60px;
                    object-fit: cover;
                    border-radius: 10px;
                    border: 1px solid var(--border);
                }

                .name {
                    font-weight: 600;
                }

                .muted {
                    color: var(--muted);
                    font-size: 13px;
                }

                /* ACTIONS */
                .actions {
                    display: flex;
                    gap: 8px;
                }

                .btn {
                    width: 34px;
                    height: 34px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 10px;
                    text-decoration: none;
                    border: 1px solid var(--border);
                    transition: 0.2s;
                    cursor: pointer;
                }

                .btn:hover {
                    transform: translateY(-1px);
                }

                .edit {
                    background: var(--primary-light);
                    color: var(--primary);
                }

                .delete {
                    background: rgba(239, 68, 68, 0.1);
                    color: #ef4444;
                }

                /* EMPTY */
                .empty {
                    text-align: center;
                    padding: 30px;
                    color: var(--muted);
                }

                /* RESPONSIVE */
                @media (max-width: 768px) {
                    .header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 10px;
                    }

                    .searchBox {
                        width: 100%;
                        max-width: 100%;
                    }
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
        </AuthenticatedLayout>
    );
}