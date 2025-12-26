import { ArrowLeft, ImageIcon, Loader2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api/apiSlice';

const SingleProjectPage = () => {
  const [project, setProject] = useState(null);
  const [similarProjects, setSimilarProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1. Fetch current project
        const { data: currentProject } = await api.get(`/projects/${id}`);
        setProject(currentProject);

        // 2. Fetch similar projects (same category, exclude current)
        if (currentProject?.category) {
          const { data: allProjects } = await api.get(`/projects?category=${currentProject.category}`);
          const filtered = allProjects
            .filter(p => p._id !== id)
            .slice(0, 3);
          setSimilarProjects(filtered);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load project.');
      } finally {
        setLoading(false);
      }
    };
    fetchProjectData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F4F0]">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-[#D1B68A]" />
          <p className="mt-4 text-lg font-medium text-gray-700">Loading project...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F4F0] p-4">
        <div className="w-full max-w-md text-center">
          <div className="mb-6 bg-white p-8 shadow-lg">
            <h2 className="mb-2 text-xl font-bold text-gray-900">Something went wrong</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 bg-[#D1B68A] px-6 py-3 font-medium text-[#182527]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all projects
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="min-h-screen bg-[#F5F4F0]">
      {/* Hero Header */}
      <div className="bg-[#182527] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to projects
          </Link>
          <span className="inline-block mb-4 text-sm font-medium uppercase tracking-wide text-[#D1B68A]">
            {project.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white max-w-4xl leading-tight">
            {project.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Description */}
        <div className="bg-white p-8 md:p-12 mb-12 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-white/50">
          <div className="prose prose-lg max-w-none text-gray-600">
            {project.description.split('\n').map((paragraph, index) => (
              paragraph.trim() && (
                <p key={index} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              )
            ))}
          </div>
        </div>

        {/* Gallery */}
        {project.imageUrls && project.imageUrls.length > 0 && (
          <div className="mb-24">
            <div className="flex items-center gap-3 mb-8">
              <ImageIcon className="h-6 w-6 text-[#D1B68A]" />
              <h2 className="text-2xl font-serif font-bold text-[#182527]">Project Gallery</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.imageUrls.map((image, index) => (
                <div
                  key={image.public_id}
                  className="group cursor-pointer overflow-hidden bg-white shadow-sm border border-gray-100"
                  onClick={() => setSelectedImage(image.url)}
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={image.url}
                      alt={`${project.title} - Image ${index + 1}`}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Similar Projects */}
        {similarProjects.length > 0 && (
          <div className="border-t border-gray-200 py-16">
            <h3 className="text-2xl font-serif font-bold text-[#182527] mb-8">You May Also Like</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {similarProjects.map((similar) => (
                <Link
                  key={similar._id}
                  to={`/projects/${similar._id}`}
                  className="group block bg-white shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
                    {similar.imageUrls?.[0] ? (
                      <img
                        src={similar.imageUrls[0].url}
                        alt={similar.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <ImageIcon className="w-8 h-8" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-bold text-[#D1B68A] uppercase tracking-wider mb-2">{similar.category}</p>
                    <h4 className="text-lg font-serif font-bold text-[#182527] group-hover:text-[#D1B68A] transition-colors line-clamp-2">
                      {similar.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#182527]/95 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute right-6 top-6 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-8 w-8" />
          </button>
          <img
            src={selectedImage}
            alt={project.title}
            className="max-h-[90vh] max-w-full object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default SingleProjectPage;