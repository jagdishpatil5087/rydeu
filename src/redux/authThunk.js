
import { createAsyncThunk } from '@reduxjs/toolkit';
import { saveToken, saveUser } from '../utils/authStorage';
import { setToken } from './authSlice';

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, { dispatch, rejectWithValue }) => {
        try {
            const res = await fetch('https://api-staging.rydeu.com/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, type: 'customer' }),
            });

            const data = await res.json();

            if (!res.ok || data.message !== 'login sucessful') {
                return rejectWithValue(data.message || 'Login failed');
            }

            const token = data?.data?.token;
            const user = {
                name: data?.data?.user?.account.firstName + ' ' + data?.data?.user?.account.lastName,
                email: data?.data?.user?.email,
            }

            // console.log(user);


            if (!token) {
                return rejectWithValue(
                    'Login successful but token not returned from server'
                );
            }

            saveToken(token);
            saveUser(user);
            dispatch(setToken(token));

            return token;
        } catch (error) {
            return rejectWithValue(error.message || 'Something went wrong');
        }
    }
);
