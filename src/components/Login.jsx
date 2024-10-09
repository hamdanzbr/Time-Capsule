import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeSignupPage } from '../redux/appSlice';
import db from '../utils/db'; // Make sure to adjust the path if necessary
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for error handling
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
  
    // Check if user exists and password matches
    const user = await db.users.where('email').equals(email).first();
  
    if (!user) {
      setError('User not found!');
      return;
    }
  
    if (user.password !== password) {
      setError('Incorrect password!');
      return;
    }
  
    // If the login is successful, generate a token
    const token = Math.random().toString(36).substring(2); // Generate a simple token
  
    // Store the token and email in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('userEmail', user.email); // Store the user's email
  
    // Navigate to the home page
    navigate('/home');
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <div className="bg-transparent p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">Log In</h2>
        {error && <p className="text-red-500 text-center">{error}</p>} {/* Display error messages */}
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
              required // Ensure this field is required
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
              required // Ensure this field is required
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
              onClick={() => dispatch(changeSignupPage())}
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
