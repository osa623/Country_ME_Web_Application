import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      <p className="ml-3 text-lg font-medium text-gray-700">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
