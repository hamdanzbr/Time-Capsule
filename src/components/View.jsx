import React, { useEffect, useState } from 'react';
import db from '../utils/db'; // Adjust the path as necessary
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import FileViewer from './FileViewer'; // Import the FileViewer component

const View = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null); // To hold the currently selected file
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    
    fetchFiles();
  }, []);

  // Live Timer Logic
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Re-fetch files to update time remaining dynamically
      setFiles((prevFiles) => {
        return prevFiles.map(file => ({
          ...file,
          timeRemaining: getTimeRemaining(file.unlockDate)
        }));
      });
    }, 1000); // Update every second

    // Cleanup the interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  const fetchFiles = async () => {
    const allFiles = await db.files.toArray(); // Fetch all files from IndexedDB
    const userEmail = localStorage.getItem('userEmail'); // Get current user's email

    // Filter files to only include those that belong to the user
    const userFiles = allFiles.filter(file => file.userEmail === userEmail);
    setFiles(userFiles);
  };

  const handleRowClick = (file) => {
    const currentDateTime = new Date();
    if (new Date(file.unlockDate) <= currentDateTime) {
      setSelectedFile(file); // Open the file in FileViewer
    } else {
      alert('This file is locked until the unlock time has passed.');
    }
  };

  const getTimeRemaining = (unlockDate) => {
    const currentDateTime = new Date();
    const remainingTime = new Date(unlockDate) - currentDateTime;
    const seconds = Math.floor((remainingTime / 1000) % 60);
    const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
    const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

    // If time remaining is 0 or less, return 'Ready'
    return remainingTime > 0
      ? `${days}d ${hours}h ${minutes}m ${seconds}s`
      : 'Ready';
  };

  return (
    <div>
      <Header />
      <h2>Your Uploaded Files</h2>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">File Name</th>
            <th className="border border-gray-300 p-2">Unlock Date</th>
            <th className="border border-gray-300 p-2">Time Remaining</th>
          </tr>
        </thead>
        <tbody>
          {files.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center border border-gray-300 p-2">No files available</td>
            </tr>
          ) : (
            files.map((file, index) => {
              const timeRemaining = getTimeRemaining(file.unlockDate);
              return (
                <tr
                  key={index}
                  onClick={() => handleRowClick(file)}
                  className={`cursor-pointer ${timeRemaining !== 'Ready' ? 'bg-gray-200' : 'bg-gray-300'}`}
                >
                  <td className="border border-gray-300 p-2">{file.file.name}</td>
                  <td className="border border-gray-300 p-2">{file.unlockDate}</td>
                  <td className="border border-gray-300 p-2">{timeRemaining}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* Conditionally render FileViewer */}
      {selectedFile && (
        <FileViewer
          file={selectedFile}
          onClose={() => setSelectedFile(null)} // Close the modal
        />
      )}
    </div>
  );
};

export default View;
