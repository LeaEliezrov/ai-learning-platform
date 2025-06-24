import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { registerUser, loginUser } from './userApi';
import { RegisterData, LoginData, User } from './types';

interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  isInitialized: boolean;
}

const initialState: UserState = {
  currentUser: null,
  isAuthenticated: false,
  status: 'idle',
  error: null,
  isInitialized: false,
};

export const register = createAsyncThunk(
  'user/register',
  async (data: RegisterData, { rejectWithValue }) => {
    try {
      return await registerUser(data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const login = createAsyncThunk(
  'user/login',
  async (data: LoginData, { rejectWithValue }) => {
    try {
      return await loginUser(data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('token');
    },
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.isInitialized = true;
    },
  },
  extraReducers: builder => {
    builder
      // Register cases
      .addCase(register.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        if (action.payload.token) {
          state.currentUser = action.payload.user;
          state.isAuthenticated = true;
          localStorage.setItem('token', action.payload.token);
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Login cases
      .addCase(login.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.currentUser = action.payload.user;
        state.isAuthenticated = true;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError, setUser } = userSlice.actions;
export default userSlice.reducer;
