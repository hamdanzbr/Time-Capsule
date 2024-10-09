import React, { useEffect } from 'react';

const FileViewer = ({ file, onClose }) => {
  const fileURL = URL.createObjectURL(file.file); // Create a URL for the file
  useEffect(()=>{
    return()=>{
        URL.revokeObjectURL(fileURL)
    }
  },[])
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-3xl">
        <h3 className="text-xl font-bold mb-4">{file.file.name}</h3>

        {/* File Display Container with uniform sizing */}
        <div className="relative w-full h-auto max-h-[500px] flex justify-center items-center">
          {file.file.type.startsWith('image/') ? (
            <img 
              src={fileURL}
              alt={file.file.name}
              className="w-full h-96 object-contain"
            />
          ) : file.file.type.startsWith('video/') ? (
            <video controls className="w-full h-auto max-h-full object-contain">
              <source src={fileURL} type={file.file.type} />
              Your browser does not support the video tag.
            </video>
          ) : null}
        </div>

        {/* Close button */}
        <div className="text-right mt-4">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileViewer;
