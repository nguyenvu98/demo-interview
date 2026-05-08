import { create } from 'zustand';

const getInitialAuth = () => ({
  accessToken: localStorage.getItem('accessToken') || '',
  username: localStorage.getItem('username') || '',
  role: localStorage.getItem('role') || '',
});

export const useAuthStore = create((set) => ({
  ...getInitialAuth(),
  setAuth: (auth) =>
    set(() => {
      localStorage.setItem('accessToken', auth.accessToken);
      localStorage.setItem('username', auth.username);
      localStorage.setItem('role', auth.role);
      return auth;
    }),
  logout: () =>
    set(() => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      return { accessToken: '', username: '', role: '' };
    }),
}));
