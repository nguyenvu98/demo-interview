import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { useRegister } from '../hooks/useAuth';

const schema = z.object({
  username: z.string().min(3, 'Username must have at least 3 chars'),
  password: z.string().min(6, 'Password must have at least 6 chars'),
});

export default function RegisterPage() {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const registerMutation = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (values) => {
    setErrorMessage('');
    try {
      await registerMutation.mutateAsync(values);
      navigate('/products');
    } catch (err) {
      setErrorMessage(err?.response?.data?.message || 'Register failed');
    }
  };

  return (
    <div className="auth-page">
      <h2>Register</h2>
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
        <button type="submit" disabled={registerMutation.isPending}>
          {registerMutation.isPending ? 'Registering...' : 'Register'}
        </button>
      </form>
      <p>
        Already have account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
