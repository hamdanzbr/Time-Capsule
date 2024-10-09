import React, { useState } from 'react';
import useLogin from '../hooks/useLogin'; // Import the custom hook

const Login = ({ onSignupClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, error } = useLogin(); // Destructure login function and error state from the custom hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password); // Use the custom hook's login function
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <div className="bg-transparent p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">Log In</h2>
        {error && <p className="text-red-500 text-center">{error}</p>} 
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-black font-semibold mb-2">Email</label>
            <input
              type="email"
              autoComplete="email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-orange-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-black font-semibold mb-2">Password</label>
            <input
              type="password"
              autoComplete="current-password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-orange-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-500 transition-colors"
            >
              Log In
            </button>
          </div>
        </form>

        {/* Link to Signup */}
        <div className="mt-4 text-center">
          <p className="text-blue-600">
            Don't have an account?{' '}
            <a
              className="text-orange-600 font-semibold hover:underline"
              onClick={() => onSignupClick()}
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
