import React, { useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';

const FileViewer = ({ file, onClose }) => {
    const fileURL = useRef(file.file ? URL.createObjectURL(file.file) : null);
    console.log(fileURL);
    

    useEffect(() => {
      return () => {
        if (fileURL.current) {
          console.log('Revoking URL:', fileURL.current);
          URL.revokeObjectURL(fileURL.current);
        }
      };
    }, []);
    
    useEffect(() => {
        fileURL.current = file.file ? URL.createObjectURL(file.file) : null;
    }, [file]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-3xl">
                <h3 className="text-xl font-bold mb-4">{file.file ? file.file.name : 'Text File'}</h3>

                <div className="relative w-full h-auto max-h-[500px] flex justify-center items-center overflow-auto"> 
                    {file.file ? (
                        file.file.type.startsWith('image/') ? (
                            <img 
                                src={fileURL.current}
                                alt={file.file.name}
                                className="max-h-full max-w-full object-contain" 
                            />
                        ) : file.file.type.startsWith('video/') ? (
                            <ReactPlayer 
                                url={fileURL.current} 
                                controls
                                className="max-h-full max-w-full object-contain" 
                            />
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
