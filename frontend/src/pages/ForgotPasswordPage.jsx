import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/apiSlice';
import { ArrowLeft, Loader2, Mail } from 'lucide-react';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        setError(null);

        try {
            const { data } = await api.post('/users/forgot-password', { email });
            setMessage(data.data || 'Email sent successfully');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-surface-secondary flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <Link
                    to="/login"
                    className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors mb-8 group"
                >
                    <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Login
                </Link>

                <div className="bg-white p-8 shadow-card rounded-card border border-gray-100">
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-surface-secondary mb-4 text-primary">
                            <Mail className="h-6 w-6" />
                        </div>
                        <h1 className="text-2xl font-serif font-bold text-primary">
                            Forgot Password?
                        </h1>
                        <p className="mt-2 text-text-secondary text-sm">
                            Enter your email address and we'll send you a link to reset your password.
                        </p>
                    </div>

                    {message && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded text-green-700 text-center text-sm font-medium">
                            {message}
                        </div>
                    )}

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded text-status-error text-center text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={submitHandler}>
                        <div className="mb-6">
                            <label htmlFor="email" className="label">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Ex. james@bond.com"
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
                                    Sending Link...
                                </span>
                            ) : (
                                'Send Reset Link'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
