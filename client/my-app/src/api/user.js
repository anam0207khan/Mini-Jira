import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1/user';

export const registerUser = async (formData) => {
  const response = await axios.post(`${API_URL}/register`, formData);
  return response.data;
};

export const loginUserAPI = async (formData) => {
  const res = await axios.post(`${API_URL}/login`, formData);
  return res.data;
};

export const logoutUserAPI = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    `${API_URL}/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const getUserProjectsAPI = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get('http://localhost:8000/api/v1/project', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
