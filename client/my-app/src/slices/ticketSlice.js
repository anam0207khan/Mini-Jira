import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tickets: [],
  isLoading: false,
  error: null,
  filters: {
    status: '',
    priority: '',
  },
};

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    setTickets: (state, action) => {
      state.tickets = action.payload;
    },
    addTicket: (state, action) => {
      state.tickets.push(action.payload);
    },
    updateTicket: (state, action) => {
      const updated = action.payload;
      const index = state.tickets.findIndex((t) => t._id === updated._id);
      if (index !== -1) state.tickets[index] = updated;
    },
    deleteTicket: (state, action) => {
      state.tickets = state.tickets.filter((t) => t._id !== action.payload);
    },
    setTicketLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setTicketError: (state, action) => {
      state.error = action.payload;
    },
    setStatusFilter: (state, action) => {
      state.filters.status = action.payload;
    },
    setPriorityFilter: (state, action) => {
      state.filters.priority = action.payload;
    },
    clearFilters: (state) => {
      state.filters = { status: '', priority: '' };
    },
  },
});

export const {
  setTickets,
  addTicket,
  updateTicket,
  deleteTicket,
  setTicketLoading,
  setTicketError,
  setStatusFilter,
  setPriorityFilter,
  clearFilters,
} = ticketSlice.actions;

export default ticketSlice.reducer;
