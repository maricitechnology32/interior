import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const AdminRoute = () => {
  const { isLoggedIn, isAdmin, loading } = useAuth();

  // 1. Show a loading spinner while auth status is being checked
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a real spinner component
  }

  // 2. If user is logged in AND is an admin, show the child page (Outlet)
  if (isLoggedIn && isAdmin) {
    return <Outlet />;
  }

  // 3. If not, redirect them to the login page
  // 'replace' stops them from using the "back" button to return to the admin page
  return <Navigate to="/login" replace />;
};

export default AdminRoute;