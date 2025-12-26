import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Trash2, Upload, Type, Image as ImageIcon, ArrowUp, ArrowDown, Save, Eye } from 'lucide-react';
import api from '../../api/apiSlice';

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState('');
  const [sections, setSections] = useState([]);
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [uploadingSection, setUploadingSection] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/blogs');
      setBlogs(data);
    } catch (err) {
      setError('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setSections([]);
    setCoverImage(null);
    setCoverPreview(null);
    setCoverFile(null);
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (blog) => {
    setTitle(blog.title);
    setSections(blog.sections || []);
    setCoverImage(blog.image);
    setCoverPreview(blog.image?.url);
    setEditingId(blog._id);
    setShowForm(true);
  };

  // Section handlers
  const addTextSection = () => {
    setSections([...sections, { type: 'text', content: '' }]);
  };

  const addImageSection = () => {
    setSections([...sections, { type: 'image', image: null, caption: '' }]);
  };

  const updateSection = (index, field, value) => {
    const newSections = [...sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setSections(newSections);
  };

  const removeSection = (index) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const moveSection = (index, direction) => {
    const newSections = [...sections];
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= sections.length) return;
    [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
    setSections(newSections);
  };

  const handleSectionImageUpload = async (index, file) => {
    if (!file) return;

    try {
      setUploadingSection(index);
      const formData = new FormData();
      formData.append('image', file);

      const { data } = await api.post('/blogs/upload-section-image', formData);
      updateSection(index, 'image', { url: data.url, public_id: data.public_id });
    } catch (err) {
      setError('Failed to upload image');
    } finally {
      setUploadingSection(null);
    }
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setCoverPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const formData = new FormData();
      formData.append('title', title);
      formData.append('sections', JSON.stringify(sections));
      if (coverFile) formData.append('image', coverFile);

      if (editingId) {
        await api.put(`/blogs/${editingId}`, formData);
        setSuccess('Blog updated successfully!');
      } else {
        await api.post('/blogs', formData);
        setSuccess('Blog created successfully!');
      }

      resetForm();
      fetchBlogs();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save blog');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;

    try {
      await api.delete(`/blogs/${id}`);
      setSuccess('Blog deleted successfully!');
      fetchBlogs();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete blog');
    }
  };

  if (loading) {
    return <div className="p-6 flex items-center justify-center min-h-[400px]"><p>Loading blogs...</p></div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#182527]">Blog Management</h1>
          <p className="text-gray-500 text-sm">Create professional blog posts with rich content</p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#D1B68A] text-[#182527] font-medium rounded hover:bg-[#c4a87d]"
          >
            <Plus className="h-5 w-5" /> New Post
          </button>
        )}
      </div>

      {/* Alerts */}
      {error && <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded">{error}</div>}
      {success && <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded">{success}</div>}

      {/* Blog Editor */}
      {showForm && (
        <div className="bg-white border border-gray-200 rounded mb-6">
          <div className="p-5 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold">{editingId ? 'Edit Post' : 'Create New Post'}</h2>
            <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">Cancel</button>
          </div>

          <form onSubmit={handleSubmit} className="p-5 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#D1B68A]"
                placeholder="Enter blog title..."
                required
              />
            </div>

            {/* Cover Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
              {coverPreview && <img src={coverPreview} alt="Cover" className="h-40 w-full object-cover rounded mb-3" />}
              <label className="flex items-center justify-center gap-2 px-4 py-4 border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-[#D1B68A]">
                <Upload className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">{coverFile ? coverFile.name : 'Upload cover image'}</span>
                <input type="file" accept="image/*" onChange={handleCoverImageChange} className="hidden" />
              </label>
            </div>

            {/* Content Sections */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">Content Sections</label>
                <div className="flex gap-2">
                  <button type="button" onClick={addTextSection} className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200">
                    <Type className="h-4 w-4" /> Add Text
                  </button>
                  <button type="button" onClick={addImageSection} className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200">
                    <ImageIcon className="h-4 w-4" /> Add Image
                  </button>
                </div>
              </div>

              {sections.length === 0 && (
                <p className="text-gray-400 text-center py-8 border border-dashed border-gray-300 rounded">
                  Add text and image sections to build your blog content
                </p>
              )}

              <div className="space-y-4">
                {sections.map((section, index) => (
                  <div key={index} className="border border-gray-200 rounded p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium uppercase text-gray-500">
                        {section.type === 'text' ? 'Text Section' : 'Image Section'}
                      </span>
                      <div className="flex items-center gap-1">
                        <button type="button" onClick={() => moveSection(index, -1)} disabled={index === 0} className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30">
                          <ArrowUp className="h-4 w-4" />
                        </button>
                        <button type="button" onClick={() => moveSection(index, 1)} disabled={index === sections.length - 1} className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30">
                          <ArrowDown className="h-4 w-4" />
                        </button>
                        <button type="button" onClick={() => removeSection(index)} className="p-1 text-red-500 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {section.type === 'text' ? (
                      <textarea
                        value={section.content || ''}
                        onChange={(e) => updateSection(index, 'content', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#D1B68A]"
                        placeholder="Write your paragraph here..."
                      />
                    ) : (
                      <div>
                        {section.image?.url ? (
                          <img src={section.image.url} alt="Section" className="w-full h-48 object-cover rounded mb-3" />
                        ) : (
                          <label className="flex items-center justify-center gap-2 px-4 py-8 border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-[#D1B68A] mb-3">
                            {uploadingSection === index ? (
                              <span className="text-gray-500">Uploading...</span>
                            ) : (
                              <>
                                <Upload className="h-5 w-5 text-gray-400" />
                                <span className="text-gray-600">Click to upload image</span>
                              </>
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleSectionImageUpload(index, e.target.files[0])}
                              className="hidden"
                              disabled={uploadingSection !== null}
                            />
                          </label>
                        )}
                        <input
                          type="text"
                          value={section.caption || ''}
                          onChange={(e) => updateSection(index, 'caption', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#D1B68A]"
                          placeholder="Image caption (optional)"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
              <button type="button" onClick={resetForm} className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" disabled={saving} className="inline-flex items-center gap-2 px-6 py-2 bg-[#182527] text-white rounded hover:bg-[#182527]/90 disabled:opacity-50">
                <Save className="h-4 w-4" />
                {saving ? 'Saving...' : (editingId ? 'Update Post' : 'Publish Post')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Blog List */}
      <div className="bg-white border border-gray-200 rounded">
        <div className="p-5 border-b border-gray-200">
          <h2 className="text-lg font-semibold">All Posts ({blogs.length})</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {blogs.length === 0 ? (
            <p className="p-6 text-center text-gray-500">No blog posts yet.</p>
          ) : (
            blogs.map((blog) => (
              <div key={blog._id} className="p-4 flex items-center gap-4 hover:bg-gray-50">
                <img
                  src={blog.image?.url || 'https://via.placeholder.com/100x70'}
                  alt={blog.title}
                  className="h-16 w-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-[#182527]">{blog.title}</h3>
                  <p className="text-xs text-gray-400">
                    {new Date(blog.createdAt).toLocaleDateString()} • {blog.sections?.length || 0} sections
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Link to={`/blog/${blog._id}`} className="p-2 text-gray-500 hover:text-[#182527]">
                    <Eye className="h-5 w-5" />
                  </Link>
                  <button onClick={() => handleEdit(blog)} className="p-2 text-[#D1B68A] hover:bg-[#D1B68A]/10 rounded">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(blog._id)} className="p-2 text-red-500 hover:bg-red-50 rounded">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogManagement;