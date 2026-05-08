import httpClient from './httpClient';

export const loginApi = async (payload) => {
  const { data } = await httpClient.post('/auth/login', payload);
  return data;
};

export const registerApi = async (payload) => {
  const { data } = await httpClient.post('/auth/register', payload);
  return data;
};
