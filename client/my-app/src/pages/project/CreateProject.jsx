import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProjectAPI } from '../../api/project'
import { addProject } from '../../slices/projectSlice';

function CreateProject() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const project = await createProjectAPI(formData);
      dispatch(addProject(project));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create project');
    }
  };

  return (
     <div className="min-h-screen flex items-center justify-center bg-gray-400 px-4">
      <div className="max-w-xl w-full p-6 bg-white mt-10 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create New Project</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Project Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows="4"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Project
        </button>
        
      </form>
    </div>
    </div>  
  );
}

export default CreateProject;
