import { Link } from 'react-router-dom';
import { RegisterForm } from '../components/molecules/RegisterForm/RegisterForm';
import { AuthTemplate } from '../components/templates/AuthTemplate/AuthTemplate';

export const RegisterPage = () => {
  return (
    <AuthTemplate
      title="Create an account"
      subtitle="Join Relecta and start recycling your e-waste."
      footer={
        <p className="text-sm text-ink">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-fb-blue hover:underline">
            Log in
          </Link>
        </p>
      }
    >
      <RegisterForm />
    </AuthTemplate>
  );
};
