
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  getProjectByIdAPI,
  updateProjectAPI,
  deleteProjectAPI,
} from '../../api/project';
import { setSelectedProject } from '../../slices/projectSlice';

function ProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);
  const [originalData, setOriginalData] = useState({ name: '', description: '' });


  useEffect(() => {
    const fetchProject = async () => {
      try {
        const project = await getProjectByIdAPI(id);
        dispatch(setSelectedProject(project));
        setFormData({ name: project.name, description: project.description });
        setOriginalData({ name: project.name, description: project.description })
        localStorage.setItem('currentProjectId', project._id);
      } catch (err) {
        setError('Failed to load project');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id, dispatch]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      setError(null);
      const updated = await updateProjectAPI(id, formData);
      setFormData({ name: updated.name, description: updated.description });
      setEditing(false);
    } catch (err) {
      setError('Failed to update project');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProjectAPI(id);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to delete project');
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-400 px-4">
      <div className="max-w-2xl w-full bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Project Details</h1>
          <Link
            to={`/project/${id}/tickets`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            View Tickets
          </Link>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {editing ? (
          <>
            <div className="mb-4">
              <label className="block font-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="mb-4">
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
              onClick={handleUpdate}
              className="bg-green-600 text-white px-4 py-2 rounded mr-2"
            >
              Save
            </button>
            <button
              onClick={() => {
                setFormData(originalData);  
                setEditing(false);
              }}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold">{formData.name}</h2>
            <p className="text-gray-700 mt-2">{formData.description}</p>

            <div className="mt-6 flex gap-4">
              <button
                onClick={() => setEditing(true)}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProjectPage;

