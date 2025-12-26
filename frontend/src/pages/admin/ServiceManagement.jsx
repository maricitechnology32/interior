import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Trash2, Save, Edit2, X, Upload, Home, Building2, UtensilsCrossed, Briefcase, Palette, Lamp } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../api/apiSlice';

const iconOptions = [
    { value: 'home', label: 'Home', icon: Home },
    { value: 'building', label: 'Building', icon: Building2 },
    { value: 'utensils', label: 'Restaurant', icon: UtensilsCrossed },
    { value: 'briefcase', label: 'Briefcase', icon: Briefcase },
    { value: 'palette', label: 'Palette', icon: Palette },
    { value: 'lamp', label: 'Lamp', icon: Lamp },
];

const ServiceManagement = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('');

    // Form state
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        icon: 'home',
        link: '/projects',
        order: 0,
        isActive: true,
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/services/admin/all');
            setServices(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load services');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            icon: 'home',
            link: '/projects',
            order: 0,
            isActive: true,
        });
        setImageFile(null);
        setImagePreview(null);
        setEditingId(null);
        setShowForm(false);
    };

    const handleEdit = (service) => {
        setFormData({
            title: service.title,
            description: service.description,
            icon: service.icon,
            link: service.link,
            order: service.order,
            isActive: service.isActive,
        });
        setImagePreview(service.image?.url);
        setEditingId(service._id);
        setShowForm(true);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!editingId && !imageFile) {
            setError('Please select an image');
            return;
        }

        try {
            setSaving(true);
            setError(null);

            const formDataObj = new FormData();
            if (imageFile) formDataObj.append('image', imageFile);
            formDataObj.append('title', formData.title);
            formDataObj.append('description', formData.description);
            formDataObj.append('icon', formData.icon);
            formDataObj.append('link', formData.link);
            formDataObj.append('order', formData.order);
            formDataObj.append('isActive', formData.isActive);

            if (editingId) {
                await api.put(`/services/${editingId}`, formDataObj);
                setSuccess('Service updated successfully!');
            } else {
                await api.post('/services', formDataObj);
                setSuccess('Service created successfully!');
            }

            resetForm();
            fetchServices();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save service');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this service?')) return;

        try {
            await api.delete(`/services/${id}`);
            setSuccess('Service deleted successfully!');
            fetchServices();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete service');
        }
    };

    const IconComponent = iconOptions.find(i => i.value === formData.icon)?.icon || Home;

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
                <p className="text-lg">Loading services...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link to="/admin/dashboard" className="inline-flex items-center gap-2 text-gray-600 hover:text-[#D1B68A] mb-4">
                        <ArrowLeft className="h-4 w-4" /> Back to Dashboard
                    </Link>
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-gray-900">Service Management</h1>
                        {!showForm && (
                            <button
                                onClick={() => setShowForm(true)}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-[#D1B68A] text-[#182527] font-medium rounded hover:bg-[#c4a87d]"
                            >
                                <Plus className="h-5 w-5" /> Add Service
                            </button>
                        )}
                    </div>
                </div>

                {/* Alerts */}
                {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded">{error}</div>}
                {success && <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded">{success}</div>}

                {/* Form */}
                {showForm && (
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-8 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold">{editingId ? 'Edit Service' : 'Add New Service'}</h2>
                            <button onClick={resetForm} className="p-2 hover:bg-gray-100 rounded"><X className="h-5 w-5" /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Service Image</label>
                                <div className="flex items-start gap-4">
                                    {imagePreview && (
                                        <img src={imagePreview} alt="Preview" className="h-32 w-48 object-cover rounded border" />
                                    )}
                                    <label className="flex-1 flex items-center justify-center gap-2 px-4 py-8 border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-[#D1B68A]">
                                        <Upload className="h-5 w-5 text-gray-400" />
                                        <span className="text-gray-600">{imageFile ? imageFile.name : 'Click to upload'}</span>
                                        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                    </label>
                                </div>
                            </div>

                            {/* Title & Description */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#D1B68A]"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Link</label>
                                    <input
                                        type="text"
                                        value={formData.link}
                                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#D1B68A]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#D1B68A]"
                                    required
                                />
                            </div>

                            {/* Icon & Order */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                                    <div className="flex items-center gap-2">
                                        <select
                                            value={formData.icon}
                                            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                            className="flex-1 px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#D1B68A]"
                                        >
                                            {iconOptions.map(opt => (
                                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                                            ))}
                                        </select>
                                        <div className="p-3 bg-[#D1B68A]/20 rounded">
                                            <IconComponent className="h-5 w-5 text-[#D1B68A]" />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
                                    <input
                                        type="number"
                                        value={formData.order}
                                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#D1B68A]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                    <select
                                        value={formData.isActive}
                                        onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'true' })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#D1B68A]"
                                    >
                                        <option value="true">Active</option>
                                        <option value="false">Inactive</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end gap-4">
                                <button type="button" onClick={resetForm} className="px-6 py-3 border border-gray-300 rounded hover:bg-gray-50">
                                    Cancel
                                </button>
                                <button type="submit" disabled={saving} className="inline-flex items-center gap-2 px-6 py-3 bg-[#182527] text-white rounded hover:bg-[#182527]/90 disabled:opacity-50">
                                    <Save className="h-5 w-5" />
                                    {saving ? 'Saving...' : (editingId ? 'Update Service' : 'Create Service')}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Services List */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="border-b border-gray-200 p-6">
                        <h2 className="text-xl font-semibold">All Services ({services.length})</h2>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {services.length === 0 ? (
                            <p className="p-6 text-center text-gray-500">No services yet. Add your first service!</p>
                        ) : (
                            services.map((service) => (
                                <div key={service._id} className="p-6 flex items-center gap-6">
                                    <img src={service.image?.url} alt={service.title} className="h-20 w-32 object-cover rounded" />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-lg text-[#182527]">{service.title}</h3>
                                            {!service.isActive && (
                                                <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">Inactive</span>
                                            )}
                                        </div>
                                        <p className="text-gray-600 text-sm line-clamp-1">{service.description}</p>
                                        <p className="text-xs text-gray-400 mt-1">Order: {service.order} | Link: {service.link}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => handleEdit(service)} className="p-2 text-[#D1B68A] hover:bg-[#D1B68A]/10 rounded">
                                            <Edit2 className="h-5 w-5" />
                                        </button>
                                        <button onClick={() => handleDelete(service._id)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceManagement;
