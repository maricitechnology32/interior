import { useState, useEffect } from 'react';
import { ArrowLeft, Save, Upload, Phone, Mail, MapPin, Globe, Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../api/apiSlice';

const ContactSettingsManagement = () => {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('');
    const [heroImageFile, setHeroImageFile] = useState(null);
    const [heroPreview, setHeroPreview] = useState(null);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/contact-settings');
            setSettings(data);
            if (data?.heroImage?.url) setHeroPreview(data.heroImage.url);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load settings');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field, value) => {
        setSettings(prev => ({ ...prev, [field]: value }));
    };

    const handleSocialChange = (platform, value) => {
        setSettings(prev => ({
            ...prev,
            socialLinks: { ...prev.socialLinks, [platform]: value }
        }));
    };

    const handleHeroImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setHeroImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setHeroPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const saveSettings = async () => {
        try {
            setSaving(true);
            setError(null);

            const formData = new FormData();
            if (heroImageFile) formData.append('image', heroImageFile);

            formData.append('heroTagline', settings?.heroTagline || '');
            formData.append('heroTitle', settings?.heroTitle || '');
            formData.append('heroSubtitle', settings?.heroSubtitle || '');
            formData.append('phone', settings?.phone || '');
            formData.append('email', settings?.email || '');
            formData.append('address', settings?.address || '');
            formData.append('businessHours', settings?.businessHours || '');
            formData.append('socialLinks', JSON.stringify(settings?.socialLinks || {}));
            formData.append('footerTagline', settings?.footerTagline || '');
            formData.append('copyrightText', settings?.copyrightText || '');
            formData.append('developerName', settings?.developerName || '');
            formData.append('developerUrl', settings?.developerUrl || '');

            await api.put('/contact-settings', formData);
            setSuccess('Settings saved successfully!');
            setHeroImageFile(null);
            fetchSettings();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
                <p className="text-lg">Loading contact settings...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link to="/admin/dashboard" className="inline-flex items-center gap-2 text-gray-600 hover:text-[#D1B68A] mb-4">
                        <ArrowLeft className="h-4 w-4" /> Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">Contact & Footer Settings</h1>
                    <p className="text-gray-600">Manage contact page and footer content</p>
                </div>

                {/* Alerts */}
                {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded">{error}</div>}
                {success && <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded">{success}</div>}

                {/* Contact Page Hero */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6 p-6">
                    <h2 className="text-xl font-semibold mb-6">Contact Page Hero</h2>

                    {/* Hero Image */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Hero Image</label>
                        {heroPreview && <img src={heroPreview} alt="Hero Preview" className="h-40 w-full object-cover rounded mb-3" />}
                        <label className="flex items-center justify-center gap-2 px-4 py-4 border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-[#D1B68A]">
                            <Upload className="h-5 w-5 text-gray-400" />
                            <span className="text-gray-600">{heroImageFile ? heroImageFile.name : 'Click to upload'}</span>
                            <input type="file" accept="image/*" onChange={handleHeroImageChange} className="hidden" />
                        </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
                            <input type="text" value={settings?.heroTagline || ''} onChange={(e) => handleChange('heroTagline', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                            <input type="text" value={settings?.heroTitle || ''} onChange={(e) => handleChange('heroTitle', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                            <input type="text" value={settings?.heroSubtitle || ''} onChange={(e) => handleChange('heroSubtitle', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded" />
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6 p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <Phone className="h-5 w-5 text-[#D1B68A]" />
                        <h2 className="text-xl font-semibold">Contact Information</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                            <div className="flex items-center">
                                <Phone className="h-5 w-5 text-gray-400 mr-2" />
                                <input type="text" value={settings?.phone || ''} onChange={(e) => handleChange('phone', e.target.value)} className="flex-1 px-4 py-3 border border-gray-300 rounded" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <div className="flex items-center">
                                <Mail className="h-5 w-5 text-gray-400 mr-2" />
                                <input type="email" value={settings?.email || ''} onChange={(e) => handleChange('email', e.target.value)} className="flex-1 px-4 py-3 border border-gray-300 rounded" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                            <div className="flex items-center">
                                <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                                <input type="text" value={settings?.address || ''} onChange={(e) => handleChange('address', e.target.value)} className="flex-1 px-4 py-3 border border-gray-300 rounded" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Business Hours</label>
                            <input type="text" value={settings?.businessHours || ''} onChange={(e) => handleChange('businessHours', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded" placeholder="Mon - Fri: 9:00 AM - 6:00 PM" />
                        </div>
                    </div>
                </div>

                {/* Social Media Links */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6 p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <Globe className="h-5 w-5 text-[#D1B68A]" />
                        <h2 className="text-xl font-semibold">Social Media Links</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                            <div className="flex items-center">
                                <Facebook className="h-5 w-5 text-gray-400 mr-2" />
                                <input type="url" value={settings?.socialLinks?.facebook || ''} onChange={(e) => handleSocialChange('facebook', e.target.value)} className="flex-1 px-4 py-3 border border-gray-300 rounded" placeholder="https://facebook.com/yourpage" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                            <div className="flex items-center">
                                <Instagram className="h-5 w-5 text-gray-400 mr-2" />
                                <input type="url" value={settings?.socialLinks?.instagram || ''} onChange={(e) => handleSocialChange('instagram', e.target.value)} className="flex-1 px-4 py-3 border border-gray-300 rounded" placeholder="https://instagram.com/yourpage" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                            <div className="flex items-center">
                                <Linkedin className="h-5 w-5 text-gray-400 mr-2" />
                                <input type="url" value={settings?.socialLinks?.linkedin || ''} onChange={(e) => handleSocialChange('linkedin', e.target.value)} className="flex-1 px-4 py-3 border border-gray-300 rounded" placeholder="https://linkedin.com/company/yourpage" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
                            <div className="flex items-center">
                                <Twitter className="h-5 w-5 text-gray-400 mr-2" />
                                <input type="url" value={settings?.socialLinks?.twitter || ''} onChange={(e) => handleSocialChange('twitter', e.target.value)} className="flex-1 px-4 py-3 border border-gray-300 rounded" placeholder="https://twitter.com/yourpage" />
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">YouTube</label>
                            <div className="flex items-center">
                                <Youtube className="h-5 w-5 text-gray-400 mr-2" />
                                <input type="url" value={settings?.socialLinks?.youtube || ''} onChange={(e) => handleSocialChange('youtube', e.target.value)} className="flex-1 px-4 py-3 border border-gray-300 rounded" placeholder="https://youtube.com/@yourchannel" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Settings */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6 p-6">
                    <h2 className="text-xl font-semibold mb-6">Footer Settings</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Footer Tagline</label>
                            <textarea value={settings?.footerTagline || ''} onChange={(e) => handleChange('footerTagline', e.target.value)} rows={2} className="w-full px-4 py-3 border border-gray-300 rounded" placeholder="Company description for footer..." />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Copyright Text</label>
                                <input type="text" value={settings?.copyrightText || ''} onChange={(e) => handleChange('copyrightText', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded" placeholder="Company Name" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Developer Name</label>
                                <input type="text" value={settings?.developerName || ''} onChange={(e) => handleChange('developerName', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Developer Website URL</label>
                            <input type="url" value={settings?.developerUrl || ''} onChange={(e) => handleChange('developerUrl', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded" />
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                    <button onClick={saveSettings} disabled={saving} className="inline-flex items-center gap-2 px-8 py-3 bg-[#182527] text-white font-semibold rounded disabled:opacity-50">
                        <Save className="h-5 w-5" />
                        {saving ? 'Saving...' : 'Save Settings'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContactSettingsManagement;
