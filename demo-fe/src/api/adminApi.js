import httpClient from './httpClient';

export const getDashboardApi = async () => {
  const { data } = await httpClient.get('/admin/dashboard');
  return data;
};
