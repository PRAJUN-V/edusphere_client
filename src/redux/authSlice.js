// src/redux/authSlice.js

import { createSlice } from '@reduxjs/toolkit';

// Initial state checks localStorage for authentication status
const initialState = {
    isAuthenticated: !!localStorage.getItem('access'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
    },
});

export const { setAuthenticated } = authSlice.actions;

export default authSlice.reducer;
