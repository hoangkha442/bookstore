import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 rounded-lg">
      <div className="bg-white p-40 py-20 rounded-lg shadow-lg text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Admin Home</h2>
        <img
          src="https://images.unsplash.com/photo-1512820790803-83ca734da794"
          alt="Books"
          className="w-full max-w-md mx-auto rounded"
        />
        <p className="text-gray-600 mt-4">Quản lý và theo dõi các hoạt động của bạn từ đây!</p>
      </div>
    </div>
  );
};

export default Home;
