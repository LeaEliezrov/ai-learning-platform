import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { registerUser, loginUser } from './userApi';
import { RegisterData, LoginData, User } from './types';

// Simple error handler
const handleError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unexpected error occurred';
};

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
  async (data: RegisterData, { rejectWithValue }) => {    try {
      return await registerUser(data);
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const login = createAsyncThunk(
  'user/login',
  async (data: LoginData, { rejectWithValue }) => {    try {
      return await loginUser(data);
    } catch (error) {
      return rejectWithValue(handleError(error));
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
      // 🧹 ניקוי מלא של localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      localStorage.removeItem('userPhone');
    },
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      console.log('🔍 setUser action.payload:', action.payload);
      if (action.payload && action.payload.name && action.payload.phone) {
        state.currentUser = action.payload;
        state.isAuthenticated = true;
        state.isInitialized = true;
      } else {
        console.error('❌ setUser: Invalid user data', action.payload);
      }
    },  },
  extraReducers: (builder) => {
    builder
      // Register cases
      .addCase(register.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })      .addCase(register.fulfilled, (state, action) => {
        console.log('🔍 Register fulfilled - action.payload:', action.payload);
        state.status = 'succeeded';
        state.error = null;
        if (action.payload?.token && action.payload?.user) {
          state.currentUser = action.payload.user;
          state.isAuthenticated = true;
          
          // ✅ בדיקה שהטוקן אמיתי ולא undefined
          if (action.payload.token && action.payload.token !== 'undefined') {
            localStorage.setItem('token', action.payload.token);
            console.log('💾 Token saved:', action.payload.token);
          } else {
            console.error('❌ Invalid token received:', action.payload.token);
          }
          
          // 💾 שמירת פרטי המשתמש ל-localStorage (עם בדיקות בטחון)
          if (action.payload.user.name && action.payload.user.name !== 'undefined') {
            localStorage.setItem('userName', action.payload.user.name);
            console.log('💾 User name saved:', action.payload.user.name);
          }
          if (action.payload.user.phone && action.payload.user.phone !== 'undefined') {
            localStorage.setItem('userPhone', action.payload.user.phone);
            console.log('💾 User phone saved:', action.payload.user.phone);
          }
        } else {
          console.error('❌ Register: Missing token or user data', action.payload);
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
      })      .addCase(login.fulfilled, (state, action) => {
        console.log('🔍 Login fulfilled - action.payload:', action.payload);
        state.status = 'succeeded';
        state.error = null;
        if (action.payload?.user) {
          state.currentUser = action.payload.user;
          state.isAuthenticated = true;
          
          // ✅ בדיקה שהטוקן אמיתי ולא undefined
          if (action.payload.token && action.payload.token !== 'undefined') {
            localStorage.setItem('token', action.payload.token);
            console.log('💾 Token saved:', action.payload.token);
          } else {
            console.error('❌ Invalid token received:', action.payload.token);
          }
          
          // 💾 שמירת פרטי המשתמש ל-localStorage (עם בדיקות בטחון)
          if (action.payload.user.name && action.payload.user.name !== 'undefined') {
            localStorage.setItem('userName', action.payload.user.name);
            console.log('💾 User name saved:', action.payload.user.name);
          }
          if (action.payload.user.phone && action.payload.user.phone !== 'undefined') {
            localStorage.setItem('userPhone', action.payload.user.phone);
            console.log('💾 User phone saved:', action.payload.user.phone);
          }
        } else {
          console.error('❌ Login: Missing user data', action.payload);
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError, setUser } = userSlice.actions;
export default userSlice.reducer;
