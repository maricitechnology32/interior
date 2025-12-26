import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, X, ArrowRight } from 'lucide-react';
import api from '../api/apiSlice';

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await api.get('/gallery');
        setImages(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load gallery.');
      } finally {
        setLoading(false);
      }
    };
    fetchGalleryImages();
  }, []);

  const openModal = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <div className="min-h-screen bg-[#F5F4F0]">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop"
            alt="Gallery"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[#182527]/80"></div>
        </div>

        <div className="relative z-10 text-center px-6">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[#D1B68A]">
            Visual Portfolio
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Gallery
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            A curated collection of our finest design work
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-[#D1B68A]" />
              <p className="mt-4 text-gray-600">Loading gallery...</p>
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

          {!loading && !error && images.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-3xl font-bold text-[#182527] mb-4">Gallery Coming Soon</h3>
              <p className="text-gray-600">We're curating an exceptional collection. Check back soon!</p>
            </div>
          )}

          {!loading && !error && images.length > 0 && (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
              {images.map((item) => (
                <div
                  key={item._id}
                  className="mb-4 break-inside-avoid cursor-pointer group"
                  onClick={() => openModal(item)}
                >
                  <div className="relative overflow-hidden bg-white">
                    <img
                      src={item.image.url}
                      alt={item.caption || 'Gallery image'}
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {item.caption && (
                      <div className="absolute inset-0 bg-[#182527]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <p className="text-white font-medium">{item.caption}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      {!loading && !error && images.length > 0 && (
        <section className="py-16 px-6 bg-[#182527]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Inspired by Our Work?
            </h2>
            <p className="text-gray-400 mb-8">
              Let's collaborate to create something extraordinary for your space.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-[#D1B68A] px-8 py-4 font-semibold text-[#182527] transition-colors duration-200 hover:bg-[#e0cba8]"
            >
              Start Your Project
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>
      )}

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#182527]/95 p-4"
          onClick={closeModal}
        >
          <button
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            onClick={closeModal}
          >
            <X className="h-8 w-8" />
          </button>
          <div className="max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <img
              src={selectedImage.image.url}
              alt={selectedImage.caption || 'Gallery image'}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          {selectedImage.caption && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-[#182527]/80 px-6 py-3 rounded">
              <p className="text-white text-center">{selectedImage.caption}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GalleryPage;