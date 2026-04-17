import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    isLoading: false,
    error: null,
    globalError: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setGlobalError: (state, action) => {
      state.globalError = action.payload;
    },
    clearError: (state) => {
      state.error = null;
      state.globalError = null;
    },
  },
});

export const { setLoading, setError, setGlobalError, clearError } = appSlice.actions;
export default appSlice.reducer;