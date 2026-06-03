import { Link } from 'react-router-dom';
import { LoginForm } from '../components/molecules/LoginForm/LoginForm';
import { AuthTemplate } from '../components/templates/AuthTemplate/AuthTemplate';

export const LoginPage = () => {
  return (
    <AuthTemplate
      title="Welcome back"
      subtitle="Log in to manage your e-waste pickups."
      footer={
        <p className="text-sm text-ink">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-fb-blue hover:underline">
            Sign up
          </Link>
        </p>
      }
    >
      <LoginForm />
    </AuthTemplate>
  );
};
