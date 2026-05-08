import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export default function ProtectedRoute({ children, allowRoles }) {
  const { accessToken, role } = useAuthStore();

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }
  if (allowRoles && !allowRoles.includes(role)) {
    return <Navigate to="/products" replace />;
  }
  return children;
}
