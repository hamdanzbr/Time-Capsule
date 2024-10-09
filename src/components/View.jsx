import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import FileViewer from './FileViewer'; // Import the FileViewer component
import useFileViewer from '../hooks/useFileViewer'; // Import the custom hook

const View = () => {
  const navigate = useNavigate();
  const { files, selectedFile, handleRowClick, setSelectedFile } = useFileViewer(navigate); // Destructure values and functions from the custom hook

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

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
              const timeRemaining = file.timeRemaining; 
              return (
                <tr
                  key={index}
                  onClick={() => handleRowClick(file)}
                  className={`cursor-pointer ${timeRemaining !== 'Ready' ? 'bg-gray-200' : 'bg-green-300'} hover:bg-blue-500`}
                >
                  <td className="border border-gray-300 p-2">📁 {file.file ? file.file.name : 'Text File'}</td>
                  <td className="border border-gray-300 p-2 text-center">{file.unlockDate}</td>
                  <td className="border border-gray-300 p-2 text-center">{timeRemaining}</td>
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
