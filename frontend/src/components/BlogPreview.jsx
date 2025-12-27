import { ArrowRight, Calendar, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/apiSlice';

// Helper to extract excerpt from blog
const getExcerpt = (blog, maxLength = 120) => {
  if (blog.sections && blog.sections.length > 0) {
    const textSection = blog.sections.find((s) => s.type === 'text' && s.content);
    if (textSection) {
      const text = textSection.content;
      return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }
  }
  if (blog.content) {
    return blog.content.length > maxLength ? blog.content.substring(0, maxLength) + '...' : blog.content;
  }
  return 'Click to read more...';
};

const BlogPreview = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/blogs');
        setBlogs(data.slice(0, 3));
      } catch (err) {
        console.error('Failed to load blog posts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="bg-surface-secondary py-20">
        <div className="flex flex-col items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-secondary" />
          <p className="mt-4 text-lg font-medium text-text-muted">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  if (blogs.length === 0) return null;

  return (
    <section className="py-20 px-6 bg-surface-secondary">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-secondary mb-4">
            From Our Blog
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            Latest Design Insights
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto font-light leading-relaxed">
            Stay updated with the latest interior design trends, tips, and inspiration from our experts.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article key={blog._id} className="group bg-white rounded-card overflow-hidden shadow-sm hover:shadow-card-hover transition-all duration-300">
              {/* Image */}
              {blog.image && (
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={blog.image.url}
                    alt={blog.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                {/* Date */}
                <div className="flex items-center gap-2 text-xs font-bold text-text-muted uppercase tracking-wider mb-3">
                  <Calendar className="h-3 w-3" />
                  <span>
                    {new Date(blog.createdAt || Date.now()).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-serif font-bold text-primary mb-3 line-clamp-2 group-hover:text-secondary transition-colors">
                  {blog.title}
                </h3>

                {/* Excerpt */}
                <p className="text-text-secondary mb-4 line-clamp-3 text-sm leading-relaxed">
                  {getExcerpt(blog)}
                </p>

                {/* Link */}
                <Link
                  to={`/blog/${blog._id}`}
                  className="inline-flex items-center gap-2 font-medium text-secondary hover:text-primary transition-colors group/link"
                >
                  Read More
                  <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            to="/blog"
            className="btn btn-primary"
          >
            View All Articles
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;