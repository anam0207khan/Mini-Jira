 import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.plan = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUserError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { loginUser, logoutUser, setLoading, setUserError } = userSlice.actions;
export default userSlice.reducer;
