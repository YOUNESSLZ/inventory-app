import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <>
            <Head title="Mot de passe oublié" />

            <div className="container d-flex align-items-center justify-content-center min-vh-100">
                <div className="col-md-6 col-lg-5">
                    {/* Logo + Title */}
                    <div className="text-center mb-4">
                        <i className="bi bi-box-seam display-4 text-primary"></i>
                        <h3 className="fw-bold mt-2">StockManager</h3>
                        <p className="text-muted">Réinitialisation sécurisée</p>
                    </div>

                    {/* Card */}
                    <div className="card shadow-lg border-0">
                        <div className="card-header bg-dark text-white text-center">
                            <h4 className="mb-0">
                                <i className="bi bi-key me-2"></i> Mot de passe oublié
                            </h4>
                        </div>
                        <div className="card-body p-4">
                            <p className="text-center text-muted mb-4">
                                Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
                            </p>

                            {status && (
                                <div className="alert alert-success text-center">
                                    {status}
                                </div>
                            )}

                            <form onSubmit={submit}>
                                {/* Email */}
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>

                                {/* Submit */}
                                <div className="d-grid">
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary"
                                        disabled={processing}
                                    >
                                        {processing ? 'Envoi...' : 'Envoyer le lien de réinitialisation'}
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="card-footer text-center bg-light">
                            <a href={route('login')} className="text-decoration-none">
                                <i className="bi bi-arrow-left me-1"></i> Retour à la connexion
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
