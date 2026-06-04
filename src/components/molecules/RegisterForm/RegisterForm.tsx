import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '../../../stores/authStore';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../atoms/Button/Button';
import { Input } from '../../atoms/Input/Input';
import { Label } from '../../atoms/Label/Label';

const registerSchema = z.object({
  fullName: z.string().min(2, 'Name is too short'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterInput = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const registerUser = useAuthStore((state) => state.register);
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterInput) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword: _confirmPassword, ...userData } = data;
    const result = registerUser(userData);
    
    if (result.success) {
      alert(result.message);
      navigate('/login');
    } else {
      setError('email', { message: result.message });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label>Full Name</Label>
        <Input
          {...register('fullName')}
          error={!!errors.fullName}
          placeholder="John Doe"
        />
        {errors.fullName && <p className="mt-1 text-sm text-rose-600">{errors.fullName.message}</p>}
      </div>

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
          placeholder="Min. 8 characters"
        />
        {errors.password && <p className="mt-1 text-sm text-rose-600">{errors.password.message}</p>}
      </div>

      <div>
        <Label>Confirm Password</Label>
        <Input
          {...register('confirmPassword')}
          type="password"
          error={!!errors.confirmPassword}
          placeholder="Repeat password"
        />
        {errors.confirmPassword && <p className="mt-1 text-sm text-rose-600">{errors.confirmPassword.message}</p>}
      </div>

      <Button type="submit" className="w-full">
        Create Account
      </Button>
    </form>
  );
};
