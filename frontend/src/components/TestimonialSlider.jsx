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
      <div className="bg-white py-16">
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-12 w-12 animate-spin text-[#D1B68A]" />
          <p className="mt-4 text-lg font-medium text-gray-700">Loading testimonials...</p>
        </div>
      </div>
    );
  }

  if (error || testimonials.length === 0) return null;

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#D1B68A] mb-4">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#182527] mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover why our clients trust us and love working with our team
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div key={item._id} className="bg-[#F5F4F0] p-8 relative">
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8 w-10 h-10 bg-[#D1B68A] flex items-center justify-center">
                <Quote className="h-5 w-5 text-[#182527]" />
              </div>

              {/* Star Rating */}
              <div className="mb-6 pt-4">
                <StarRating rating={item.rating} />
              </div>

              {/* Quote */}
              <p className="text-gray-700 leading-relaxed mb-8">
                "{item.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                {item.image ? (
                  <img
                    src={item.image.url}
                    alt={item.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-[#D1B68A]/20 flex items-center justify-center">
                    <span className="text-[#D1B68A] font-bold text-lg">
                      {item.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-bold text-[#182527]">{item.name}</p>
                  <p className="text-sm text-[#D1B68A]">{item.title}</p>
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