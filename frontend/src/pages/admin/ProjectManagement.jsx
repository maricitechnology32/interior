import React, { useState, useEffect } from 'react';
import api from '../../api/apiSlice';
import Button from '../../components/ui/Button';
import { Link } from 'react-router-dom';

const CATEGORIES = ['Residential', 'Commercial', 'Hospitality'];

const ProjectManagement = () => {
  // --- State ---
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for the "Create New" form
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCategory, setNewCategory] = useState(CATEGORIES[0]);
  const [newImageFiles, setNewImageFiles] = useState(null); // Will hold a FileList
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Data Fetching ---
  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.get('/projects');
      setProjects(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch projects.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // --- Handlers ---

  // Handle Deletion
  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await api.delete(`/projects/${id}`);
        // Refresh the project list
        fetchProjects();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete project.');
      }
    }
  };

  // Handle File Selection
  const handleFileChange = (e) => {
    setNewImageFiles(e.target.files); // Get the entire FileList
  };

  // Handle Creation
  const createHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // 1. We must use FormData for file uploads
    const formData = new FormData();
    formData.append('title', newTitle);
    formData.append('description', newDescription);
    formData.append('category', newCategory);

    // 2. Append all selected files
    if (newImageFiles && newImageFiles.length > 0) {
      for (let i = 0; i < newImageFiles.length; i++) {
        // 'images' must match the key in our 'handleUploads' middleware
        formData.append('images', newImageFiles[i]);
      }
    } else {
      setError('Please select at least one image.');
      setIsSubmitting(false);
      return;
    }

    try {
      // 3. Post the FormData
      await api.post('/projects', formData);

      // 4. Clear the form and refresh the list
      setNewTitle('');
      setNewDescription('');
      setNewCategory(CATEGORIES[0]);
      setNewImageFiles(null);
      e.target.reset(); // Clear the file input
      fetchProjects();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create project.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Render ---
  return (
    <div className="p-4">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">
        Project Management
      </h1>

      {/* --- Create New Project Form --- */}
      <div className="mb-12 rounded border border-gray-200 bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-semibold">Create New Project</h2>
        <form onSubmit={createHandler}>
          {/* Title */}
          <div className="mb-4">
            <label htmlFor="title" className="mb-2 block font-medium">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full rounded border border-gray-300 p-2"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
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
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
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
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Image Files */}
          <div className="mb-4">
            <label htmlFor="images" className="mb-2 block font-medium">
              Project Images (Select one or more)
            </label>
            <input
              type="file"
              id="images"
              className="w-full rounded border border-gray-300 p-2 file:mr-4 file:rounded file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:font-medium hover:file:bg-gray-200"
              onChange={handleFileChange}
              multiple // <-- This allows selecting multiple files
              required
            />
          </div>

          {/* Error message for form */}
          {error && (
            <div className="mb-4 rounded bg-red-100 p-3 text-center text-red-700">
              {error}
            </div>
          )}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating Project...' : 'Create Project'}
          </Button>
        </form>
      </div>

      {/* --- Existing Projects Table --- */}
      <h2 className="mb-4 text-2xl font-semibold">Existing Projects</h2>
      {loading && <p>Loading projects...</p>}

      {!loading && !error && (
        <div className="overflow-x-auto rounded border border-gray-200 bg-white shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Category
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {projects.map((project) => (
                <tr key={project._id}>
                  <td className="px-6 py-4">
                    {project.imageUrls && project.imageUrls.length > 0 ? (
                      <img
                        src={project.imageUrls[0].url} // Show first image as thumbnail
                        alt={project.title}
                        className="h-10 w-16 rounded object-cover"
                      />
                    ) : (
                      <span className="text-xs text-gray-500">No Image</span>
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {project.title}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {project.category}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/admin/projects/${project._id}/edit`}
                      className="mr-4 font-medium text-[#D1B68A] hover:text-[#b58e5a]"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteHandler(project._id)}
                      className="font-medium text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
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

export default ProjectManagement;