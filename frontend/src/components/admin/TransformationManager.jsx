import { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle, X, Image as ImageIcon, Loader2, Upload, ArrowRight, Sparkles } from 'lucide-react';
import api from '../../api/apiSlice';

const TransformationManager = () => {
    const [transformations, setTransformations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        beforeImage: null, // File
        afterImage: null, // File
    });
    const [previews, setPreviews] = useState({
        before: null,
        after: null
    });
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchTransformations();

        // Cleanup previews on unmount
        return () => {
            if (previews.before) URL.revokeObjectURL(previews.before);
            if (previews.after) URL.revokeObjectURL(previews.after);
        };
    }, []);

    const fetchTransformations = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/transformations');
            setTransformations(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch transformations');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleActivate = async (id) => {
        try {
            // Optimistic update
            const updated = transformations.map(t => ({
                ...t,
                isActive: t._id === id
            }));
            setTransformations(updated);

            await api.put(`/transformations/${id}`, { isActive: true });
            fetchTransformations(); // Refresh to be sure
        } catch (err) {
            console.error('Failed to activate', err);
            fetchTransformations(); // Revert on error
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this transformation?')) {
            try {
                await api.delete(`/transformations/${id}`);
                setTransformations(transformations.filter(t => t._id !== id));
            } catch (err) {
                console.error('Failed to delete', err);
            }
        }
    };

    const handleFileChange = (e, field) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file size (e.g., 5MB limit)
            const maxSize = 5 * 1024 * 1024; // 5MB in bytes
            if (file.size > maxSize) {
                alert(`File is too large (${(file.size / 1024 / 1024).toFixed(2)}MB). Maximum size is 5MB.`);
                e.target.value = ''; // Reset the input
                return;
            }

            setFormData(prev => ({ ...prev, [field]: file }));

            // Create preview
            const url = URL.createObjectURL(file);
            setPreviews(prev => {
                // Revoke old URL to avoid memory leaks
                if (prev[field === 'beforeImage' ? 'before' : 'after']) {
                    URL.revokeObjectURL(prev[field === 'beforeImage' ? 'before' : 'after']);
                }
                return { ...prev, [field === 'beforeImage' ? 'before' : 'after']: url };
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        try {
            // Helper to upload single image
            const uploadImage = async (file) => {
                const formData = new FormData();
                formData.append('image', file);
                const { data } = await api.post('/upload', formData);
                return {
                    public_id: data.public_id || data.image.split('/').pop(),
                    url: data.image
                };
            };

            const beforeData = await uploadImage(formData.beforeImage);
            const afterData = await uploadImage(formData.afterImage);

            const { data: newTransformation } = await api.post('/transformations', {
                title: formData.title,
                description: formData.description,
                beforeImage: beforeData,
                afterImage: afterData,
            });

            setShowForm(false);
            setFormData({ title: '', description: '', beforeImage: null, afterImage: null });
            setPreviews({ before: null, after: null });

            // Optimistically add to list (newest first)
            setTransformations(prev => [newTransformation, ...prev]);
        } catch (err) {
            console.error('Failed to create transformation', err);
            alert('Failed to upload/create. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-8 animate-in mt-10 mx-20 fade-in duration-500">
            {/* Header Section */}
            <div className="relative bg-gradient-to-r from-[#182527] to-[#2A3B3D]  p-8 overflow-hidden shadow-xl text-white">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#D1B68A] opacity-10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center ">
                    <div>
                        <h2 className="text-3xl font-serif font-bold text-[#D1B68A] flex items-center gap-3">
                            <Sparkles className="w-6 h-6" />
                            Transformation Showcase
                        </h2>
                        <p className="text-gray-300 mt-2 max-w-xl">
                            Curate the "Before & After" stories displayed on your homepage.
                            Showcase your finest work to inspire potential clients.
                        </p>
                    </div>

                    {!showForm && (
                        <button
                            onClick={() => setShowForm(true)}
                            className="group flex items-center gap-2 bg-[#D1B68A] hover:bg-[#C2A578] text-[#182527] px-6 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-[#D1B68A]/20 hover:scale-105"
                        >
                            <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform" />
                            Create New Story
                        </button>
                    )}
                </div>
            </div>

            {/* Creation Form */}
            {showForm && (
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-300">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <h3 className="font-serif font-bold text-xl text-[#182527]">Create New Transformation</h3>
                        <button
                            onClick={() => setShowForm(false)}
                            className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Left: Details */}
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Project Title</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g., Modern Living Room Revamp"
                                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D1B68A] focus:bg-white transition-all outline-none text-[#182527] font-medium placeholder-gray-400"
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Description</label>
                                    <textarea
                                        required
                                        rows="4"
                                        placeholder="Briefly describe the changes..."
                                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D1B68A] focus:bg-white transition-all outline-none text-[#182527] resize-none placeholder-gray-400"
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Right: Images */}
                            <div className="space-y-6">
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Visuals</label>
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Before Image Input */}
                                    <div className="group relative">
                                        <input
                                            type="file"
                                            id="before-upload"
                                            required
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => handleFileChange(e, 'beforeImage')}
                                        />
                                        <label
                                            htmlFor="before-upload"
                                            className={`cursor-pointer block aspect-[4/3] rounded-xl border-2 border-dashed transition-all duration-300 overflow-hidden relative ${previews.before ? 'border-[#D1B68A] bg-gray-900' : 'border-gray-300 hover:border-[#D1B68A] hover:bg-gray-50'
                                                }`}
                                        >
                                            {previews.before ? (
                                                <>
                                                    <img src={previews.before} alt="Before Preview" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <span className="text-white text-xs font-bold uppercase tracking-widest border border-white px-3 py-1 rounded-full">Change</span>
                                                    </div>
                                                    <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm">BEFORE</div>
                                                </>
                                            ) : (
                                                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                                    <Upload className="w-8 h-8 mb-2 text-gray-300" />
                                                    <span className="text-sm font-medium">Upload Before</span>
                                                </div>
                                            )}
                                        </label>
                                    </div>

                                    {/* After Image Input */}
                                    <div className="group relative">
                                        <input
                                            type="file"
                                            id="after-upload"
                                            required
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => handleFileChange(e, 'afterImage')}
                                        />
                                        <label
                                            htmlFor="after-upload"
                                            className={`cursor-pointer block aspect-[4/3] rounded-xl border-2 border-dashed transition-all duration-300 overflow-hidden relative ${previews.after ? 'border-[#D1B68A] bg-gray-900' : 'border-gray-300 hover:border-[#D1B68A] hover:bg-gray-50'
                                                }`}
                                        >
                                            {previews.after ? (
                                                <>
                                                    <img src={previews.after} alt="After Preview" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <span className="text-white text-xs font-bold uppercase tracking-widest border border-white px-3 py-1 rounded-full">Change</span>
                                                    </div>
                                                    <div className="absolute top-2 left-2 bg-[#D1B68A] text-[#182527] text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm">AFTER</div>
                                                </>
                                            ) : (
                                                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                                    <Upload className="w-8 h-8 mb-2 text-gray-300" />
                                                    <span className="text-sm font-medium">Upload After</span>
                                                </div>
                                            )}
                                        </label>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-400 text-center">Supported formats: JPG, PNG, WEBP</p>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                            <button
                                type="submit"
                                disabled={uploading}
                                className="bg-[#182527] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#2A3B3D] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg hover:shadow-xl"
                            >
                                {uploading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Uploading Assets...
                                    </>
                                ) : (
                                    <>
                                        Publish Transformation
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Content Grid */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-[#182527] flex items-center gap-2">
                        Existing Gallery <span className="text-sm font-normal text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{transformations.length}</span>
                    </h3>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24 text-gray-300">
                        <Loader2 className="w-10 h-10 animate-spin text-[#D1B68A] mb-4" />
                        <p>Loading your masterpiece collection...</p>
                    </div>
                ) : transformations.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-gray-300">
                        <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ImageIcon className="w-10 h-10 text-gray-300" />
                        </div>
                        <h4 className="text-xl font-serif font-bold text-gray-900 mb-2">No transformations yet</h4>
                        <p className="text-gray-500 max-w-sm mx-auto mb-6">Start by adding your first Before & After comparison to showcase your design skills.</p>
                        <button
                            onClick={() => setShowForm(true)}
                            className="text-[#D1B68A] font-bold hover:underline"
                        >
                            Create one now
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {transformations.map(item => (
                            <div
                                key={item._id}
                                className={`group bg-white rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] ${item.isActive
                                    ? 'border-[#D1B68A] ring-1 ring-[#D1B68A]/20 shadow-[0_4px_20px_rgb(209,182,138,0.15)]'
                                    : 'border-gray-100 hover:border-gray-200'
                                    }`}
                            >
                                {/* Image Preview Area */}
                                <div className="relative h-48 flex">
                                    {/* Before Image Half */}
                                    <div className="w-1/2 relative bg-gray-100 overflow-hidden">
                                        <img src={item.beforeImage.url} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white/90 text-[10px] font-bold px-2 py-0.5 rounded">BEFORE</div>
                                    </div>
                                    {/* After Image Half */}
                                    <div className="w-1/2 relative bg-gray-100 overflow-hidden border-l border-white/20">
                                        <img src={item.afterImage.url} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute top-2 right-2 bg-[#D1B68A]/90 backdrop-blur-md text-[#182527] text-[10px] font-bold px-2 py-0.5 rounded">AFTER</div>
                                    </div>

                                    {/* Active Badge Overlay */}
                                    {item.isActive && (
                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-green-700 px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5 border border-green-100 z-10">
                                            <CheckCircle className="w-3.5 h-3.5" />
                                            Active on Home
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <h4 className="font-serif font-bold text-lg text-[#182527] truncate mb-1" title={item.title}>
                                        {item.title}
                                    </h4>
                                    <p className="text-sm text-gray-500 line-clamp-2 mb-4 h-10">
                                        {item.description}
                                    </p>

                                    {/* Actions */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <span className="text-xs text-gray-400 font-medium">
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </span>

                                        <div className="flex items-center gap-2">
                                            {!item.isActive && (
                                                <button
                                                    onClick={() => handleActivate(item._id)}
                                                    className="px-3 py-1.5 text-xs font-bold text-[#182527] bg-gray-100 hover:bg-[#D1B68A] hover:text-[#182527] rounded-lg transition-colors"
                                                >
                                                    Set Active
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TransformationManager;
