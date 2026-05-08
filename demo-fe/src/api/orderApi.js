import httpClient from './httpClient';

export const createOrderApi = async (payload) => {
  const { data } = await httpClient.post('/orders', payload);
  return data;
};

export const getMyOrdersApi = async ({ page, size }) => {
  const { data } = await httpClient.get('/orders/me', { params: { page, size } });
  return data;
};

export const getAllOrdersApi = async ({ page, size }) => {
  const { data } = await httpClient.get('/orders', { params: { page, size } });
  return data;
};
