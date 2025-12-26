import { AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/apiSlice';

const CATEGORIES = ['All', 'Residential', 'Commercial', 'Hospitality'];

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        let url = '/projects';
        if (selectedCategory !== 'All') {
          url += `?category=${selectedCategory}`;
        }
        const { data } = await api.get(url);
        setProjects(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load projects.');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-[#F5F4F0]">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
            alt="Our Projects"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[#182527]/80"></div>
        </div>

        <div className="relative z-10 text-center px-6">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[#D1B68A]">
            Portfolio
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Our Projects
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            Explore our portfolio of exceptional designs and craftsmanship
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 px-6 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="text-sm font-medium text-gray-500 mr-4">Filter:</span>
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 font-medium transition-colors duration-200
                  ${selectedCategory === category
                    ? 'bg-[#D1B68A] text-[#182527]'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-[#D1B68A]" />
              <p className="mt-4 text-gray-600">Loading projects...</p>
            </div>
          )}

          {error && (
            <div className="max-w-md mx-auto text-center py-20">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h3>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-[#D1B68A] text-[#182527] font-medium"
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && projects.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600 mb-6">Try selecting a different category.</p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="px-6 py-2 bg-[#D1B68A] text-[#182527] font-medium"
              >
                Show All
              </button>
            </div>
          )}

          {!loading && !error && projects.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Link
                  key={project._id}
                  to={`/projects/${project._id}`}
                  className="group block bg-white overflow-hidden transition-shadow duration-300 hover:shadow-xl"
                >
                  {project.imageUrls && project.imageUrls.length > 0 && (
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={project.imageUrls[0].url}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <span className="text-sm font-medium text-[#D1B68A] uppercase tracking-wide">
                      {project.category}
                    </span>
                    <h3 className="mt-2 text-xl font-bold text-[#182527] mb-3">{project.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                    <span className="inline-flex items-center gap-2 text-[#D1B68A] font-medium">
                      View Project
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      {!loading && !error && projects.length > 0 && (
        <section className="py-16 px-6 bg-[#182527]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Have a project in mind?
            </h2>
            <p className="text-gray-400 mb-8">
              Let's bring your vision to life. Get in touch with us today.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-[#D1B68A] px-8 py-4 font-semibold text-[#182527] transition-colors duration-200 hover:bg-[#e0cba8]"
            >
              Get Started
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProjectsPage;