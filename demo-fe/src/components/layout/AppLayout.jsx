import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export default function AppLayout() {
  const navigate = useNavigate();
  const { username, role, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="container">
      <header className="header">
        <Link to="/products" className="brand">
          Demo FE
        </Link>
        <nav className="nav">
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/checkout">Checkout</NavLink>
          <NavLink to="/orders">My Orders</NavLink>
          {role === 'ADMIN' && <NavLink to="/admin/products">Admin Products</NavLink>}
          {role === 'ADMIN' && <NavLink to="/admin/orders">Admin Orders</NavLink>}
          {role === 'ADMIN' && <NavLink to="/admin/dashboard">Dashboard</NavLink>}
        </nav>
        <div className="userbox">
          <span>
            {username} ({role})
          </span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
