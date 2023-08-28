import { storageGetToken, storageRemoveToken } from '@/storage/storageToken';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
  timeout: 50000,
});

api.interceptors.request.use(async config => {
  const token = storageGetToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response.status === 401) {
      await storageRemoveToken();
      window.location.replace('/');
    }

    return Promise.reject(error);
  },
);

export { api };
