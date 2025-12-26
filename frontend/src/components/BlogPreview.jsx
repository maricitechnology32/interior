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
      <div className="bg-[#F5F4F0] py-16">
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-12 w-12 animate-spin text-[#D1B68A]" />
          <p className="mt-4 text-lg font-medium text-gray-700">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  if (blogs.length === 0) return null;

  return (
    <section className="py-20 px-6 bg-[#F5F4F0]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#D1B68A] mb-4">
            From Our Blog
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#182527] mb-4">
            Latest Design Insights
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest interior design trends, tips, and inspiration from our experts.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article key={blog._id} className="group bg-white overflow-hidden">
              {/* Image */}
              {blog.image && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={blog.image.url}
                    alt={blog.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(blog.createdAt || Date.now()).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#182527] mb-3 line-clamp-2">
                  {blog.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {getExcerpt(blog)}
                </p>

                {/* Link */}
                <Link
                  to={`/blog/${blog._id}`}
                  className="inline-flex items-center gap-2 font-medium text-[#D1B68A] hover:text-[#b58e5a] transition-colors"
                >
                  Read More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-[#D1B68A] px-8 py-4 font-semibold text-[#182527] hover:bg-[#c4a87d] transition-colors"
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