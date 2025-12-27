import { useState, useEffect } from 'react';
import { Camera, Mail, User, Phone, Save, Loader2, ArrowRight, Clock, CheckCircle2, History } from 'lucide-react';
import api from '../api/apiSlice';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
    const { userInfo, login } = useAuth();

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [inquiries, setInquiries] = useState([]);

    // Form State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profileRes = await api.get('/profile');
                const user = profileRes.data;

                setName(user.name);
                setEmail(user.email);
                setPhone(user.phone || '');
                if (user.profileImage?.url) {
                    setImagePreview(user.profileImage.url);
                }

                if (user.role === 'User') {
                    const inquiriesRes = await api.get('/profile/inquiries');
                    setInquiries(inquiriesRes.data);
                }
            } catch (err) {
                console.error('Failed to fetch profile:', err);
                setMessage({ type: 'error', text: 'Failed to load profile data' });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        if (password && password !== confirmPassword) {
            setMessage({ type: 'error', text: 'Passwords do not match' });
            return;
        }

        setUpdating(true);
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('phone', phone);
            if (password) formData.append('password', password);
            if (selectedImage) formData.append('image', selectedImage);

            const { data } = await api.put('/profile', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const updatedUserInfo = { ...userInfo, ...data };
            login(updatedUserInfo);

            setMessage({ type: 'success', text: 'Profile updated successfully' });
            setPassword('');
            setConfirmPassword('');
        } catch (err) {
            console.error('Update failed:', err);
            setMessage({ type: 'error', text: err.response?.data?.message || 'Update failed' });
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-secondary" />
            </div>
        );
    }

    return (
        <div className="container-custom py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Left Side: Profile Card & Quick Actions */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Profile Summary Card */}
                    <div className="card p-8 text-center bg-surface">
                        <div className="relative w-32 h-32 mx-auto mb-6">
                            <img
                                src={imagePreview || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}
                                alt="Profile"
                                className="w-full h-full rounded-full object-cover border-4 border-surface shadow-soft"
                            />
                            <label className="absolute bottom-1 right-1 bg-primary p-2.5 rounded-full cursor-pointer hover:bg-secondary transition-colors text-white shadow-lg group">
                                <Camera className="w-4 h-4" />
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>
                        <h2 className="text-xl font-serif text-primary font-bold tracking-wide">{userInfo?.name}</h2>
                        <p className="text-sm text-text-muted mt-1 uppercase tracking-widest text-[10px]">{userInfo?.role || 'Valued Member'}</p>

                        <div className="mt-6 pt-6 border-t border-gray-100 flex justify-center gap-4 text-sm text-text-secondary">
                            <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> {email}</span>
                        </div>
                    </div>

                    {/* Admin Shortcut */}
                    {userInfo?.role === 'Admin' && (
                        <Link to="/admin/dashboard" className="block group">
                            <div className="bg-primary text-white p-6 rounded-card shadow-lg hover:shadow-xl transition-all relative overflow-hidden">
                                <div className="relative z-10 flex justify-between items-center">
                                    <div>
                                        <h3 className="font-serif text-lg mb-1 font-bold">Admin Dashboard</h3>
                                        <p className="text-gray-400 text-sm">Manage site content</p>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-secondary group-hover:translate-x-1 transition-transform" />
                                </div>
                                {/* Subtle decorative circle */}
                                <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/5 rounded-full" />
                            </div>
                        </Link>
                    )}
                </div>

                {/* Right Side: Details & History */}
                <div className="lg:col-span-8 space-y-10">

                    {/* Header */}
                    <div>
                        <h1 className="text-3xl font-serif text-primary font-bold mb-2">Account Settings</h1>
                        <p className="text-text-secondary font-light">Manage your personal information and preferences.</p>
                    </div>

                    {/* Form Section */}
                    <div className="card p-8">
                        <form onSubmit={handleUpdateProfile} className="space-y-8">
                            {message.text && (
                                <div className={`p-4 rounded-lg text-sm flex items-center gap-3 ${message.type === 'error' ? 'bg-red-50 text-status-error' : 'bg-green-50 text-status-success'}`}>
                                    {message.type === 'success' && <CheckCircle2 className="w-5 h-5" />}
                                    {message.text}
                                </div>
                            )}

                            <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                                <div className="space-y-2">
                                    <label className="label">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="input pl-10"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="label">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="email"
                                            value={email}
                                            disabled
                                            className="input pl-10 bg-gray-50/50 cursor-not-allowed text-text-muted"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="label">Phone Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="input pl-10"
                                            placeholder="+977-9800000000"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-50">
                                <h3 className="text-sm font-bold text-primary mb-4 uppercase tracking-wider">Security</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="New Password"
                                        className="input"
                                    />
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm Password"
                                        className="input"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button
                                    type="submit"
                                    disabled={updating}
                                    className="btn btn-primary min-w-[160px]"
                                >
                                    {updating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                                    {updating ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Previous Inquiries Section (User Only) */}
                    {userInfo?.role === 'User' && (
                        <div>
                            <h2 className="text-xl font-serif text-primary font-bold mb-6 flex items-center gap-2">
                                <History className="w-5 h-5 text-secondary" />
                                Project History
                            </h2>

                            {inquiries.length === 0 ? (
                                <div className="bg-surface-secondary rounded-card p-8 text-center border border-dashed border-gray-200">
                                    <p className="text-text-muted mb-4">You haven't requested any consultations yet.</p>
                                    <Link to="/contact" className="text-secondary hover:underline font-medium text-sm">Start your first project &rarr;</Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {inquiries.map((inquiry) => (
                                        <div key={inquiry._id} className="card p-6 shadow-sm hover:shadow-md transition-shadow group">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-medium text-primary text-lg group-hover:text-secondary transition-colors">
                                                    {inquiry.projectType}
                                                </h3>
                                                <span className={`px-2.5 py-1 rounded-md text-xs font-bold tracking-wide border
                                                    ${inquiry.status === 'New' ? 'bg-blue-50 text-blue-600 border-blue-100' : ''}
                                                    ${inquiry.status === 'Contacted' ? 'bg-amber-50 text-amber-600 border-amber-100' : ''}
                                                    ${inquiry.status === 'Closed' ? 'bg-green-50 text-green-600 border-green-100' : ''}
                                                `}>
                                                    {inquiry.status}
                                                </span>
                                            </div>
                                            <p className="text-text-secondary text-sm line-clamp-2 mb-4">
                                                {inquiry.projectDetails}
                                            </p>
                                            <div className="flex items-center gap-6 text-xs text-text-muted border-t border-gray-50 pt-4">
                                                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {new Date(inquiry.createdAt).toLocaleDateString()}</span>
                                                <span>Budget: {inquiry.budgetRange}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
