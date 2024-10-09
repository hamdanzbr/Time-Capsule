import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import db from '../utils/db'; // Make sure to adjust the path if necessary

const useTimeCapsule = () => {
  const [file, setFile] = useState(null);
  const [unlockDate, setUnlockDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); 
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
    
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }
    if (!unlockDate) {
      alert('Please set an unlock date.');
      return;
    }

    const userEmail = localStorage.getItem('userEmail'); // Assume you saved the user's email during login
    
    // Create a user object
    const fileData = {
      unlockDate: unlockDate,
      createdAt: new Date().toISOString(),
      userEmail: userEmail, // Store the user's email or ID
    };

    try {
      // For text files, read the content
      if (file.type.startsWith('text/')) {
        const textContent = await file.text(); // Read the text content
        await db.files.add({ ...fileData, fileType: 'text', fileContent: textContent });
      } else {
        // For images and videos, store the file object directly
        fileData.file = file; // Add file object for images/videos
        fileData.fileType = file.type.startsWith('image/') ? 'image' : 'video';
        await db.files.add(fileData);
      }

      alert('File uploaded successfully!');
      setFile(null);
      setUnlockDate('');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file. Please try again.');
    }
  };

  return {
    file,
    unlockDate,
    handleFileChange,
    handleDateChange,
    handleSubmit,
  };
};

export default useTimeCapsule;
