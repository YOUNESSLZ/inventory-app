import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Fixed Navbar - consistent height */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top" style={{ height: '50px', minHeight: '70px' }}>
                <div className="container-fluid px-4 h-100">
                    <a href="/" className="navbar-brand  fs-4">
                        StockManager
                    </a>
                    
                    {/* Mobile toggle button */}
                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    
                    <div className={`${isMobileMenuOpen ? 'show' : ''} collapse navbar-collapse h-100`} id="navbarNav">
                        <ul className="navbar-nav me-auto h-100 align-items-center">
                            <li className="nav-item h-100 d-flex align-items-center">
                                <Link 
                                    href={route(user.role === 'admin' ? 'admin.dashboard' : 'employee.dashboard')} 
                                    className="nav-link px-3"
                                >
                                    Dashboard
                                </Link>
                            </li>
                        </ul>
                        
                        <div className="dropdown">
                            <button 
                                className="btn btn-outline-light dropdown-toggle d-flex align-items-center gap-2" 
                                type="button" 
                                data-bs-toggle="dropdown"
                                style={{ height: '40px' }}
                            >
                                {user.photo ? (
                                    <img 
                                        src={`/storage/${user.photo}`} 
                                        className="bg-light rounded-circle d-flex align-items-center justify-content-center"
                                        style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                                        alt="Profile"
                                    />
                                ) : (
                                    <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" 
                                         style={{width: '32px', height: '32px'}}>
                                        <span className="text-dark fw-bold">
                                            {user.name?.charAt(0).toUpperCase() || 'U'}
                                        </span>
                                    </div>
                                )}
                                <span className="d-none d-md-inline">{user.name}</span>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2">
                                <li>
                                    <Link href={route('profile.edit')} className="dropdown-item py-2">
                                        <i className="bi bi-person me-2"></i>
                                        Profile Settings
                                    </Link>
                                </li>
                                {user.role === "admin" && (
                                    <>
                                        <li>
                                            <Link href={route('admin.employees.create')} className="dropdown-item py-2">
                                                <i className="bi bi-person-plus me-2"></i>
                                                Add Employee
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={route('admin.employees.index')} className="dropdown-item py-2">
                                                <i className="bi bi-people me-2"></i>
                                                Manage Employees
                                            </Link>
                                        </li>
                                    </>
                                )}
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="dropdown-item text-danger py-2"
                                    >
                                        <i className="bi bi-box-arrow-right me-2"></i>
                                        Logout
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Page Header - Fixed height */}
            {header && (
                <div className="d-flex align-items-center gap-3 px-4 py-3 bg-white border-bottom shadow-sm" style={{ minHeight: '80px', height: 'auto' }}>
                    <h2 className="fw-bold text-dark mb-0">{header}</h2>
                    <div className="alert alert-primary py-1 px-2 small mb-0 shadow-sm">
                        <i className="bi bi-person-check me-2"></i>
                        Bienvenue, vous êtes connecté !
                    </div>
                </div>
            )}

            {/* Main Content - Flexible height with proper spacing */}
            <main className="flex-grow-1" style={{ marginBottom: '60px' }}>
                <div className="container-fluid px-4 py-4">
                    <div className="card shadow-sm border-0 rounded-3">
                        <div className="card-body p-4">
                            {children}
                        </div>
                    </div>
                </div>
            </main>

            {/* Fixed Footer - Consistent height */}
            <footer className="bg-dark text-white text-center py-3 mt-auto" style={{ height: '40px', position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }}>
                <small className='justify'>© {new Date().getFullYear()} StockManager. Tous droits réservés.</small>
            </footer>
        </div>
    );
}