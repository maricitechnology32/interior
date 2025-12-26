import { useState, useEffect } from 'react';
import { Settings, Plus, Trash2, Save, Image, Type, BarChart3, ArrowLeft, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../api/apiSlice';

const SiteSettingsManagement = () => {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/settings');
            setSettings(data);
            // Set initial preview from existing image
            if (data?.heroImage?.url) {
                setImagePreview(data.heroImage.url);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load settings');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field, value) => {
        setSettings(prev => ({ ...prev, [field]: value }));
    };

    const handleStatChange = (index, field, value) => {
        const newStats = [...(settings.heroStats || [])];
        newStats[index] = { ...newStats[index], [field]: value };
        setSettings(prev => ({ ...prev, heroStats: newStats }));
    };

    const addStat = () => {
        setSettings(prev => ({
            ...prev,
            heroStats: [...(prev.heroStats || []), { value: '', label: '' }]
        }));
    };

    const removeStat = (index) => {
        setSettings(prev => ({
            ...prev,
            heroStats: prev.heroStats.filter((_, i) => i !== index)
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const saveSettings = async () => {
        try {
            setSaving(true);
            setError(null);
            setSuccess('');

            // Use FormData for file upload
            const formData = new FormData();

            // Add image file if selected
            if (imageFile) {
                formData.append('image', imageFile);
            }

            // Add text fields
            formData.append('heroTagline', settings?.heroTagline || '');
            formData.append('heroHeading', settings?.heroHeading || '');
            formData.append('heroSubheading', settings?.heroSubheading || '');
            formData.append('heroCta1Text', settings?.heroCta1Text || '');
            formData.append('heroCta2Text', settings?.heroCta2Text || '');
            formData.append('heroStats', JSON.stringify(settings?.heroStats || []));
            formData.append('siteName', settings?.siteName || '');
            formData.append('metaDescription', settings?.metaDescription || '');

            await api.put('/settings', formData);

            setSuccess('Settings saved successfully!');
            setImageFile(null);
            fetchSettings(); // Refresh to get updated image URL
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save settings');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="animate-pulse space-y-6">
                        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                        <div className="h-64 bg-gray-200 rounded"></div>
                        <div className="h-48 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        to="/admin/dashboard"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-[#D1B68A] mb-4"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Dashboard
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#182527]">
                            <Settings className="h-6 w-6 text-[#D1B68A]" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Site Settings</h1>
                            <p className="text-gray-600">Manage your hero section and site-wide settings</p>
                        </div>
                    </div>
                </div>

                {/* Alerts */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded">
                        {success}
                    </div>
                )}

                {/* Hero Section Settings */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
                    <div className="border-b border-gray-200 p-6">
                        <div className="flex items-center gap-2">
                            <Image className="h-5 w-5 text-[#D1B68A]" />
                            <h2 className="text-xl font-semibold">Hero Section</h2>
                        </div>
                    </div>
                    <div className="p-6 space-y-6">
                        {/* Hero Image Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Hero Background Image
                            </label>
                            <div className="mt-2 flex flex-col gap-4">
                                {/* Current/Preview Image */}
                                {imagePreview && (
                                    <div className="relative">
                                        <img
                                            src={imagePreview}
                                            alt="Hero Preview"
                                            className="h-48 w-full object-cover rounded border border-gray-200"
                                        />
                                        {imageFile && (
                                            <span className="absolute top-2 right-2 bg-[#D1B68A] text-[#182527] text-xs font-medium px-2 py-1 rounded">
                                                New Image
                                            </span>
                                        )}
                                    </div>
                                )}

                                {/* File Upload */}
                                <div className="flex items-center gap-4">
                                    <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-[#D1B68A] transition-colors">
                                        <Upload className="h-5 w-5 text-gray-400" />
                                        <span className="text-gray-600">
                                            {imageFile ? imageFile.name : 'Click to upload new image'}
                                        </span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </label>
                                    {imageFile && (
                                        <button
                                            onClick={() => {
                                                setImageFile(null);
                                                setImagePreview(settings?.heroImage?.url || null);
                                            }}
                                            className="px-4 py-3 text-red-600 border border-red-200 rounded hover:bg-red-50"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                                <p className="text-sm text-gray-500">
                                    Recommended: 1920x1080px or larger. Max 5MB.
                                </p>
                            </div>
                        </div>

                        {/* Hero Text Content */}
                        <div className="flex items-center gap-2 pt-4 border-t">
                            <Type className="h-5 w-5 text-[#D1B68A]" />
                            <h3 className="text-lg font-medium">Text Content</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tagline
                                </label>
                                <input
                                    type="text"
                                    value={settings?.heroTagline || ''}
                                    onChange={(e) => handleInputChange('heroTagline', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#D1B68A]"
                                    placeholder="Interior Design Studio"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Main Heading
                                </label>
                                <input
                                    type="text"
                                    value={settings?.heroHeading || ''}
                                    onChange={(e) => handleInputChange('heroHeading', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#D1B68A]"
                                    placeholder="The Space Stylers"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Subheading
                            </label>
                            <textarea
                                value={settings?.heroSubheading || ''}
                                onChange={(e) => handleInputChange('heroSubheading', e.target.value)}
                                rows={2}
                                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#D1B68A]"
                                placeholder="We create personalized, functional, and stylish interiors..."
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Primary Button Text
                                </label>
                                <input
                                    type="text"
                                    value={settings?.heroCta1Text || ''}
                                    onChange={(e) => handleInputChange('heroCta1Text', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#D1B68A]"
                                    placeholder="Get Free Consultation"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Secondary Button Text
                                </label>
                                <input
                                    type="text"
                                    value={settings?.heroCta2Text || ''}
                                    onChange={(e) => handleInputChange('heroCta2Text', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#D1B68A]"
                                    placeholder="View Our Work"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hero Stats */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
                    <div className="border-b border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <BarChart3 className="h-5 w-5 text-[#D1B68A]" />
                                <h2 className="text-xl font-semibold">Hero Stats</h2>
                            </div>
                            <button
                                onClick={addStat}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-[#D1B68A] text-[#182527] font-medium rounded hover:bg-[#c4a87d] transition-colors"
                            >
                                <Plus className="h-4 w-4" />
                                Add Stat
                            </button>
                        </div>
                    </div>
                    <div className="p-6 space-y-4">
                        {settings?.heroStats?.map((stat, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={stat.value}
                                        onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#D1B68A]"
                                        placeholder="500+"
                                    />
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={stat.label}
                                        onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#D1B68A]"
                                        placeholder="Projects Completed"
                                    />
                                </div>
                                <button
                                    onClick={() => removeStat(index)}
                                    className="p-3 text-red-600 hover:bg-red-50 rounded transition-colors"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </div>
                        ))}
                        {(!settings?.heroStats || settings.heroStats.length === 0) && (
                            <p className="text-gray-500 text-center py-4">
                                No stats added yet. Click "Add Stat" to add one.
                            </p>
                        )}
                    </div>
                </div>

                {/* Site-Wide Settings */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
                    <div className="border-b border-gray-200 p-6">
                        <h2 className="text-xl font-semibold">Site-Wide Settings</h2>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Site Name
                            </label>
                            <input
                                type="text"
                                value={settings?.siteName || ''}
                                onChange={(e) => handleInputChange('siteName', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#D1B68A]"
                                placeholder="The Space Stylers"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Meta Description
                            </label>
                            <textarea
                                value={settings?.metaDescription || ''}
                                onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                                rows={2}
                                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#D1B68A]"
                                placeholder="Professional interior design services..."
                            />
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                    <button
                        onClick={saveSettings}
                        disabled={saving}
                        className="inline-flex items-center gap-2 px-8 py-3 bg-[#182527] text-white font-semibold rounded hover:bg-[#182527]/90 transition-colors disabled:opacity-50"
                    >
                        <Save className="h-5 w-5" />
                        {saving ? 'Saving...' : 'Save Settings'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SiteSettingsManagement;
