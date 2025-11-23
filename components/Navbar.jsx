import React from 'react';
import { Link } from 'react-router-dom';


export const Navbar= ({ user, onLogout }) => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link 
              to="/home"
              className="flex-shrink-0 flex items-center cursor-pointer"
            >
              <div className="h-8 w-8 bg-red-600 text-white flex items-center justify-center font-bold rounded-sm text-lg mr-2">
                I
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900">Typeface</span>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-sm text-gray-700 mr-4">
                {user.email}
              </span>
              <button
                onClick={onLogout}
                className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};