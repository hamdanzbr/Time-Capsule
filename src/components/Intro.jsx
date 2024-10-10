import React, { useEffect, useState } from 'react';
import Signup from './Signup';
import Login from './Login';
import { useNavigate } from 'react-router-dom';

const Intro = () => {
    const [isSignup, setIsSignup] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            return navigate('/home');
        }
    }, [navigate]);

    return (
        <div 
            className='min-h-screen flex items-center justify-center bg-cover bg-center'
            style={{ backgroundImage: 'url(https://i.postimg.cc/B619HnCj/time-cap.jpg)' }}
        >
            {
                isSignup ? (
                    <Signup onLoginClick={() => setIsSignup(false)} />
                ) : (
                    <Login onSignupClick={() => setIsSignup(true)} />
                )
            }
        </div>
    );
};

export default Intro;
