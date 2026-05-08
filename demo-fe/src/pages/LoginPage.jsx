import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useAuth';

const schema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const loginMutation = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (values) => {
    setErrorMessage('');
    try {
      await loginMutation.mutateAsync(values);
      navigate('/products');
    } catch (err) {
      setErrorMessage(err?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-page">
      <h2>Login</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label>
          Username
          <input {...register('username')} />
          {errors.username && <span className="field-error">{errors.username.message}</span>}
        </label>
        <label>
          Password
          <input type="password" {...register('password')} />
          {errors.password && <span className="field-error">{errors.password.message}</span>}
        </label>
        {errorMessage && <p className="field-error">{errorMessage}</p>}
        <button type="submit" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p>
        No account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
