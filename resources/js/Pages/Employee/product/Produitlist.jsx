import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function ProduitsIndex({ produits }) {

    const [search, setSearch] = useState('');

    const filteredProduits = produits.filter((p) =>
        p.nom.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AuthenticatedLayout header="Produits">
            <Head title="Produits" />

            <div className="page">

                {/* HEADER */}
                <div className="header">
                    <div>
                        <h2>Gestion des Produits</h2>
                        <p>Suivi moderne de votre inventaire</p>
                    </div>
                </div>

                {/* STATS */}
                <div className="stats">

                    <div className="stat-card blue">
                        <h3>{produits.length}</h3>
                        <p>Produits</p>
                    </div>

                    <div className="stat-card orange">
                        <h3>
                            {produits.filter(p => p.quantiteStock <= p.seuilAlert).length}
                        </h3>
                        <p>Stock faible</p>
                    </div>

                    <div className="stat-card green">
                        <h3>
                            {produits.filter(p => p.quantiteStock > p.seuilAlert).length}
                        </h3>
                        <p>Disponibles</p>
                    </div>

                </div>

                {/* SEARCH (bare but modern) */}
                <div className="search-box">

                    <span>🔍</span>

                    <input
                        type="text"
                        placeholder="Rechercher un produit..."
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
                                filteredProduits.map((p, index) => (

                                    <tr key={p.id}>

                                        <td className="muted">{index + 1}</td>

                                        <td className="name">{p.nom}</td>

                                        <td>
                                            <span className="badge">
                                                {p.categorie?.nom ?? 'Non définie'}
                                            </span>
                                        </td>

                                        <td className="price">{p.prix} MAD</td>

                                        <td>
                                            <span className={
                                                p.quantiteStock <= p.seuilAlert
                                                    ? "stock danger"
                                                    : "stock ok"
                                            }>
                                                {p.quantiteStock}
                                            </span>
                                        </td>

                                        <td className="muted">
                                            {p.seuilAlert}
                                        </td>

                                        <td>
                                            <div className="actions">

                                                <Link
                                                    href={route('employee.produits.show', p.id)}
                                                    className="btn view"
                                                >
                                                    👁
                                                </Link>

                                                <Link
                                                    href={route('employee.produits.increase', p.id)}
                                                    method="put"
                                                    as="button"
                                                    className="btn add"
                                                >
                                                    +
                                                </Link>

                                                <Link
                                                    href={route('employee.produits.decrease', p.id)}
                                                    method="put"
                                                    as="button"
                                                    className="btn remove"
                                                >
                                                    −
                                                </Link>

                                            </div>
                                        </td>

                                    </tr>

                                ))
                            ) : (

                                <tr>
                                    <td colSpan="7" className="empty">
                                        Aucun produit disponible
                                    </td>
                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

            {/* ===== INLINE CSS (FULL MODERN SYSTEM) ===== */}
            <style>{`

                .page {
                    padding: 25px;
                    background: #f6f7fb;
                    min-height: 100vh;
                }

                /* HEADER */
                .header h2 {
                    font-size: 24px;
                    font-weight: 800;
                    color: #111827;
                    margin-bottom: 5px;
                }

                .header p {
                    color: #6b7280;
                    margin-bottom: 25px;
                }

                /* STATS */
                .stats {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 15px;
                    margin-bottom: 20px;
                }

                .stat-card {
                    background: white;
                    padding: 18px;
                    border-radius: 16px;
                    border: 1px solid #e5e7eb;
                    box-shadow: 0 6px 15px rgba(0,0,0,0.04);
                }

                .stat-card h3 {
                    font-size: 26px;
                    font-weight: 800;
                    margin: 0;
                }

                .stat-card p {
                    color: #6b7280;
                    margin: 0;
                    font-size: 13px;
                }

                .stat-card.blue h3 { color: #4f46e5; }
                .stat-card.green h3 { color: #16a34a; }
                .stat-card.orange h3 { color: #f59e0b; }

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
                    font-size: 14px;
                }

                .search-box button {
                    border: none;
                    background: transparent;
                    cursor: pointer;
                    color: #6b7280;
                }

                /* TABLE CARD */
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
                    font-size: 14px;
                }

                tr:hover {
                    background: #f9fafb;
                }

                /* TEXT */
                .name {
                    font-weight: 600;
                    color: #111827;
                }

                .muted {
                    color: #6b7280;
                }

                .price {
                    color: #16a34a;
                    font-weight: 600;
                }

                /* BADGE */
                .badge {
                    background: rgba(79,70,229,0.1);
                    color: #4f46e5;
                    padding: 4px 10px;
                    border-radius: 999px;
                    font-size: 12px;
                }

                /* STOCK */
                .stock {
                    padding: 5px 10px;
                    border-radius: 999px;
                    font-size: 12px;
                    font-weight: 600;
                }

                .stock.ok {
                    background: #dcfce7;
                    color: #166534;
                }

                .stock.danger {
                    background: #fee2e2;
                    color: #991b1b;
                }

                /* ACTIONS */
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
                    text-decoration: none;

                    border: 1px solid #e5e7eb;
                    transition: 0.2s;
                    cursor: pointer;
                }

                .btn:hover {
                    transform: translateY(-2px);
                }

                .view { background: rgba(59,130,246,0.1); color: #2563eb; }
                .add { background: rgba(34,197,94,0.1); color: #16a34a; }
                .remove { background: rgba(239,68,68,0.1); color: #dc2626; }

                /* EMPTY */
                .empty {
                    text-align: center;
                    padding: 40px;
                    color: #6b7280;
                }

                /* RESPONSIVE */
                @media (max-width: 768px) {
                    .stats {
                        grid-template-columns: 1fr;
                    }
                }

            `}</style>

        </AuthenticatedLayout>
    );
}