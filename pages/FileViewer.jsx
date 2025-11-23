import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FileType } from '../types';

export const FileViewer = () => {
  const { id: fileId } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching file
    setTimeout(() => {
      setFile({
        id: fileId,
        name: 'Demo File.pdf',
        type: FileType.PDF,
        size: 1024 * 1024 * 2, // 2MB
        url: '#',
        createdAt: Date.now()
      });
      setLoading(false);
    }, 500);
  }, [fileId]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!file) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">File not found</h2>
        <button
          onClick={handleBack}
          className="text-blue-600 hover:text-blue-800"
        >
          Go back home
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={handleBack}
            className="mr-4 p-2 rounded-full hover:bg-gray-100"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">{file.name}</h1>
            <p className="text-sm text-gray-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB • {new Date(file.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Download
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            Share
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-8 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-12 max-w-4xl w-full aspect-video flex items-center justify-center bg-gray-50 border-2 border-dashed border-gray-200">
          <div className="text-center">
            <div className="text-6xl mb-4">
              {file.type === FileType.IMAGE ? '🖼️' : 
               file.type === FileType.PDF ? '📄' : 
               file.type === FileType.DOC ? '📝' : '📁'}
            </div>
            <p className="text-gray-500">Preview not available in demo mode</p>
          </div>
        </div>
      </div>
    </div>
  );
};