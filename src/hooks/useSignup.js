import { useState } from 'react';
import db from '../utils/db'; // Adjust the path if needed
import { useNavigate } from 'react-router-dom';

const useSignup = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const signup = async (name, email, password) => {
    // Reset the error state
    setError('');

    // Check if the user already exists
    const existingUser = await db.users.where('email').equals(email).first();
    if (existingUser) {
      setError('User already exists!');
      return;
    }

    // Generate a simple token for demonstration purposes
    const token = Math.random().toString(36).substring(2);

    const userData = {
      name,
      email,
      password, // Store the password here (consider hashing in production)
    };

    try {
      // Store user data in IndexedDB
      await db.users.add(userData);

      // Retrieve the saved user to confirm the operation
      const savedUser = await db.users.where('email').equals(email).first();
      if (savedUser) {
        console.log('User saved successfully:', savedUser);
        alert('User saved successfully');

        // Store the token in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userEmail', email);

        // Navigate to the home page
        navigate('/home');
      } else {
        setError('Failed to save user data.');
      }
    } catch (error) {
      console.error('Error saving user data:', error);
      setError('An error occurred during signup. Please try again.');
    }
  };

  return { signup, error };
};

export default useSignup;
