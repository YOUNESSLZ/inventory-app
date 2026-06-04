import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        type: '',
        file: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('employee.reports.store'));
    };

    return (
        <AuthenticatedLayout header={<h2 className="fw-bold text-dark">Nouveau rapport</h2>}>
            <Head title="Créer un rapport" />
         <a href={route('reports.index')} className="btn btn-secondary mt-3">
                                <i className="bi bi-arrow-left"/>
 Liste de Raport 
                            </a>
            <div className="container py-4">
                <div className="card shadow-sm border-0">
                    <div className="card-body">
                        <form onSubmit={submit} encType="multipart/form-data">
                            <div className="mb-3">
                                <label className="form-label">Titre</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                />
                                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Type</label>
                                <select
                                    className={`form-select ${errors.type ? 'is-invalid' : ''}`}
                                    value={data.type}
                                    onChange={(e) => setData('type', e.target.value)}
                                >
                                    <option value="">-- Sélectionner --</option>
                                    <option value="Ventes">Ventes</option>
                                    <option value="Stock">Stock</option>
                                    <option value="Other">other</option>
                                </select>
                                {errors.type && <div className="invalid-feedback">{errors.type}</div>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Fichier (PDF, DOCX, XLSX)</label>
                                <input
                                    type="file"
                                    className={`form-control ${errors.file ? 'is-invalid' : ''}`}
                                    onChange={(e) => setData('file', e.target.files[0])}
                                />
                                {errors.file && <div className="invalid-feedback">{errors.file}</div>}
                            </div>

                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary fw-bold" disabled={processing}>
                                    {processing ? 'Enregistrement...' : 'Créer le rapport'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
