import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createPrompt, getUserPrompts } from './promptsApi';
import { CreatePromptData, Prompt } from './types';

// Async thunks
export const submitPrompt = createAsyncThunk(
  'prompts/submitPrompt',
  async (promptData: CreatePromptData, { rejectWithValue }) => {
    try {
      const response = await createPrompt(promptData);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || 
        error.response?.data?.details || 
        error.message || 
        'Failed to submit prompt'
      );
    }
  }
);

export const fetchUserPrompts = createAsyncThunk(
  'prompts/fetchUserPrompts',
  async ({ page = 1, limit = 10 }: { page?: number; limit?: number } = {}, { rejectWithValue }) => {
    try {
      const response = await getUserPrompts(page, limit);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch prompts');
    }
  }
);

interface PromptsState {
  prompts: Prompt[];
  currentPrompt: Prompt | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  submitStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  lastResponse: {
    prompt: Prompt;
    tokensUsed: number;
  } | null;
}

const initialState: PromptsState = {
  prompts: [],
  currentPrompt: null,
  status: 'idle',
  submitStatus: 'idle',
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  },
  lastResponse: null,
};

const promptsSlice = createSlice({
  name: 'prompts',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetSubmitStatus: (state) => {
      state.submitStatus = 'idle';
      state.lastResponse = null;
    },
    setCurrentPrompt: (state, action: PayloadAction<Prompt | null>) => {
      state.currentPrompt = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Submit prompt
      .addCase(submitPrompt.pending, (state) => {
        state.submitStatus = 'loading';
        state.error = null;
      })
      .addCase(submitPrompt.fulfilled, (state, action) => {
        state.submitStatus = 'succeeded';
        // Keep the full response including tokensUsed
        state.lastResponse = action.payload;
        // Add to prompts list at the beginning
        state.prompts.unshift(action.payload.prompt);
        state.pagination.total += 1;
      })
      .addCase(submitPrompt.rejected, (state, action) => {
        state.submitStatus = 'failed';
        state.error = action.payload as string;
      })
      // Fetch user prompts
      .addCase(fetchUserPrompts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserPrompts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.prompts = action.payload.prompts;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchUserPrompts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { clearError, resetSubmitStatus, setCurrentPrompt } = promptsSlice.actions;
export default promptsSlice.reducer;
