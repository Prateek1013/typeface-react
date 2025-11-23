import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { FileCard } from '../components/FileCard';
import { Button } from '../components/Button';
import { FileType } from '../types';
import { ConfirmationDialog } from '../components/ConfirmationDialog';


export const Home = ({ user }) => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const [deleteConfirmation, setDeleteConfirmation] = useState({ isOpen: false, fileId: null });

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      const token = Cookies.get('token');
      const response = await fetch('/api/files', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        const mappedFiles = data.map(f => ({
          id: f.url.split('/').pop(),
          name: f.name,
          type: f.type,
          size: f.size,
          url: f.url,
          createdAt: Date.now()
        }));
        setFiles(mappedFiles);
      }
    } catch (error) {
      console.error('Failed to load files:', error);
    }
  };

  const handleFileClick = (fileId) => {
    navigate(`/view/${fileId}`);
  };

  const handleDeleteClick = (fileId) => {
    setDeleteConfirmation({ isOpen: true, fileId });
  };

  const handleConfirmDelete = async () => {
    const fileId = deleteConfirmation.fileId;
    if (!fileId) return;

    try {
      const token = Cookies.get('token');
      const response = await fetch(`/api/files/${fileId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setFiles(prev => prev.filter(f => f.id !== fileId));
        setDeleteConfirmation({ isOpen: false, fileId: null });
      } else {
        alert('Failed to delete file');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete file');
    }
  };

  const handleFileChange = async (e) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    setIsUploading(true);
    try {
      const token = Cookies.get('token');
      const formData = new FormData();
      formData.append('file', fileList[0]);

      const response = await fetch('/api/files/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        await loadFiles();
      } else {
        alert('File upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('File upload failed');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Your Files</h1>
        <div className="relative">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
            multiple
          />
          <Button loading={isUploading} onClick={() => fileInputRef.current?.click()}>
            Upload File
          </Button>
        </div>
      </div>

      {files.length === 0 ? (
        <div className="text-center py-24 border-2 border-gray-300 border-dashed rounded-lg">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No files</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by uploading a new file.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {files.map((file) => (
            <FileCard 
              key={file.id} 
              file={file} 
              onClick={() => handleFileClick(file.id)} 
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      )}

      <ConfirmationDialog
        isOpen={deleteConfirmation.isOpen}
        title="Delete File"
        message="Are you sure you want to delete this file? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteConfirmation({ isOpen: false, fileId: null })}
      />
    </div>
  );
};