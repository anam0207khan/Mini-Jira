import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center drop-shadow-lg">
        Welcome to <span className="text-yellow-300">Mini Jira</span>
      </h1>
      <p className="text-lg md:text-xl mb-10 max-w-xl text-center drop-shadow-sm">
        Your lightweight project and task management tool.
        Organize your projects efficiently with a simple and effective Kanban board.
      </p>
      
      <div className="flex space-x-6">
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl cursor-pointer shadow-lg hover:bg-gray-100 transition"
        >
          Login
        </button>
        <button
          onClick={() => navigate('/register')}
          className="px-6 py-3 bg-yellow-300 text-gray-900 font-semibold cursor-pointer rounded-xl shadow-lg hover:bg-yellow-400 transition"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default HomePage;
