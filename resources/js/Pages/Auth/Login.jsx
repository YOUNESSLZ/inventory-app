import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
       

            <div className="container d-flex align-items-center justify-content-center min-vh-100">
                <div className="col-md-6 col-lg-5">
                                            <div className="text-center mb-4">
                            <i className="bi bi-box-seam display-4 text-primary"></i>
                            <h3 className="fw-bold mt-2">StockManager</h3>
                            <p className="text-muted">Connexion sécurisée</p>
                        </div>

                    <div className="card shadow-lg border-0">
                        <div className="card-header bg-dark text-white text-center">
                            <h4 className="mb-0">
                                <i className="bi bi-box-arrow-in-right me-2"></i> Connexion
                            </h4>
                        </div>
                        <div className="card-body p-4">
                            <p className="text-center text-muted mb-4">
                                Connectez-vous pour accéder à votre tableau de bord
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
                                        autoComplete="username"
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>

                                {/* Password */}
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Mot de passe</label>
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        autoComplete="current-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    />
                                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                </div>

                                {/* Remember me */}
                                <div className="form-check mb-3">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        id="remember"
                                    />
                                    <label className="form-check-label" htmlFor="remember">
                                        Se souvenir de moi
                                    </label>
                                </div>

                                {/* Submit */}
                                <div className="d-grid">
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary"
                                        disabled={processing}
                                    >
                                        {processing ? 'Connexion...' : 'Se connecter'}
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="card-footer text-center bg-light">
                            {canResetPassword && (
                                <Link href={route('password.request')} className="text-decoration-none">
                                    <i className="bi bi-question-circle me-1"></i> Mot de passe oublié ?
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
