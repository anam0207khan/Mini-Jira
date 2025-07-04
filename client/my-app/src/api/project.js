
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1/project/';


export const getUserProjectsAPI = async () => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(`${API_URL}`, config);
    return response.data;
};


export const createProjectAPI = async (data) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const res = await axios.post(`${API_URL}`, data, config);
    return res.data;
};

export const getProjectByIdAPI = async (id) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(`${API_URL}${id}`, config);
    console.log("API response for project:", response.data);
    return response.data.project;
};

export const updateProjectAPI = async (id, data) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.put(`${API_URL}${id}`, data, config);
    return response.data;
};

export const deleteProjectAPI = async (id) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.delete(`${API_URL}${id}`, config);
    return response.data;
};