import { useQuery } from '@tanstack/react-query';
import { getDashboardApi } from '../api/adminApi';

export const useDashboard = () =>
  useQuery({
    queryKey: ['admin', 'dashboard'],
    queryFn: getDashboardApi,
  });
