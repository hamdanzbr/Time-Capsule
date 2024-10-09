import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate(); // Use the useNavigate hook for navigation

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail')
    // Optionally clear user data from IndexedDB if needed
    // db.users.clear(); // Uncomment if you want to clear user data on logout

    // Redirect to the signup page
    navigate('/');
  };

  return (
    <header className="bg-gray-800 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Title */}
        <h1 className="text-2xl font-bold">
          <Link to="/" className="text-white hover:text-teal-300">Time Capsule</Link>
        </h1>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/home" className="text-white hover:text-teal-300">Home</Link>
            </li>
            <li>
              <Link to="/view" className="text-white hover:text-teal-300">View Unlocked Files</Link>
            </li>
            <li>
              <button
                onClick={handleLogout} // Call the handleLogout function on click
                className="text-white hover:text-teal-300"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
