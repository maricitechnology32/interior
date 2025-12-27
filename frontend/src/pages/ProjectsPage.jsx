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
    <div className="min-h-screen bg-surface-secondary">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
            alt="Our Projects"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/80"></div>
        </div>

        <div className="relative z-10 text-center px-6">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-secondary">
            Portfolio
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 shadow-sm">
            Our Projects
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-200 font-light">
            Explore our portfolio of exceptional designs and craftsmanship
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 px-6 bg-white border-b border-gray-100 shadow-sm sticky top-[72px] z-40">
        <div className="container-custom">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="text-sm font-bold text-text-muted mr-4 uppercase tracking-wider">Filter:</span>
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 text-sm font-bold rounded-full transition-all duration-300 border
                  ${selectedCategory === category
                    ? 'bg-secondary text-primary border-secondary shadow-md'
                    : 'bg-transparent text-text-secondary border-gray-200 hover:border-secondary hover:text-secondary'
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
        <div className="container-custom">
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-secondary" />
              <p className="mt-4 text-text-muted font-medium">Loading projects...</p>
            </div>
          )}

          {error && (
            <div className="max-w-md mx-auto text-center py-20">
              <AlertCircle className="h-12 w-12 text-status-error mx-auto mb-4" />
              <h3 className="text-xl font-serif font-bold text-primary mb-2">Something went wrong</h3>
              <p className="text-text-secondary mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="btn btn-primary"
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && projects.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-2xl font-serif font-bold text-primary mb-2">No projects found</h3>
              <p className="text-text-secondary mb-6">Try selecting a different category.</p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="btn btn-primary"
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
                  className="group block bg-white rounded-card overflow-hidden shadow-sm hover:shadow-card-hover transition-all duration-300 border border-gray-100"
                >
                  {project.imageUrls && project.imageUrls.length > 0 && (
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img
                        src={project.imageUrls[0].url}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Badge */}
                      <span className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1 text-xs font-bold text-primary uppercase tracking-wider rounded-sm shadow-sm">
                        {project.category}
                      </span>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-serif font-bold text-primary mb-3 group-hover:text-secondary transition-colors">{project.title}</h3>
                    <p className="text-text-secondary mb-4 line-clamp-2 text-sm leading-relaxed">{project.description}</p>
                    <span className="inline-flex items-center gap-2 text-secondary font-bold text-sm uppercase tracking-wider group/link">
                      View Project
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
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
        <section className="py-20 px-6 bg-primary text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Have a project in mind?
            </h2>
            <p className="text-gray-300 mb-8 text-lg font-light">
              Let's bring your vision to life. Get in touch with us today.
            </p>
            <Link
              to="/contact"
              className="btn btn-secondary text-primary hover:bg-white hover:text-primary border-none shadow-lg shadow-black/20"
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