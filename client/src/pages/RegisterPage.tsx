import React from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate
import AuthForm from '../components/AuthForm';
import { registerUser } from '../services/apiClient';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate(); // Hook to handle navigation

  const handleRegister = async (email: string, password: string, username?: string) => {
    try {
      const response = await registerUser(username!, email, password);
      if (response.status === 201) { // Check for 201 Created
        navigate('/login'); // Redirect to the login page
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Registration failed:', error instanceof Error ? error.message : 'Unknown error');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-900">Create Account</h1>
        <AuthForm type="register" onSubmit={handleRegister} />
        <div className="mt-6 text-center">
          <p className="text-gray-700">Already a member?</p>
          <Link to="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">Sign in here</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
