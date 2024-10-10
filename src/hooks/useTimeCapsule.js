import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import db from '../utils/db';

const useTimeCapsule = () => {
  const [file, setFile] = useState(null);
  const [unlockDate, setUnlockDate] = useState('');
  const [timeCapsuleName, setTimeCapsuleName] = useState(''); 
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

  const handleNameChange = (e) => {
    setTimeCapsuleName(e.target.value);
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
    if (!timeCapsuleName) {
      alert('Please provide a name for your time capsule.');
      return;
    }

    const userEmail = localStorage.getItem('userEmail');

    const fileData = {
      unlockDate,
      createdAt: new Date().toISOString(),
      userEmail,
      timeCapsuleName, 
    };

    try {
      if (file.type.startsWith('text/')) {
        const textContent = await file.text(); 
        await db.files.add({ ...fileData, fileType: 'text', fileContent: textContent });
      } else {
        fileData.file = file;
        fileData.fileType = file.type.startsWith('image/') ? 'image' : 'video';
        await db.files.add(fileData);
      }

      alert('Time capsule created successfully!');
      setFile(null);
      setUnlockDate('');
      setTimeCapsuleName(''); 
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file. Please try again.');
    }
  };

  return {
    file,
    unlockDate,
    timeCapsuleName, 
    handleFileChange,
    handleDateChange,
    handleNameChange, 
    handleSubmit,
  };
};

export default useTimeCapsule;
