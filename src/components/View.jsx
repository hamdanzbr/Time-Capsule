import React, { lazy, Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import useFileViewer from '../hooks/useFileViewer'; 
import { formatDate } from '../utils/constants';
const FileViewer=lazy(()=>import ('./FileViewer'))

const View = () => {
  const navigate = useNavigate();
  const { files, selectedFile, handleRowClick, setSelectedFile } = useFileViewer(navigate); 

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
            <th className="border border-gray-300 p-2">Capsule Name</th>
            <th className="border border-gray-300 p-2">Capsule Created</th>
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
            files.map((file) => {
              const timeRemaining = file.timeRemaining; 
              return (
                <tr
                  key={file.id}
                  onDoubleClick={() => handleRowClick(file)}
                  className={`cursor-pointer ${timeRemaining !== 'Ready' ? 'bg-gray-200' : 'bg-green-300'} hover:bg-blue-500`}
                >
                  <td className="border border-gray-300 p-2">📁 {file.file ? file.file.name : 'Text File'}</td>
                  <td className="border border-gray-300 p-2 text-center">{file.timeCapsuleName}</td>  
                  <td className="border border-gray-300 p-2 text-center">{formatDate(file.createdAt)}</td>
                  <td className="border border-gray-300 p-2 text-center">{formatDate (file.unlockDate)}</td>
                  <td className="border border-gray-300 p-2 text-center">{timeRemaining}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* Conditionally render FileViewer */}
      {selectedFile && (
  <div className='h-screen w-screen flex justify-center items-center '>
    <Suspense fallback={<h1>Loading...</h1>}>
      <FileViewer
        file={selectedFile}
        onClose={() => setSelectedFile(null)}
      />
    </Suspense>
  </div>
)}

    </div>
  );
};

export default View;
