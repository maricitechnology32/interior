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
      <div className="bg-[#F5F4F0] py-16">
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-12 w-12 animate-spin text-[#D1B68A]" />
          <p className="mt-4 text-lg font-medium text-gray-700">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (projects.length === 0) return null;

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#D1B68A] mb-4">
            Featured Work
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#182527] mb-4">
            Our Creative Projects
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our portfolio of completed work showcasing innovative design solutions across diverse spaces.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project._id} className="group bg-[#F5F4F0] overflow-hidden">
              {/* Image */}
              {project.imageUrls && project.imageUrls.length > 0 && (
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={project.imageUrls[0].url}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Category Badge */}
                  <span className="absolute top-4 left-4 bg-white px-3 py-1 text-xs font-medium text-[#182527]">
                    {project.category}
                  </span>
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#182527] mb-3 line-clamp-2">
                  {project.title}
                </h3>
                <Link
                  to={`/projects/${project._id}`}
                  className="inline-flex items-center gap-2 font-medium text-[#D1B68A] hover:text-[#b58e5a] transition-colors"
                >
                  View Details
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 border-2 border-[#182527] px-8 py-4 font-semibold text-[#182527] hover:bg-[#182527] hover:text-white transition-colors"
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