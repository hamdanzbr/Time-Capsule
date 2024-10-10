import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; 
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants'; 
import { AiOutlineLogout } from 'react-icons/ai';

const Header = () => {
    const navigate = useNavigate(); 
    const username = localStorage.getItem('username'); 
    const [isDropdownOpen, setDropdownOpen] = useState(false); 

    const handleLogout = async () => {
        try {
            await axios.post(`${BASE_URL}/logout`, {}, {
                withCredentials: true, 
            });

            localStorage.removeItem('token');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('username');

            navigate('/');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const handleDropdownToggle = () => {
        setDropdownOpen(!isDropdownOpen); 
    };

    const dropdownRef = useRef();
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false); 
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <header className="bg-gray-800 text-white py-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo or Title */}
                <h1 className="text-2xl font-bold">
                    <Link to="/" className="text-white hover:text-teal-300">Time Capsule</Link>
                </h1>

                <nav className="mr-6">
                    <ul className="flex space-x-8">
                        <li>
                            <Link to="/home" className="text-white accent-lime-900 hover:text-teal-300">Home</Link>
                        </li>
                        <li>
                            <Link to="/view" className="text-white hover:text-teal-300">View Files</Link>
                        </li>

                        <li ref={dropdownRef} className="relative">
                            <button
                                onClick={handleDropdownToggle}
                                className="text-white hover:text-teal-300 bg-red-600 p-1 rounded-lg px-2"
                            >
                                {username} ⛛
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg z-10">
                                    <ul>
                                        <li className="block px-4 py-2 hover:bg-gray-200">
                                            <button onClick={handleLogout} className="w-full text-left flex items-center justify-center">
                                                <span>Logout</span>
                                                <AiOutlineLogout className='text-red-600' />
                                            </button>
                                        </li>

                                    </ul>
                                </div>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
