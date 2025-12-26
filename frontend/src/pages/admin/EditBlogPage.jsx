import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../api/apiSlice';
import Button from '../../components/ui/Button';

const EditBlogPage = () => {
  // --- State ---
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // --- Hooks ---
  const { id } = useParams(); // Get blog ID from URL
  const navigate = useNavigate();

  // --- Data Fetching ---
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/blogs/${id}`);
        setTitle(data.title);
        setContent(data.content);
        setExistingImage(data.image); // Store the existing image object
      } catch (err) {
        setError('Failed to load blog post.');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  // --- Handlers ---
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (imageFile) {
      // 'image' must match multer key
      formData.append('image', imageFile);
    }

    // Note: If no new image is sent, our backend controller
    // is smart enough to just keep the old one.

    try {
      // Use PUT request for update
      await api.put(`/blogs/${id}`, formData);
      navigate('/admin/blog'); // Redirect back to list on success
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update post.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Render ---
  if (loading) return <p>Loading post data...</p>;

  return (
    <div className="p-4">
      <Link to="/admin/blog" className="font-medium text-[#D1B68A] hover:text-[#b58e5a] hover:underline">
        &larr; Back to Blog Management
      </Link>
      <h1 className="my-4 text-3xl font-bold text-gray-900">
        Edit Blog Post
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
          {/* Content */}
          <div className="mb-4">
            <label htmlFor="content" className="mb-2 block font-medium">
              Content
            </label>
            <textarea
              id="content"
              rows="10"
              className="w-full rounded border border-gray-300 p-2"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          {/* Image Upload */}
          <div className="mb-4">
            <label htmlFor="imageFile" className="mb-2 block font-medium">
              Cover Image (Optional: Upload to replace)
            </label>
            <input
              type="file"
              id="imageFile"
              className="w-full rounded border border-gray-300 p-2 file:mr-4 file:rounded file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:font-medium hover:file:bg-gray-200"
              onChange={handleFileChange}
            />
          </div>

          {/* Show existing image thumbnail */}
          {!imageFile && existingImage && (
            <div className="mb-4">
              <p className="text-sm font-medium">Current Image:</p>
              <img
                src={existingImage.url}
                alt="Current"
                className="mt-2 h-24 w-auto rounded"
              />
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

export default EditBlogPage;