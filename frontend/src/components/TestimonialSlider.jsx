import { useState, useEffect } from 'react';
import api from '../api/apiSlice';
import StarRating from './ui/StarRating';
import { Loader2, Quote } from 'lucide-react';

const TestimonialSlider = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await api.get('/testimonials');
        setTestimonials(data);
      } catch (err) {
        console.error('Failed to load testimonials:', err);
        setError('Could not load testimonials.');
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <div className="bg-surface py-20">
        <div className="flex flex-col items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-secondary" />
          <p className="mt-4 text-lg font-medium text-text-muted">Loading testimonials...</p>
        </div>
      </div>
    );
  }

  if (error || testimonials.length === 0) return null;

  return (
    <section className="py-20 px-6 bg-surface">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-secondary mb-4">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            What Our Clients Say
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto font-light">
            Discover why our clients trust us and love working with our team
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div key={item._id} className="bg-surface-secondary p-8 relative rounded-card shadow-sm border border-gray-100 hover:shadow-card-hover transition-all duration-300">
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8 w-10 h-10 bg-secondary flex items-center justify-center rounded-full shadow-md">
                <Quote className="h-5 w-5 text-primary" />
              </div>

              {/* Star Rating */}
              <div className="mb-6 pt-4">
                <StarRating rating={item.rating} />
              </div>

              {/* Quote */}
              <p className="text-text-secondary leading-relaxed mb-8 italic">
                "{item.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                {item.image ? (
                  <img
                    src={item.image.url}
                    alt={item.name}
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-secondary/20"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center ring-2 ring-secondary/20">
                    <span className="text-secondary font-bold text-lg">
                      {item.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-bold text-primary font-serif">{item.name}</p>
                  <p className="text-sm text-secondary font-medium">{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;