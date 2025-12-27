import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import api from '../api/apiSlice';

// Helper to extract excerpt from blog
const getExcerpt = (blog, maxLength = 150) => {
  // Try sections first
  if (blog.sections && blog.sections.length > 0) {
    const textSections = blog.sections.filter((s) => s.type === 'text' && s.content);
    if (textSections.length > 0) {
      const text = textSections[0].content;
      return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }
  }
  // Fallback to legacy content
  if (blog.content) {
    return blog.content.length > maxLength ? blog.content.substring(0, maxLength) + '...' : blog.content;
  }
  return 'Click to read more...';
};

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await api.get('/blogs');
        setBlogs(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load blog posts.');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-surface-secondary">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2070&auto=format&fit=crop"
            alt="Our Blog"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/80"></div>
        </div>

        <div className="relative z-10 text-center px-6">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-secondary">
            Insights & Inspiration
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6">
            Our Blog
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-200 font-light">
            Design trends, stories, and creative insights
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24 px-6">
        <div className="container-custom">
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-secondary" />
              <p className="mt-4 text-text-muted font-medium">Loading articles...</p>
            </div>
          )}

          {error && (
            <div className="max-w-md mx-auto text-center py-20">
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

          {!loading && !error && blogs.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-3xl font-serif font-bold text-primary mb-4">Coming Soon</h3>
              <p className="text-text-secondary mb-8">Check back soon for new articles and industry insights.</p>
              <Link to="/" className="btn btn-primary">Return Home</Link>
            </div>
          )}

          {!loading && !error && blogs.length > 0 && (
            <>
              <div className="text-center mb-12">
                <p className="text-text-secondary font-medium tracking-wide">{blogs.length} {blogs.length === 1 ? 'Article' : 'Articles'}</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                  <Link
                    key={blog._id}
                    to={`/blog/${blog._id}`}
                    className="group block bg-white rounded-card overflow-hidden shadow-sm hover:shadow-card-hover transition-all duration-300 border border-gray-100"
                  >
                    <div className="aspect-[16/10] overflow-hidden relative">
                      {blog.image && blog.image.url ? (
                        <>
                          <img
                            src={blog.image.url}
                            alt={blog.title}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </>
                      ) : (
                        <div className="h-full w-full bg-primary flex items-center justify-center group-hover:bg-primary/90 transition-colors">
                          <span className="text-secondary text-4xl font-serif font-bold">TSS</span>
                        </div>
                      )}
                    </div>
                    <div className="p-8">
                      <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                        {new Date(blog.createdAt).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                      <h3 className="text-xl font-serif font-bold text-primary mb-3 line-clamp-2 group-hover:text-secondary transition-colors">{blog.title}</h3>
                      <p className="text-text-secondary mb-6 line-clamp-3 text-sm leading-relaxed">{getExcerpt(blog)}</p>
                      <span className="inline-flex items-center gap-2 text-secondary font-bold text-sm uppercase tracking-wider group/link">
                        Read More
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;