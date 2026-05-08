import ErrorState from '../components/ui/ErrorState';
import LoadingState from '../components/ui/LoadingState';
import { useDashboard } from '../hooks/useDashboard';

export default function AdminDashboardPage() {
  const { data, isLoading, isError, error } = useDashboard();

  if (isLoading) return <LoadingState text="Loading dashboard..." />;
  if (isError) return <ErrorState message={error?.response?.data?.message || 'Cannot load dashboard'} />;

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div className="stats">
        <div className="card">Total Products: {data.totalProducts}</div>
        <div className="card">Total Orders: {data.totalOrders}</div>
        <div className="card">Total Users: {data.totalUsers}</div>
      </div>
    </div>
  );
}
