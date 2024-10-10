import { useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants'; 

const useLogin = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const login = async (email, password) => {
    setError('');
    try {
      const response = await axios.post(`${BASE_URL}/login`, { email, password }, {
        withCredentials: true, 
      });

      const { token, data } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('userEmail', data.email);
      localStorage.setItem('username',data.username)
      navigate('/home');
    } catch (err) {
      setError('Invalid email or password!');
    }
  };

  return { login, error };
};

export default useLogin;
