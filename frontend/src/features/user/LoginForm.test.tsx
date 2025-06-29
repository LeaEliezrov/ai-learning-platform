import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from '../auth/LoginForm';
import userReducer from './userSlice';

// Mock axios to prevent Jest issues
jest.mock('axios', () => ({
  default: {
    post: jest.fn(),
    get: jest.fn(),
  },
  create: jest.fn(() => ({
    post: jest.fn(),
    get: jest.fn(),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() }
    }
  }))
}));

// Mock store for testing
const createMockStore = (initialState: any = {}) => {
  return configureStore({
    reducer: {
      user: userReducer
    },
    preloadedState: {
      user: {
        currentUser: null,
        isAuthenticated: false,
        status: 'idle' as const,
        error: null,
        isInitialized: false,
        ...initialState
      }
    }
  });
};

const renderWithProviders = (
  component: React.ReactElement,
  initialState: any = {}
) => {
  const store = createMockStore(initialState);
  
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  );
};

describe('LoginForm Component', () => {
  it('renders login form correctly', () => {
    renderWithProviders(<LoginForm />);
    
    expect(screen.getByLabelText(/שם מלא/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/מספר טלפון/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /התחבר/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    renderWithProviders(<LoginForm />);
    
    const loginButton = screen.getByRole('button', { name: /התחבר/i });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(/שם נדרש/i)).toBeInTheDocument();
      expect(screen.getByText(/מספר טלפון נדרש/i)).toBeInTheDocument();
    });
  });

  it('allows user to type in form fields', () => {
    renderWithProviders(<LoginForm />);
    
    const nameInput = screen.getByLabelText(/שם מלא/i);
    const phoneInput = screen.getByLabelText(/מספר טלפון/i);

    fireEvent.change(nameInput, { target: { value: 'יוחנן כהן' } });
    fireEvent.change(phoneInput, { target: { value: '0501234567' } });

    expect(nameInput).toHaveValue('יוחנן כהן');
    expect(phoneInput).toHaveValue('050-123-4567'); // Phone should be formatted
  });

  it('shows loading state during submission', async () => {
    const initialState = {
      status: 'loading' as const
    };
    
    renderWithProviders(<LoginForm />, initialState);
    
    expect(screen.getByText(/מתחבר/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
