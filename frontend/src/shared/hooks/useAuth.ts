import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';

export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userPhone');
    localStorage.removeItem('userRole');
    dispatch({ type: 'user/logout' });
    navigate('/login');
  };

  const handleAuthError = () => {
    logout();
  };

  return {
    logout,
    handleAuthError,
  };
};
