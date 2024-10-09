import React, { useEffect, useState } from 'react';
import db from '../utils/db'; // Adjust the path as necessary
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const View = () => {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchFiles = async () => {
      const allFiles = await db.files.toArray(); // Fetch all files from IndexedDB
      const currentDateTime = new Date();
      const userEmail = localStorage.getItem('userEmail'); // Get current user's email

      // Filter files to only include those that are accessible and belong to the user
      const accessibleFiles = allFiles.filter(file => 
        file.userEmail === userEmail && new Date(file.unlockDate) <= currentDateTime
      );

      setFiles(accessibleFiles);
    };

    fetchFiles();
  }, []);

  useEffect(() => {
    // Cleanup function to revoke object URLs when the component unmounts
    return () => {
      files.forEach(file => {
        URL.revokeObjectURL(URL.createObjectURL(file.file));
      });
    };
  }, [files]);

  return (
    <>
          <Header />

    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Uploaded Files</h2>
      {files.length === 0 ? (
        <p className="text-lg text-gray-600">No files available or unlock time has not arrived yet.</p>
      ) : (
        <ul className="w-full max-w-2xl bg-white rounded-lg shadow-md divide-y divide-gray-200">
          {files.map((file, index) => {
            // Create a URL for the file
            const fileURL = URL.createObjectURL(file.file); // Use the file object to create a URL

            return (
              <li key={index} className="p-4 flex flex-col">
                <div className="mb-2">
                  <span className="font-semibold">File:</span> {file.file.name}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Unlock Date:</span> {new Date(file.unlockDate).toLocaleString()}
                </div>
                {/* Render the file based on its type */}
                {file.file.type.startsWith('image/') ? (
                  <img src={fileURL} alt={file.file.name} className="max-w-full rounded-lg" />
                ) : file.file.type.startsWith('video/') ? (
                  <video controls className="max-w-full rounded-lg">
                    <source src={fileURL} type={file.file.type} />
                    Your browser does not support the video tag.
                  </video>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </div>
    </>
  );
};

export default View;
