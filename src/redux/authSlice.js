import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from './authThunk';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        loading: false,
        error: null,
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        logout: (state) => {
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
