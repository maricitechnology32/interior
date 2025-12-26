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
    <div className="min-h-screen bg-[#F5F4F0]">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2070&auto=format&fit=crop"
            alt="Our Blog"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[#182527]/80"></div>
        </div>

        <div className="relative z-10 text-center px-6">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[#D1B68A]">
            Insights & Inspiration
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Our Blog
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            Design trends, stories, and creative insights
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-[#D1B68A]" />
              <p className="mt-4 text-gray-600">Loading articles...</p>
            </div>
          )}

          {error && (
            <div className="max-w-md mx-auto text-center py-20">
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

          {!loading && !error && blogs.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-3xl font-bold text-[#182527] mb-4">Coming Soon</h3>
              <p className="text-gray-600">Check back soon for new articles and industry insights.</p>
            </div>
          )}

          {!loading && !error && blogs.length > 0 && (
            <>
              <div className="text-center mb-12">
                <p className="text-gray-600">{blogs.length} {blogs.length === 1 ? 'Article' : 'Articles'}</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                  <Link
                    key={blog._id}
                    to={`/blog/${blog._id}`}
                    className="group block bg-white overflow-hidden transition-shadow duration-300 hover:shadow-xl"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      {blog.image && blog.image.url ? (
                        <img
                          src={blog.image.url}
                          alt={blog.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="h-full w-full bg-[#182527] flex items-center justify-center">
                          <span className="text-[#D1B68A] text-4xl font-bold">TSS</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <p className="text-sm text-gray-500 mb-2">
                        {new Date(blog.createdAt).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                      <h3 className="text-xl font-bold text-[#182527] mb-3 line-clamp-2">{blog.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{getExcerpt(blog)}</p>
                      <span className="inline-flex items-center gap-2 text-[#D1B68A] font-medium">
                        Read More
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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