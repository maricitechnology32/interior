import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Trash2, Save, Upload, Users, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../api/apiSlice';

const AboutManagement = () => {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('');
    const [heroImageFile, setHeroImageFile] = useState(null);
    const [heroPreview, setHeroPreview] = useState(null);
    const [uploadingTeamImage, setUploadingTeamImage] = useState(null); // Index of team member being uploaded

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/about');
            setContent(data);
            if (data?.heroImage?.url) setHeroPreview(data.heroImage.url);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load content');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field, value) => {
        setContent(prev => ({ ...prev, [field]: value }));
    };

    const handleStatChange = (index, field, value) => {
        const newStats = [...(content.stats || [])];
        newStats[index] = { ...newStats[index], [field]: value };
        setContent(prev => ({ ...prev, stats: newStats }));
    };

    const addStat = () => {
        setContent(prev => ({
            ...prev,
            stats: [...(prev.stats || []), { value: '', label: '' }]
        }));
    };

    const removeStat = (index) => {
        setContent(prev => ({
            ...prev,
            stats: prev.stats.filter((_, i) => i !== index)
        }));
    };

    const handleTeamChange = (index, field, value) => {
        const newTeam = [...(content.team || [])];
        newTeam[index] = { ...newTeam[index], [field]: value };
        setContent(prev => ({ ...prev, team: newTeam }));
    };

    const addTeamMember = () => {
        setContent(prev => ({
            ...prev,
            team: [...(prev.team || []), { name: '', role: '', image: { url: '', public_id: '' } }]
        }));
    };

    const removeTeamMember = (index) => {
        setContent(prev => ({
            ...prev,
            team: prev.team.filter((_, i) => i !== index)
        }));
    };

    const handleTeamImageUpload = async (index, file) => {
        if (!file) return;

        try {
            setUploadingTeamImage(index);
            setError(null);

            const formData = new FormData();
            formData.append('image', file);

            const { data } = await api.post('/about/team-image', formData);

            // Update the team member with the new image
            const newTeam = [...(content.team || [])];
            newTeam[index] = { ...newTeam[index], image: { url: data.url, public_id: data.public_id } };
            setContent(prev => ({ ...prev, team: newTeam }));
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to upload image');
        } finally {
            setUploadingTeamImage(null);
        }
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

    const saveContent = async () => {
        try {
            setSaving(true);
            setError(null);

            const formData = new FormData();
            if (heroImageFile) formData.append('image', heroImageFile);

            formData.append('heroTagline', content?.heroTagline || '');
            formData.append('heroTitle', content?.heroTitle || '');
            formData.append('heroSubtitle', content?.heroSubtitle || '');
            formData.append('stats', JSON.stringify(content?.stats || []));
            formData.append('aboutTagline', content?.aboutTagline || '');
            formData.append('aboutTitle', content?.aboutTitle || '');
            formData.append('aboutParagraphs', JSON.stringify(content?.aboutParagraphs || []));
            formData.append('mission', content?.mission || '');
            formData.append('vision', content?.vision || '');
            formData.append('team', JSON.stringify(content?.team || []));

            await api.put('/about', formData);
            setSuccess('Content saved successfully!');
            setHeroImageFile(null);
            fetchContent();
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
                <p className="text-lg">Loading about content...</p>
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
                    <h1 className="text-3xl font-bold text-gray-900">About Page Management</h1>
                    <p className="text-gray-600">Manage your about page content</p>
                </div>

                {/* Alerts */}
                {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded">{error}</div>}
                {success && <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded">{success}</div>}

                {/* Hero Section */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6 p-6">
                    <h2 className="text-xl font-semibold mb-6">Hero Section</h2>

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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
                            <input type="text" value={content?.heroTagline || ''} onChange={(e) => handleChange('heroTagline', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                            <input type="text" value={content?.heroTitle || ''} onChange={(e) => handleChange('heroTitle', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                        <input type="text" value={content?.heroSubtitle || ''} onChange={(e) => handleChange('heroSubtitle', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded" />
                    </div>
                </div>

                {/* Stats */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold">Stats</h2>
                        <button onClick={addStat} className="inline-flex items-center gap-2 px-4 py-2 bg-[#D1B68A] text-[#182527] font-medium rounded">
                            <Plus className="h-4 w-4" /> Add Stat
                        </button>
                    </div>
                    <div className="space-y-4">
                        {content?.stats?.map((stat, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <input type="text" value={stat.value} onChange={(e) => handleStatChange(index, 'value', e.target.value)} placeholder="500+" className="flex-1 px-4 py-3 border border-gray-300 rounded" />
                                <input type="text" value={stat.label} onChange={(e) => handleStatChange(index, 'label', e.target.value)} placeholder="Projects" className="flex-1 px-4 py-3 border border-gray-300 rounded" />
                                <button onClick={() => removeStat(index)} className="p-3 text-red-600 hover:bg-red-50 rounded"><Trash2 className="h-5 w-5" /></button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mission & Vision */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6 p-6">
                    <h2 className="text-xl font-semibold mb-6">Mission & Vision</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Mission</label>
                            <textarea value={content?.mission || ''} onChange={(e) => handleChange('mission', e.target.value)} rows={3} className="w-full px-4 py-3 border border-gray-300 rounded" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Vision</label>
                            <textarea value={content?.vision || ''} onChange={(e) => handleChange('vision', e.target.value)} rows={3} className="w-full px-4 py-3 border border-gray-300 rounded" />
                        </div>
                    </div>
                </div>

                {/* Team */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-[#D1B68A]" />
                            <h2 className="text-xl font-semibold">Team Members</h2>
                        </div>
                        <button onClick={addTeamMember} className="inline-flex items-center gap-2 px-4 py-2 bg-[#D1B68A] text-[#182527] font-medium rounded">
                            <Plus className="h-4 w-4" /> Add Member
                        </button>
                    </div>
                    <div className="space-y-6">
                        {content?.team?.map((member, index) => (
                            <div key={index} className="p-4 border border-gray-200 rounded">
                                <div className="flex items-start gap-4">
                                    {/* Image Upload Section */}
                                    <div className="flex flex-col items-center">
                                        <div className="relative">
                                            <img
                                                src={member.image?.url || 'https://via.placeholder.com/100'}
                                                alt={member.name || 'Team member'}
                                                className="h-24 w-24 object-cover rounded-full border-2 border-gray-200"
                                            />
                                            {uploadingTeamImage === index && (
                                                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                                                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                </div>
                                            )}
                                        </div>
                                        <label className="mt-2 inline-flex items-center gap-1 px-3 py-1.5 bg-[#D1B68A]/20 text-[#182527] text-sm font-medium rounded cursor-pointer hover:bg-[#D1B68A]/30">
                                            <ImageIcon className="h-4 w-4" />
                                            Upload
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleTeamImageUpload(index, e.target.files[0])}
                                                className="hidden"
                                                disabled={uploadingTeamImage !== null}
                                            />
                                        </label>
                                    </div>

                                    {/* Team Member Details */}
                                    <div className="flex-1 space-y-3">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                            <input
                                                type="text"
                                                value={member.name}
                                                onChange={(e) => handleTeamChange(index, 'name', e.target.value)}
                                                placeholder="Full Name"
                                                className="w-full px-4 py-2 border border-gray-300 rounded"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                            <input
                                                type="text"
                                                value={member.role}
                                                onChange={(e) => handleTeamChange(index, 'role', e.target.value)}
                                                placeholder="Job Title"
                                                className="w-full px-4 py-2 border border-gray-300 rounded"
                                            />
                                        </div>
                                    </div>

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => removeTeamMember(index)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {(!content?.team || content.team.length === 0) && (
                            <p className="text-center text-gray-500 py-4">No team members added yet.</p>
                        )}
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                    <button onClick={saveContent} disabled={saving} className="inline-flex items-center gap-2 px-8 py-3 bg-[#182527] text-white font-semibold rounded disabled:opacity-50">
                        <Save className="h-5 w-5" />
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AboutManagement;
