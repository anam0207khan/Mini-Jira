
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTicketsByProject,
  updateTicketAPI,
  deleteTicket,
} from '../../api/ticket';
import {
  setTickets,
  setTicketLoading,
  setTicketError,
} from '../../slices/ticketSlice';

const statuses = ['To Do', 'In Progress', 'Done'];
const priorities = ['Low', 'Medium', 'High'];

const Ticket = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tickets, isLoading, error } = useSelector((state) => state.ticket);
  const [filters, setFilters] = useState({ status: '', priority: '' });

  useEffect(() => {
    const load = async () => {
      dispatch(setTicketLoading(true));
      try {
        const projectId = localStorage.getItem('currentProjectId');
        const params = new URLSearchParams();

        if (filters.status) params.append('status', filters.status);
        if (filters.priority) params.append('priority', filters.priority);

        const queryString = params.toString();

        const data = await fetchTicketsByProject(projectId, queryString);
        dispatch(setTickets(data));
      } catch (err) {
        dispatch(setTicketError(err.message));
      } finally {
        dispatch(setTicketLoading(false));
      }
    };
    load();
  }, [dispatch, filters]);


  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination || source.droppableId === destination.droppableId) return;

    const ticket = tickets.find((t) => t._id === draggableId);
    const updatedTicket = { ...ticket, status: destination.droppableId };

    try {
      await updateTicketAPI(ticket._id, updatedTicket);
      const updatedTickets = tickets.map((t) =>
        t._id === ticket._id ? updatedTicket : t
      );
      dispatch(setTickets(updatedTickets));
    } catch (err) {
      console.error('Drag update failed', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this ticket?')) return;
    try {
      await deleteTicket(id);
      const updated = tickets.filter((t) => t._id !== id);
      dispatch(setTickets(updated));
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  const grouped = { 'To Do': [], 'In Progress': [], 'Done': [] };
  tickets.forEach((t) => grouped[t.status]?.push(t));

  return (
    <div className="p-6 bg-gray-400 min-h-screen">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold">Kanban Board</h2>
        <div className="flex flex-wrap gap-4">
          <select
            value={filters.status}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, status: e.target.value }))
            }
            className="border p-2 rounded"
          >
            <option value="">All Statuses</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <select
            value={filters.priority}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, priority: e.target.value }))
            }
            className="border p-2 rounded"
          >
            <option value="">All Priorities</option>
            {priorities.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>

          <button
            onClick={() =>
              navigate(
                `/project/${localStorage.getItem('currentProjectId')}/ticket/new`
              )
            }
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Create Ticket
          </button>
        </div>
      </div>

      {isLoading && <p>Loading...</p>}
      {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {statuses.map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-white p-4 rounded shadow min-h-[300px]"
                >
                  <h3 className="text-xl font-semibold mb-4">{status}</h3>
                  {grouped[status].map((ticket, index) => (
                    <Draggable
                      draggableId={ticket._id}
                      index={index}
                      key={ticket._id}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-gray-50 p-3 mb-3 rounded shadow border"
                        >
                          <h4 className="font-semibold text-lg">
                            {ticket.title}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">
                            {ticket.priority} Priority
                          </p>
                          <p className="text-xs text-gray-500 mb-2">
                            {ticket.description}
                          </p>
                          <div className="flex gap-3 text-sm">
                            <button
                              onClick={() =>
                                navigate(`/ticket/${ticket._id}/edit`)
                              }
                              className="text-blue-600 hover:underline"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(ticket._id)}
                              className="text-red-600 hover:underline"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {!isLoading && tickets.length === 0 && (
        <p className="text-center text-gray-700 mt-6">
          No tickets found. Try changing the filters or create a new one.
        </p>
      )}
    </div>
  );
};

export default Ticket;
