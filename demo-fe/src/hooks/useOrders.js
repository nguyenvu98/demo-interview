import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createOrderApi, getAllOrdersApi, getMyOrdersApi } from '../api/orderApi';

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOrderApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders', 'me'] });
      queryClient.invalidateQueries({ queryKey: ['orders', 'all'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useMyOrders = ({ page, size }) =>
  useQuery({
    queryKey: ['orders', 'me', page, size],
    queryFn: () => getMyOrdersApi({ page, size }),
  });

export const useAllOrders = ({ page, size }) =>
  useQuery({
    queryKey: ['orders', 'all', page, size],
    queryFn: () => getAllOrdersApi({ page, size }),
  });
