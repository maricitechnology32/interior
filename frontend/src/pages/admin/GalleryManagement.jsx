import React, { useState, useEffect } from 'react';
import api from '../../api/apiSlice';
import Button from '../../components/ui/Button';

const GalleryManagement = () => {
  // --- State ---
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form state
  const [newCaption, setNewCaption] = useState('');
  const [newImageFile, setNewImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Data Fetching ---
  const fetchGalleryImages = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.get('/gallery');
      setImages(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch gallery images.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  // --- Handlers ---

  // Handle Deletion
  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        await api.delete(`/gallery/${id}`);
        fetchGalleryImages(); // Refresh the list
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete image.');
      }
    }
  };

  // Handle File Selection
  const handleFileChange = (e) => {
    setNewImageFile(e.target.files[0]);
  };

  // Handle Creation
  const createHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!newImageFile) {
      setError('An image file is required.');
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append('caption', newCaption);
    formData.append('image', newImageFile); // 'image' must match multer

    try {
      await api.post('/gallery', formData);
      // Clear form and refresh list
      setNewCaption('');
      setNewImageFile(null);
      e.target.reset();
      fetchGalleryImages();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload image.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Render ---
  return (
    <div className="p-4">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">
        Gallery Management
      </h1>

      {/* --- Upload New Image Form --- */}
      <div className="mb-12 rounded border border-gray-200 bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-semibold">Upload New Image</h2>
        <form onSubmit={createHandler}>
          {/* Image File */}
          <div className="mb-4">
            <label htmlFor="imageFile" className="mb-2 block font-medium">
              Image File
            </label>
            <input
              type="file"
              id="imageFile"
              className="w-full rounded border border-gray-300 p-2 file:mr-4 file:rounded file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:font-medium hover:file:bg-gray-200"
              onChange={handleFileChange}
              required
            />
          </div>

          {/* Caption */}
          <div className="mb-4">
            <label htmlFor="caption" className="mb-2 block font-medium">
              Caption (Optional)
            </label>
            <input
              type="text"
              id="caption"
              className="w-full rounded border border-gray-300 p-2"
              value={newCaption}
              onChange={(e) => setNewCaption(e.target.value)}
            />
          </div>

          {/* Error message for form */}
          {error && (
            <div className="mb-4 rounded bg-red-100 p-3 text-center text-red-700">
              {error}
            </div>
          )}
          
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Uploading...' : 'Upload to Gallery'}
          </Button>
        </form>
      </div>

      {/* --- Existing Gallery Images --- */}
      <h2 className="mb-4 text-2xl font-semibold">Existing Images</h2>
      {loading && <p>Loading images...</p>}

      {!loading && !error && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {images.length === 0 ? (
            <p className="text-gray-600">No images in gallery.</p>
          ) : (
            images.map((item) => (
              <div
                key={item._id}
                className="relative overflow-hidden rounded-lg border bg-white shadow-md"
              >
                <img
                  src={item.image.url}
                  alt={item.caption || 'Gallery image'}
                  className="h-40 w-full object-cover"
                />
                <div className="p-2">
                  <p className="truncate text-sm text-gray-700">
                    {item.caption || <i>No caption</i>}
                  </p>
                  <button
                    onClick={() => deleteHandler(item._id)}
                    className="mt-2 w-full rounded bg-red-500 px-3 py-1 text-xs font-medium text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default GalleryManagement;