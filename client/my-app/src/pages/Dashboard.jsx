import React, { useEffect, useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProjectsAPI , logoutUserAPI} from "../api/user";
import { setProjectLoading, setProjectError, setProjects } from "../slices/projectSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { projects, isLoading, error } = useSelector((state) => state.project);

   const handleLogout = async () => {
    try {
      await logoutUserAPI();
      localStorage.removeItem('token');              
      localStorage.removeItem('currentProjectId'); 
      navigate('/login');                         
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      dispatch(setProjectLoading(true));
      try {
        const data = await getUserProjectsAPI();
        dispatch(setProjects(data));
      } catch (err) {
        dispatch(setProjectError(err.response?.data?.message || 'Failed to fetch projects'));
      } finally {
        dispatch(setProjectLoading(false));
      }
    };

    fetchProjects();
  }, [dispatch]);

  return (
    <div className="p-6 bg-gray-400 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Your Projects</h1>
          <Link
            to="/create-project"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            + New Project
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {projects.length === 0 ? (
          <p className="text-gray-600">You have no projects yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link
                to={`/project/${project._id}`}
                key={project._id}
                className="bg-white p-6 rounded-xl shadow hover:shadow-md transition border border-gray-200"
              >
                <h2 className="text-xl font-semibold text-gray-800">{project.name}</h2>
                <p className="text-gray-500 text-sm mt-1 mb-4 line-clamp-2">{project.description}</p>

                <div className="text-sm text-gray-700">
                  <p><span className="font-medium">Created:</span> {new Date(project.createdAt).toLocaleDateString()}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
