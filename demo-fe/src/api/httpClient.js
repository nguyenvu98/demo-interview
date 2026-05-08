import axios from 'axios';

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8081/api',
});

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default httpClient;
