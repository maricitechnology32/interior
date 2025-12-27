import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/apiSlice';
import { ArrowLeft, Calendar, Clock, Share2, Loader2 } from 'lucide-react';

const SingleBlogPage = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await api.get(`/blogs/${id}`);
        setBlog(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load blog post.');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const calculateReadTime = (blog) => {
    let totalWords = 0;
    // Count words from sections
    if (blog.sections?.length) {
      blog.sections.forEach((section) => {
        if (section.type === 'text' && section.content) {
          totalWords += section.content.split(/\s+/).length;
        }
      });
    }
    // Fallback to legacy content
    if (blog.content) {
      totalWords += blog.content.split(/\s+/).length;
    }
    return Math.max(1, Math.ceil(totalWords / 200));
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: blog.title, url: window.location.href });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-secondary">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-secondary" />
          <p className="mt-4 text-lg font-medium text-text-muted">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-secondary p-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white p-8 shadow-lg rounded-card">
            <h2 className="mb-2 text-2xl font-serif font-bold text-primary">Article Not Found</h2>
            <p className="mb-6 text-text-secondary">{error}</p>
            <Link to="/blog" className="btn btn-primary">
              <ArrowLeft className="h-5 w-5" /> Back to all posts
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) return null;

  const readTime = calculateReadTime(blog);
  const hasSections = blog.sections && blog.sections.length > 0;

  return (
    <div className="min-h-screen bg-surface-secondary">
      {/* Hero Image */}
      {blog.image?.url && (
        <div className="relative h-[50vh] min-h-[400px]">
          <img src={blog.image.url} alt={blog.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-primary/60"></div>
          <div className="absolute inset-0 flex items-end">
            <div className="container-custom pb-12 w-full">
              <Link to="/blog" className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-6 group">
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to all posts
              </Link>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 shadow-sm">{blog.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 font-medium">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{readTime} min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* No Image Header */}
      {!blog.image?.url && (
        <div className="bg-primary py-20 px-6">
          <div className="container-custom">
            <Link to="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to all posts
            </Link>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">{blog.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 font-medium">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <article className="container-custom py-16">
        <div className="bg-white p-8 md:p-12 rounded-card shadow-sm border border-gray-100">
          {/* Share Button */}
          <div className="flex justify-end mb-8">
            <button onClick={handleShare} className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-text-secondary hover:bg-surface-secondary hover:border-secondary transition-colors rounded-full text-sm font-medium">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </button>
          </div>

          {/* Render Sections */}
          {hasSections ? (
            <div className="space-y-8">
              {blog.sections.map((section, index) => (
                <div key={index}>
                  {section.type === 'text' && section.content && (
                    <div className="prose prose-lg max-w-none text-text-secondary">
                      {section.content.split('\n').map((paragraph, pIndex) => (
                        paragraph.trim() && (
                          <p key={pIndex} className="mb-4 leading-relaxed font-light text-lg">
                            {paragraph}
                          </p>
                        )
                      ))}
                    </div>
                  )}
                  {section.type === 'image' && section.image?.url && (
                    <figure className="my-8">
                      <img
                        src={section.image.url}
                        alt={section.caption || 'Blog image'}
                        className="w-full rounded-card shadow-md"
                      />
                      {section.caption && (
                        <figcaption className="mt-3 text-center text-sm text-text-muted italic">
                          {section.caption}
                        </figcaption>
                      )}
                    </figure>
                  )}
                </div>
              ))}
            </div>
          ) : (
            // Legacy content fallback
            <div className="prose prose-lg max-w-none text-text-secondary">
              {blog.content?.split('\n').map((paragraph, index) => (
                paragraph.trim() && (
                  <p key={index} className="mb-6 leading-relaxed font-light text-lg">
                    {paragraph}
                  </p>
                )
              ))}
            </div>
          )}

          {/* Footer CTA */}
          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <p className="mb-4 text-xl font-serif font-bold text-primary">Enjoyed this article?</p>
            <Link to="/blog" className="btn btn-primary">
              Explore more posts
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default SingleBlogPage;