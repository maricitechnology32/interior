import { ArrowRight, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/apiSlice';

const ProjectsPreview = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/projects');
        setProjects(data.slice(0, 4));
      } catch (err) {
        console.error('Failed to load projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="bg-surface py-20">
        <div className="flex flex-col items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-secondary" />
          <p className="mt-4 text-lg font-medium text-text-muted">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (projects.length === 0) return null;

  return (
    <section className="py-20 px-6 bg-surface">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-secondary mb-4">
            Featured Work
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            Our Creative Projects
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto font-light leading-relaxed">
            Explore our portfolio of completed work showcasing innovative design solutions across diverse spaces.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project._id} className="group bg-surface-secondary rounded-card overflow-hidden border border-gray-100 shadow-sm hover:shadow-card-hover transition-all duration-300">
              {/* Image */}
              {project.imageUrls && project.imageUrls.length > 0 && (
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={project.imageUrls[0].url}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Category Badge */}
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary shadow-sm rounded-sm">
                    {project.category}
                  </span>

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-primary mb-3 line-clamp-2">
                  {project.title}
                </h3>
                <Link
                  to={`/projects/${project._id}`}
                  className="inline-flex items-center gap-2 font-medium text-secondary hover:text-primary transition-colors group/link"
                >
                  View Details
                  <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            to="/projects"
            className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-white"
          >
            View All Projects
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsPreview;