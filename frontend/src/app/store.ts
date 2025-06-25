import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import categoriesReducer from '../features/categories/categoriesSlice';
import promptsReducer from '../features/prompts/promptsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    categories: categoriesReducer,
    prompts: promptsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
