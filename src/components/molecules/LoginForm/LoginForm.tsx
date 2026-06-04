import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '../../../stores/authStore';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../atoms/Button/Button';
import { Input } from '../../atoms/Input/Input';
import { Label } from '../../atoms/Label/Label';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginInput = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const loginUser = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginInput) => {
    const result = loginUser(data.email, data.password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError('root', { message: result.message });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {errors.root && (
        <div className="p-3 bg-red-50 border border-rose-600 rounded-lg text-sm text-rose-600 font-medium">
          {errors.root.message}
        </div>
      )}

      <div>
        <Label>Email</Label>
        <Input
          {...register('email')}
          type="email"
          error={!!errors.email}
          placeholder="email@example.com"
        />
        {errors.email && <p className="mt-1 text-sm text-rose-600">{errors.email.message}</p>}
      </div>

      <div>
        <Label>Password</Label>
        <Input
          {...register('password')}
          type="password"
          error={!!errors.password}
          placeholder="Enter your password"
        />
        {errors.password && <p className="mt-1 text-sm text-rose-600">{errors.password.message}</p>}
      </div>

      <Button type="submit" variant="buy" className="w-full">
        Log In
      </Button>
    </form>
  );
};
