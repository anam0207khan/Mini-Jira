import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projects: [],
  selectedProject: null,
  isLoading: false,
  error: null,
};

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    addProject: (state, action) => {
      state.projects.push(action.payload);
    },
    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload;
    },
    setProjectLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setProjectError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setProjects,
  addProject,
  setSelectedProject,
  setProjectLoading,
  setProjectError,
} = projectSlice.actions;

export default projectSlice.reducer;
