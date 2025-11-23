import React from 'react';



const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const FileCard = ({ file, onClick, onDelete }) => {
  const getIcon = () => {
    switch (file.type) {
      case 'image':
        return (
          <div className="h-24 w-full bg-gray-100 flex items-center justify-center overflow-hidden rounded-t-md">
             <img src={file.content} alt={file.name} className="object-cover w-full h-full opacity-90" />
          </div>
        );
      case 'json':
        return (
          <div className="h-24 w-full bg-yellow-50 flex items-center justify-center text-yellow-600 text-4xl rounded-t-md">
            <span>{`{ }`}</span>
          </div>
        );
      case 'pdf':
        return (
          <div className="h-24 w-full bg-red-50 flex items-center justify-center text-red-600 rounded-t-md">
            <div className="flex flex-col items-center">
              <svg className="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              <span className="text-xs font-bold">PDF</span>
            </div>
          </div>
        );
      case 'text':
        return (
          <div className="h-24 w-full bg-blue-50 flex items-center justify-center text-blue-600 text-4xl rounded-t-md">
             <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </div>
        );
      default:
        return (
          <div className="h-24 w-full bg-gray-100 flex items-center justify-center text-gray-400 text-4xl rounded-t-md">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
          </div>
        );
    }
  };

  return (
    <div 
      onClick={() => onClick(file)}
      className="group relative bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col"
    >
      {getIcon()}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900 truncate" title={file.name}>
              {file.name}
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              {formatBytes(file.size)}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(file.id);
            }}
            className="ml-2 text-gray-400 hover:text-red-500"
            title="Delete file"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
        <p className="mt-2 text-xs text-gray-400">
          {new Date(file.createdAt).toLocaleDateString()}
        </p>
      </div>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full uppercase">
            {file.type}
          </span>
          <span className="text-xs text-gray-500">
            {formatBytes(file.size)}
          </span>
        </div>
      </div>
    </div>
  );
};