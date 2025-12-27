import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../api/apiSlice';
import { useAuth } from '../hooks/useAuth';
import { ArrowLeft, Loader2, Lock } from 'lucide-react';

const ResetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const { resetToken } = useParams();
    const navigate = useNavigate();
    const { login } = useAuth(); // Optional: Auto-login after reset

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords don't match");
            setLoading(false);
            return;
        }

        try {
            const { data } = await api.put(`/users/reset-password/${resetToken}`, { password });
            setSuccess(true);
            // Optional: Auto login the user
            if (data.token) {
                login(data);
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid or expired token.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-surface-secondary flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="bg-white p-8 shadow-card rounded-card border border-gray-100">
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-surface-secondary mb-4 text-primary">
                            <Lock className="h-6 w-6" />
                        </div>
                        <h1 className="text-2xl font-serif font-bold text-primary">
                            Reset Password
                        </h1>
                        <p className="mt-2 text-text-secondary text-sm">
                            Please create a new password for your account.
                        </p>
                    </div>

                    {success && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded text-green-700 text-center text-sm font-medium">
                            Password updated successfully! Redirecting...
                        </div>
                    )}

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded text-status-error text-center text-sm font-medium">
                            {error}
                        </div>
                    )}

                    {!success && (
                        <form onSubmit={submitHandler}>
                            <div className="mb-4">
                                <label htmlFor="password" className="label">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className="input"
                                    placeholder="At least 8 characters"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="confirmPassword" className="label">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    className="input"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full btn btn-primary"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        Resetting...
                                    </span>
                                ) : (
                                    'Set New Password'
                                )}
                            </button>
                        </form>
                    )}

                    <div className="mt-6 text-center">
                        <Link to="/login" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors inline-flex items-center gap-1">
                            <ArrowLeft className="h-3 w-3" /> Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
