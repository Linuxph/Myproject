import { createSlice } from '@reduxjs/toolkit';

const getInitialAuth = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('usertoken');
    const userId = localStorage.getItem('userId');
    return {
      isAuthenticated: !!token,
      token: token || null,
      userId: userId || null,
    };
  }
  return { isAuthenticated: false, token: null, userId: null };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialAuth(),
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      if (typeof window !== 'undefined') {
        localStorage.setItem('usertoken', action.payload.token);
        localStorage.setItem('userId', action.payload.userId);
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.userId = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('usertoken');
        localStorage.removeItem('userId');
        localStorage.removeItem('logout');
      }
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;