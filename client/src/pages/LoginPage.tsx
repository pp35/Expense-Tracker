import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { loginUser } from '../services/apiClient';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await loginUser(email, password);
      if (response.status === 200) {
        // Redirect to dashboard on successful login
        navigate('/dashboard');
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Login failed:', error instanceof Error ? error.message : 'Unknown error');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-900">Sign In</h1>
        <AuthForm type="login" onSubmit={handleLogin} />
        <div className="mt-6 text-center">
          <p className="text-gray-700">New to our platform?</p>
          <Link to="/register" className="text-teal-600 hover:text-teal-800 font-medium">Create an account</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
