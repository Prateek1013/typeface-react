import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Button } from '../components/Button';
import { ConfirmationDialog } from '../components/ConfirmationDialog';

export const FileViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fileUrl, setFileUrl] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  useEffect(() => {
    fetchFile();
  }, [id]);

  const fetchFile = async () => {
    try {
      const token = Cookies.get('token');
      const response = await fetch(`/api/files/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        setFileUrl(url);
        setFileType(response.headers.get('content-type'));
        
        // Try to get filename from content-disposition
        const contentDisposition = response.headers.get('content-disposition');
        let name = 'downloaded_file';
        if (contentDisposition) {
          const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
          if (filenameMatch && filenameMatch.length === 2)
            name = filenameMatch[1];
        }
        setFileName(name);
      } else {
        console.error('Failed to fetch file');
      }
    } catch (error) {
      console.error('Error fetching file:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (fileUrl) {
      const a = document.createElement('a');
      a.href = fileUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const handleDelete = async () => {
    try {
      const token = Cookies.get('token');
      const response = await fetch(`/api/files/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        navigate('/home');
      } else {
        alert('Failed to delete file');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete file');
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {fileName}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {fileType}
            </p>
          </div>
          <div className="flex space-x-3">
            <Button onClick={handleDownload}>
              Download
            </Button>
            <Button 
              onClick={() => setDeleteConfirmation(true)}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
            >
              Delete
            </Button>
          </div>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6 flex justify-center bg-gray-50 min-h-[500px] items-center">
          {fileType && fileType.startsWith('image/') ? (
            <img src={fileUrl} alt={fileName} className="max-w-full max-h-[70vh] object-contain" />
          ) : fileType === 'application/pdf' ? (
             <iframe src={fileUrl} className="w-full h-[70vh]" title={fileName}></iframe>
          ) : (
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <p className="mt-2 text-sm text-gray-500">Preview not available for this file type.</p>
            </div>
          )}
        </div>
      </div>

      <ConfirmationDialog
        isOpen={deleteConfirmation}
        title="Delete File"
        message="Are you sure you want to delete this file? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirmation(false)}
      />
    </div>
  );
};