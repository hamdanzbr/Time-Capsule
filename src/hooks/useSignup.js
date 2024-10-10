import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const useSignup = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const signup = async (name, email, password) => {
    setError('');

    try {
      const response = await fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: name, email, password })
        
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('userEmail', data.data.email); 
        localStorage.setItem('username',data.data.username)
        
        navigate('/home');
      } else {
        setError(data.message || 'Signup failed. Please try again.');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('An error occurred during signup. Please try again.');
    }
  };

  return { signup, error };
};

export default useSignup;
