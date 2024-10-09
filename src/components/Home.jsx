import React from 'react';
import useTimeCapsule from '../hooks/useTimeCapsule'; // Adjust the path as necessary

const Home = () => {
  const {
    file,
    unlockDate,
    handleFileChange,
    handleDateChange,
    handleSubmit,
  } = useTimeCapsule(); // Destructure values and functions from the custom hook

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
                accept="image/*, video/*, text/plain" // Updated to accept text files
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
