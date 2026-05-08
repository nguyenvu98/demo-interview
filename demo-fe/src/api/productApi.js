import httpClient from './httpClient';

export const getProductsApi = async ({ page, size, keyword }) => {
  const { data } = await httpClient.get('/products', { params: { page, size, keyword } });
  return data;
};

export const createProductApi = async (payload) => {
  const { data } = await httpClient.post('/products', payload);
  return data;
};

export const updateProductApi = async ({ id, payload }) => {
  const { data } = await httpClient.put(`/products/${id}`, payload);
  return data;
};

export const deleteProductApi = async (id) => {
  await httpClient.delete(`/products/${id}`);
};
