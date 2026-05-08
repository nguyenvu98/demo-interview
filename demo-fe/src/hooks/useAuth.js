import { useMutation } from '@tanstack/react-query';
import { loginApi, registerApi } from '../api/authApi';
import { useAuthStore } from '../store/authStore';

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      setAuth({
        accessToken: data.accessToken,
        username: data.username,
        role: data.role,
      });
    },
  });
};

export const useRegister = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  return useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      setAuth({
        accessToken: data.accessToken,
        username: data.username,
        role: data.role,
      });
    },
  });
};
