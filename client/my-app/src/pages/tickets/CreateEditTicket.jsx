import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createTicketAPI, fetchTicketById, updateTicketAPI } from '../../api/ticket'

const statuses = ['To Do', 'In Progress', 'Done'];
const priorities = ['Low', 'Medium', 'High'];

function CreateEditTicket() {
  const { ticketId } = useParams();
  console.log("ticketId from useParams:", ticketId);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'To Do',
    priority: 'Medium',
    assignee: '',
    dueDate: '',
  });
  const [loading, setLoading] = useState(!!ticketId);
  const [error, setError] = useState(null);
  console.log("updateTicketAPI:", updateTicketAPI);


  useEffect(() => {
    if (ticketId) {
      const loadTicket = async () => {
        try {
          const ticket = await fetchTicketById(ticketId);
          setFormData({
            title: ticket.title,
            description: ticket.description,
            status: ticket.status,
            priority: ticket.priority,
            assignee: ticket.assignee || '',
            dueDate: ticket.dueDate ? ticket.dueDate.slice(0, 10) : '',
          });
        } catch (err) {
          setError('Failed to load ticket');
        } finally {
          setLoading(false);
        }
      };
      loadTicket();
    }
  }, [ticketId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectId = localStorage.getItem('currentProjectId');

    try {
      setError(null);

      const payload = { ...formData };

      if (!ticketId) {
        payload.project = projectId;
      }

      if (!payload.assignee || payload.assignee.trim() === "") {
        delete payload.assignee;
      }

      if (ticketId) {
        try {
          await updateTicketAPI(ticketId, payload);
        } catch (err) {
          console.error("API call failed:", err);
        }
      } else {
        await createTicketAPI(payload);
      }

      navigate(`/project/${projectId}/tickets`);
    } catch (err) {
      setError('Failed to save ticket');
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-400 px-4">
  <div className="max-w-xl w-full p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">{ticketId ? 'Edit Ticket' : 'Create Ticket'}</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {loading ? <p>Loading...</p> : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full border p-2 rounded"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border p-2 rounded"
            rows="3"
          />
          <select name="status" value={formData.status} onChange={handleChange} className="w-full border p-2 rounded">
            {statuses.map(status => <option key={status}>{status}</option>)}
          </select>
          <select name="priority" value={formData.priority} onChange={handleChange} className="w-full border p-2 rounded">
            {priorities.map(p => <option key={p}>{p}</option>)}
          </select>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            {ticketId ? 'Update' : 'Create'}
          </button>

        </form>
      )}
    </div>
    </div>
  );
}

export default CreateEditTicket;
