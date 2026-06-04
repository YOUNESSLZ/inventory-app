import { Link, usePage } from '@inertiajs/react';
export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    return (
        <>
            {/* Modern Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
                <div className="container-fluid px-4">
                    <Link href="/" className="navbar-brand fw-bold fs-4">
                    StockManager
                    </Link>       
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                             <Link href={route(user.role === 'admin' ? 'admin.dashboard' : 'employee.dashboard')} className="nav-link px-3">
                             Dashboard
                             </Link>
                            </li>
             
                        </ul>
                        
                        <div className="dropdown">
                            <button 
                                className="btn btn-outline-light dropdown-toggle d-flex align-items-center gap-2" 
                                type="button" 
                                data-bs-toggle="dropdown"
                            > {user.photo ? (
                                
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
                                        {user.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>)}
                                <span>{user.name}</span>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2">
                                <li>
                            <Link href={route('profile.edit')} className="dropdown-item py-2">
                                <i className="bi bi-person me-2"></i>
                                Profile Settings</Link>
                                </li>
                                {user.role === "admin" && (<><li>
                                            <Link href={route('admin.employees.create')} className="dropdown-item py-2">
                                                <i className="bi bi-person-plus me-2"></i>
                                                Add Employee
                                            </Link>
                                        </li>
                                        <li>
                                            <Link  href={route('admin.employees.index')} className="dropdown-item py-2">
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

            {/* Page Header - Only shown if header exists */}
            {header && (
                <div className="d-flex align-items-center gap-3 px-4 py-3 bg-white border-bottom shadow-sm ">
                     <h2 className="fw-bold text-dark mb-0">{header}</h2>
                      <div className="alert alert-primary py-1 px-2 small mb-0 shadow-sm">
                         <i className="bi bi-person-check me-2"></i>
                         Bienvenue, vous êtes connecté !
                      </div>
                </div>)}


            {/* Main Content - Properly styled card */}
            <main className="flex-grow-1">

                
                <div className="container-fluid px-4 py-4">
                    <div className="card shadow-sm border-0 rounded-3">
                        <div className="card-body p-4">
                            {children}
                        </div>
                    </div>
                </div>
            </main>
        <footer className="bg-dark text-white text-center py-3 mt-auto fixed-bottom">
                    <small>© {new Date().getFullYear()} StockManager. Tous droits réservés.</small>
                </footer>
            {/* Simple Footer */}
            {/* <footer className="bg-white border-top mt-auto py-3">
                <div className="container-fluid px-4">
                    <div className="text-center text-muted small">
                        © {new Date().getFullYear()} Your Application. All rights reserved.
                    </div>
                </div>
            </footer> */}
        </>
    );
}