import React, { useEffect } from 'react';

const FileViewer = ({ file, onClose }) => {
    const fileURL = file.file ? URL.createObjectURL(file.file) : null; 

  useEffect(() => {

    return () => {
      if (fileURL) {
        console.log('Revoking URL:', fileURL);
        URL.revokeObjectURL(fileURL);
      }
    };
  }, []);
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-3xl">
        <h3 className="text-xl font-bold mb-4">{file.file ? file.file.name : 'Text File'}</h3>

        <div className="relative w-full h-auto max-h-[500px] flex justify-center items-center overflow-auto"> 
          {file.file ? (
            file.file.type.startsWith('image/') ? (
              <img 
                src={fileURL}
                alt={file.file.name}
                className="max-h-full max-w-full object-contain" 
              />
            ) : file.file.type.startsWith('video/') ? (
              <video controls className="max-h-full max-w-full object-contain"> 
                <source src={fileURL} type={file.file.type} />
                Your browser does not support the video tag.
              </video>
            ) : null
          ) : (
            <div className="text-black mt-96 p-4 overflow-auto">{file.fileContent}</div> 
          )}
        </div>

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
