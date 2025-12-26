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
                <Loader2 className="w-8 h-8 animate-spin text-[#D1B68A]" />
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto py-16 px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Left Side: Profile Card & Quick Actions */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Profile Summary Card */}
                    <div className="bg-white rounded-xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] p-8 text-center border border-gray-100">
                        <div className="relative w-32 h-32 mx-auto mb-6">
                            <img
                                src={imagePreview || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}
                                alt="Profile"
                                className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
                            />
                            <label className="absolute bottom-1 right-1 bg-[#182527] p-2.5 rounded-full cursor-pointer hover:bg-[#D1B68A] transition-colors text-white shadow-lg group">
                                <Camera className="w-4 h-4" />
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>
                        <h2 className="text-xl font-serif text-[#182527] font-medium tracking-wide">{userInfo?.name}</h2>
                        <p className="text-sm text-gray-400 mt-1 uppercase tracking-widest text-[10px]">{userInfo?.role || 'Valued Member'}</p>

                        <div className="mt-6 pt-6 border-t border-gray-100 flex justify-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> {email}</span>
                        </div>
                    </div>

                    {/* Admin Shortcut */}
                    {userInfo?.role === 'Admin' && (
                        <Link to="/admin/dashboard" className="block group">
                            <div className="bg-[#182527] text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all relative overflow-hidden">
                                <div className="relative z-10 flex justify-between items-center">
                                    <div>
                                        <h3 className="font-serif text-lg mb-1">Admin Dashboard</h3>
                                        <p className="text-gray-400 text-sm">Manage site content</p>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-[#D1B68A] group-hover:translate-x-1 transition-transform" />
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
                        <h1 className="text-3xl font-serif text-[#182527] mb-2">Account Settings</h1>
                        <p className="text-gray-500 font-light">Manage your personal information and preferences.</p>
                    </div>

                    {/* Form Section */}
                    <div className="bg-white rounded-xl shadow-[0_2px_20px_rgba(0,0,0,0.03)] border border-gray-100 p-8">
                        <form onSubmit={handleUpdateProfile} className="space-y-8">
                            {message.text && (
                                <div className={`p-4 rounded-lg text-sm flex items-center gap-3 ${message.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'}`}>
                                    {message.type === 'success' && <CheckCircle2 className="w-5 h-5" />}
                                    {message.text}
                                </div>
                            )}

                            <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                                    <div className="flex items-center gap-3 border-b border-gray-200 pb-2 focus-within:border-[#D1B68A] transition-colors">
                                        <User className="w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full bg-transparent outline-none text-[#182527] placeholder-gray-300"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                                    <div className="flex items-center gap-3 border-b border-gray-200 pb-2 bg-gray-50/50">
                                        <Mail className="w-4 h-4 text-gray-400" />
                                        <input
                                            type="email"
                                            value={email}
                                            disabled
                                            className="w-full bg-transparent outline-none text-gray-500 cursor-not-allowed"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone Number</label>
                                    <div className="flex items-center gap-3 border-b border-gray-200 pb-2 focus-within:border-[#D1B68A] transition-colors">
                                        <Phone className="w-4 h-4 text-gray-400" />
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="w-full bg-transparent outline-none text-[#182527] placeholder-gray-300"
                                            placeholder="+977-9800000000"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-50">
                                <h3 className="text-sm font-medium text-[#182527] mb-4">Security</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="New Password"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg outline-none focus:ring-1 focus:ring-[#D1B68A] transition-all text-sm"
                                    />
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm Password"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg outline-none focus:ring-1 focus:ring-[#D1B68A] transition-all text-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button
                                    type="submit"
                                    disabled={updating}
                                    className="bg-[#D1B68A] text-[#182527] px-8 py-3 rounded-lg font-medium hover:bg-[#c4a97f] transition-colors shadow-sm disabled:opacity-70 flex items-center gap-2"
                                >
                                    {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                    {updating ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Previous Inquiries Section (User Only) */}
                    {userInfo?.role === 'User' && (
                        <div>
                            <h2 className="text-xl font-serif text-[#182527] mb-6 flex items-center gap-2">
                                <History className="w-5 h-5 text-[#D1B68A]" />
                                Project History
                            </h2>

                            {inquiries.length === 0 ? (
                                <div className="bg-gray-50 rounded-xl p-8 text-center border border-dashed border-gray-200">
                                    <p className="text-gray-500 mb-4">You haven't requested any consultations yet.</p>
                                    <Link to="/contact" className="text-[#D1B68A] hover:underline font-medium text-sm">Start your first project &rarr;</Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {inquiries.map((inquiry) => (
                                        <div key={inquiry._id} className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow group">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-medium text-[#182527] text-lg group-hover:text-[#D1B68A] transition-colors">
                                                    {inquiry.projectType}
                                                </h3>
                                                <span className={`px-2.5 py-1 rounded-md text-xs font-medium tracking-wide border
                                                    ${inquiry.status === 'New' ? 'bg-blue-50 text-blue-600 border-blue-100' : ''}
                                                    ${inquiry.status === 'Contacted' ? 'bg-amber-50 text-amber-600 border-amber-100' : ''}
                                                    ${inquiry.status === 'Closed' ? 'bg-green-50 text-green-600 border-green-100' : ''}
                                                `}>
                                                    {inquiry.status}
                                                </span>
                                            </div>
                                            <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                                                {inquiry.projectDetails}
                                            </p>
                                            <div className="flex items-center gap-6 text-xs text-gray-400 border-t border-gray-50 pt-4">
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
