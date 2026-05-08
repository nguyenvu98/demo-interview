import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createProductApi, deleteProductApi, getProductsApi, updateProductApi } from '../api/productApi';

export const useProducts = ({ page, size, keyword }) =>
  useQuery({
    queryKey: ['products', page, size, keyword],
    queryFn: () => getProductsApi({ page, size, keyword }),
  });

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProductApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProductApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProductApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });
};
