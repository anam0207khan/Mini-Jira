import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1/ticket';

const getAuthConfig = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const fetchTicketsByProject = async (projectId, query = '') => {
  const url = query
    ? `${API_URL}/project/${projectId}/tickets?${query}`
    : `${API_URL}/project/${projectId}/tickets`;

  const res = await axios.get(url, getAuthConfig());
  return res.data;
};

export const fetchTicketById = async (ticketId) => {
  const res = await axios.get(`${API_URL}/${ticketId}`, getAuthConfig());
  return res.data;
};

export const createTicketAPI = async (data) => {
  const res = await axios.post(`${API_URL}/`, data, getAuthConfig());
  return res.data;
};

export const updateTicketAPI = async (id, data) => {
  console.log("updateTicketAPI sending to:", `${API_URL}/${id}`, data);
  const res = await axios.put(`${API_URL}/${id}`, data, getAuthConfig());
  return res.data;
};

export const deleteTicket = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, getAuthConfig());
  return res.data;
};
