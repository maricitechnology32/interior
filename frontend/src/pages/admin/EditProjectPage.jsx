import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../api/apiSlice';
import Button from '../../components/ui/Button';

const CATEGORIES = ['Residential', 'Commercial', 'Hospitality'];

const EditProjectPage = () => {
  // --- State ---
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [imageFiles, setImageFiles] = useState(null);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // --- Hooks ---
  const { id } = useParams(); // Get project ID from URL
  const navigate = useNavigate();

  // --- Data Fetching ---
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/projects/${id}`);
        setTitle(data.title);
        setDescription(data.description);
        setCategory(data.category);
        setExistingImages(data.imageUrls || []);
      } catch (err) {
        setError('Failed to load project data.');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  // --- Handlers ---
  const handleFileChange = (e) => {
    setImageFiles(e.target.files);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);

    // Add new image files if they exist
    if (imageFiles && imageFiles.length > 0) {
      for (let i = 0; i < imageFiles.length; i++) {
        formData.append('images', imageFiles[i]);
      }
    }
    // Note: If no new files are uploaded, our backend
    // controller will keep the existing images.

    try {
      // Use PUT request for update
      await api.put(`/projects/${id}`, formData);
      navigate('/admin/projects'); // Redirect back to list
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update project.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Render ---
  if (loading) return <p>Loading project data...</p>;

  return (
    <div className="p-4">
      <Link to="/admin/projects" className="font-medium text-[#D1B68A] hover:text-[#b58e5a] hover:underline">
        &larr; Back to Project Management
      </Link>
      <h1 className="my-4 text-3xl font-bold text-gray-900">
        Edit Project
      </h1>

      <div className="mb-12 rounded border border-gray-200 bg-white p-6 shadow-md">
        <form onSubmit={submitHandler}>
          {/* Title */}
          <div className="mb-4">
            <label htmlFor="title" className="mb-2 block font-medium">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full rounded border border-gray-300 p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label htmlFor="category" className="mb-2 block font-medium">
              Category
            </label>
            <select
              id="category"
              className="w-full rounded border border-gray-300 p-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="mb-2 block font-medium">
              Description
            </label>
            <textarea
              id="description"
              rows="5"
              className="w-full rounded border border-gray-300 p-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Image Files */}
          <div className="mb-4">
            <label htmlFor="images" className="mb-2 block font-medium">
              Upload New Images (Optional: This will replace all old images)
            </label>
            <input
              type="file"
              id="images"
              className="w-full rounded border border-gray-300 p-2 file:mr-4 file:rounded file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:font-medium hover:file:bg-gray-200"
              onChange={handleFileChange}
              multiple // Allow multiple files
            />
          </div>

          {/* Show existing image thumbnails */}
          {!imageFiles && existingImages.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium">Current Images:</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {existingImages.map(img => (
                  <img
                    key={img.public_id}
                    src={img.url}
                    alt="Current project"
                    className="h-20 w-20 rounded object-cover"
                  />
                ))}
              </div>
            </div>
          )}

          {error && <div className="mb-4 rounded bg-red-100 p-3 text-red-700">{error}</div>}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditProjectPage;