import React, { useState } from 'react';

interface AuthFormProps {
  type: 'login' | 'register';
  onSubmit: (email: string, password: string, username?: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit }) => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    username: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password, username } = formState;
    onSubmit(email, password, type === 'register' ? username : undefined);
    resetForm();
  };

  const resetForm = () => {
    setFormState({
      email: '',
      password: '',
      username: '',
    });
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="max-w-lg mx-auto p-8 bg-gray-50 shadow-md rounded-md border border-gray-300"
    >
      <h2 className="text-3xl font-bold mb-8 text-gray-700 text-center">
        {type === 'login' ? 'Sign In' : 'Sign Up'}
      </h2>
      {type === 'register' && (
        <div className="mb-6">
          <label className="block text-gray-600 font-semibold mb-1" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Enter your username"
            value={formState.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
          />
        </div>
      )}
      <div className="mb-6">
        <label className="block text-gray-600 font-semibold mb-1" htmlFor="email">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formState.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-600 font-semibold mb-1" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={formState.password}
          autoComplete="current-password"
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
        />
      </div>
      <button 
        type="submit" 
        className="w-full py-3 bg-indigo-600 text-white font-bold rounded-md shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-400"
      >
        {type === 'login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default AuthForm;
