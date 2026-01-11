import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils/auth';

export default function ProtectedRoute({ children }) {
  const nav = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    if (!isAuthenticated()) {
      // redirect to login and preserve location
      nav('/login', { replace: true, state: { from: loc } });
    }
  }, [nav, loc]);

  if (!isAuthenticated()) return null;
  return children;
}
