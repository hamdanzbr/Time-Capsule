import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import db from '../utils/db'; // Make sure to adjust the path if necessary

const Home = () => {
  const [file, setFile] = useState(null);
  const [unlockDate, setUnlockDate] = useState('');
  const navigate = useNavigate();

  // Check for token on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); // Redirect to login page if not authenticated
    }
  }, [navigate]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDateChange = (e) => {
    setUnlockDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate file and unlock date
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }
    if (!unlockDate) {
      alert('Please set an unlock date.');
      return;
    }
  
    // Get user information from localStorage or your state management (Redux)
    const userEmail = localStorage.getItem('userEmail'); // Assume you saved the user's email during login
  
    // Create a user object
    const userData = {
      file: file,
      unlockDate: unlockDate,
      createdAt: new Date().toISOString(),
      userEmail: userEmail, // Store the user's email or ID
    };
  
    try {
      // Store user data in IndexedDB
      await db.files.add(userData);
      alert('File uploaded successfully!');
      // Reset form fields
      setFile(null);
      setUnlockDate('');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file. Please try again.');
    }
  };
  

  return (
    <>
      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-400">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Create a Time Capsule</h1>
    
          <form onSubmit={handleSubmit}>
            {/* File Upload Field */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fileUpload">
                Upload File
              </label>
              <input
                type="file"
                id="fileUpload"
                accept="image/*, video/*"
                className="block w-full text-gray-700 border rounded-lg px-3 py-2"
                onChange={handleFileChange}
                required
              />
            </div>
    
            {/* Date Picker Field */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="unlockDate">
                Set Unlock Date
              </label>
              <input
                type="datetime-local"
                id="unlockDate"
                className="block w-full text-gray-700 border rounded-lg px-3 py-2"
                value={unlockDate}
                onChange={handleDateChange}
                required
              />
            </div>
    
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
            >
              Save Time Capsule
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
