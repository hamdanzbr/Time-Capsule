import { useEffect, useState } from 'react';
import db from '../utils/db';

const useFileViewer = (navigate) => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    const allFiles = await db.files.toArray(); 
    const userEmail = localStorage.getItem('userEmail'); 

    const userFiles = allFiles.filter(file => file.userEmail === userEmail);
    setFiles(userFiles);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFiles((prevFiles) => {
        // Update the time remaining for each file
        const updatedFiles = prevFiles.map(file => {
          const timeRemaining = getTimeRemaining(file.unlockDate);
          return { 
            ...file,
            timeRemaining,
          };
        });

        // Check if all files are ready, and if so, clear the interval
        const isAllFilesReady = updatedFiles.every(file => file.timeRemaining === 'Ready');
        if (isAllFilesReady) {
          clearInterval(intervalId); // Clear the interval when all files are ready
        }

        return updatedFiles;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const getTimeRemaining = (unlockDate) => {
    const currentDateTime = new Date();
    const remainingTime = new Date(unlockDate) - currentDateTime;
    const seconds = Math.floor((remainingTime / 1000) % 60);
    const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
    const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

    // Return 'Ready' if the time is 0 or less
    return remainingTime > 0
      ? `${days}d ${hours}h ${minutes}m ${seconds}s`
      : 'Ready';
  };

  const handleRowClick = (file) => {
    const currentDateTime = new Date();
    if (new Date(file.unlockDate) <= currentDateTime) {
      setSelectedFile(file); 
    } else {
      alert('This file is locked until the unlock time has passed.');
    }
  };

  return {
    files,
    selectedFile,
    handleRowClick,
    setSelectedFile,
  };
};

export default useFileViewer;
