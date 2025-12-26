import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Loader2 } from 'lucide-react';

const PrivateRoute = () => {
    const { isLoggedIn, loading } = useAuth();

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-[#F5F4F0]">
                <Loader2 className="h-8 w-8 animate-spin text-[#D1B68A]" />
            </div>
        );
    }

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
