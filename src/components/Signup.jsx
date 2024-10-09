import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeSignupPage } from '../redux/appSlice';
import db from '../utils/db'; // Adjust the path if needed
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if the user already exists
    const existingUser = await db.users.where('email').equals(email).first();
    if (existingUser) {
      setError('User already exists!');
      return;
    }
  
    // Generate a mock token (for demonstration purposes)
    const token = Math.random().toString(36).substring(2); // Simple token generation
  
    // Prepare the user data
    const userData = {
      name,
      email,
      password,
      token,
    };
  
    try {
      // Store user data in IndexedDB
      await db.users.add(userData);
  
      // Store the token in localStorage
      localStorage.setItem('token', token);
  
      // Confirm the data was saved by retrieving it
      const savedUser = await db.users.where('email').equals(email).first();
      if (savedUser) {
        console.log('User saved successfully:', savedUser);
        // Optionally navigate to the home page
        navigate('/home');
      } else {
        setError('Failed to save user data.');
      }
    } catch (error) {
      console.error('Error saving user data:', error);
      setError('An error occurred during signup. Please try again.');
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">First Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-orange-500"
              placeholder="Enter your first name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
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
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
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

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-500 transition-colors"
            >
              Sign Up
            </button>
          </div>
        </form>
        {/* Link to Login */}
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <a
              className="text-orange-600 font-semibold hover:underline"
              onClick={() => dispatch(changeSignupPage())}
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
