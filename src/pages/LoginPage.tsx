import { Link } from 'react-router-dom';
import { LoginForm } from '../components/molecules/LoginForm/LoginForm';
import { AuthTemplate } from '../components/templates/AuthTemplate/AuthTemplate';

export const LoginPage = () => {
  return (
    <AuthTemplate
      title="Welcome back"
      subtitle="Log in to manage your e-waste pickups."
      footer={
        <p className="text-sm text-slate-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-emerald-600 hover:underline">
            Sign up
          </Link>
        </p>
      }
    >
      <LoginForm />
    </AuthTemplate>
  );
};
