import React, { useState, useEffect } from 'react';
import api from '../../api/apiSlice';
import Button from '../../components/ui/Button';

const TestimonialManagement = () => {
  // --- State ---
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form state
  const [newName, setNewName] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newQuote, setNewQuote] = useState('');
  const [newRating, setNewRating] = useState('5'); // Default to 5 stars
  const [newImageFile, setNewImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Data Fetching ---
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.get('/testimonials');
      setTestimonials(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch testimonials.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // --- Handlers ---

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await api.delete(`/testimonials/${id}`);
        fetchTestimonials(); // Refresh
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete testimonial.');
      }
    }
  };

  const handleFileChange = (e) => {
    setNewImageFile(e.target.files[0]);
  };

  const createHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // 1. Use FormData for file uploads
    const formData = new FormData();
    formData.append('name', newName);
    formData.append('title', newTitle);
    formData.append('quote', newQuote);
    formData.append('rating', newRating);
    if (newImageFile) {
      formData.append('image', newImageFile);
    }

    try {
      // 2. Post the FormData
      await api.post('/testimonials', formData);

      // 3. Clear form and refresh
      setNewName('');
      setNewTitle('');
      setNewQuote('');
      setNewRating('5');
      setNewImageFile(null);
      e.target.reset(); // Clear file input
      fetchTestimonials();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create testimonial.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Render ---
  return (
    <div className="p-4">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">
        Testimonial Management
      </h1>

      {/* --- Create New Testimonial Form --- */}
      <div className="mb-12 rounded border border-gray-200 bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-semibold">Add New Testimonial</h2>
        <form onSubmit={createHandler}>
          {/* Grid for Name, Title, Rating */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label htmlFor="name" className="mb-2 block font-medium">
                Client Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full rounded border border-gray-300 p-2"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="title" className="mb-2 block font-medium">
                Client Title
              </label>
              <input
                type="text"
                id="title"
                placeholder="e.g., Commercial Project"
                className="w-full rounded border border-gray-300 p-2"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="rating" className="mb-2 block font-medium">
                Rating (1-5)
              </label>
              <input
                type="number"
                id="rating"
                min="1"
                max="5"
                step="0.5"
                className="w-full rounded border border-gray-300 p-2"
                value={newRating}
                onChange={(e) => setNewRating(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Quote */}
          <div className="mt-4">
            <label htmlFor="quote" className="mb-2 block font-medium">
              Quote
            </label>
            <textarea
              id="quote"
              rows="4"
              className="w-full rounded border border-gray-300 p-2"
              value={newQuote}
              onChange={(e) => setNewQuote(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Image Upload */}
          <div className="mt-4">
            <label htmlFor="imageFile" className="mb-2 block font-medium">
              Client Image (Optional)
            </label>
            <input
              type="file"
              id="imageFile"
              className="w-full rounded border border-gray-300 p-2 file:mr-4 file:rounded file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:font-medium hover:file:bg-gray-200"
              onChange={handleFileChange}
            />
          </div>

          {error && <div className="mt-4 rounded bg-red-100 p-3 text-red-700">{error}</div>}
          <Button type="submit" disabled={isSubmitting} className="mt-4">
            {isSubmitting ? 'Adding...' : 'Add Testimonial'}
          </Button>
        </form>
      </div>

      {/* --- Existing Testimonials Table --- */}
      <h2 className="mb-4 text-2xl font-semibold">Existing Testimonials</h2>
      {loading && <p>Loading testimonials...</p>}

      {!loading && !error && (
        <div className="overflow-x-auto rounded border border-gray-200 bg-white shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Quote
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {testimonials.map((item) => (
                <tr key={item._id}>
                  <td className="px-6 py-4">
                    {item.image ? (
                      <img
                        src={item.image.url}
                        alt={item.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-xs text-gray-500">No Image</span>
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-[#D1B68A]">
                    {item.rating} ★
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {item.quote.substring(0, 50)}...
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => deleteHandler(item._id)}
                      className="font-medium text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                    {/* We can add an 'Edit' link here later */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TestimonialManagement;