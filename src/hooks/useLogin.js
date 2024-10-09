import { useState } from 'react';
import db from '../utils/db'; // Adjust the path if needed
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const login = async (email, password) => {
    setError(''); // Reset the error state

    // Check if the user exists
    const user = await db.users.where('email').equals(email).first();

    if (!user) {
      setError('User not found!');
      return;
    }

    // Check if the password matches
    if (user.password !== password) {
      setError('Incorrect password!');
      return;
    }

    // Generate a simple token (for demonstration purposes)
    const token = Math.random().toString(36).substring(2);

    // Store token and user email in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('userEmail', user.email);

    // Navigate to the home page
    navigate('/home');
  };

  return { login, error };
};

export default useLogin;
