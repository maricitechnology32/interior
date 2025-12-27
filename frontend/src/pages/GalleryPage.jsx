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
    <div className="min-h-screen bg-surface-secondary">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop"
            alt="Gallery"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/80"></div>
        </div>

        <div className="relative z-10 text-center px-6">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-secondary">
            Visual Portfolio
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6">
            Gallery
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-200 font-light">
            A curated collection of our finest design work
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24 px-6">
        <div className="container-custom">
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-secondary" />
              <p className="mt-4 text-text-muted font-medium">Loading gallery...</p>
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

          {!loading && !error && images.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-3xl font-serif font-bold text-primary mb-4">Gallery Coming Soon</h3>
              <p className="text-text-secondary mb-8">We're curating an exceptional collection. Check back soon!</p>
              <Link to="/contact" className="btn btn-primary">Start Your Project</Link>
            </div>
          )}

          {!loading && !error && images.length > 0 && (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
              {images.map((item) => (
                <div
                  key={item._id}
                  className="break-inside-avoid cursor-pointer group"
                  onClick={() => openModal(item)}
                >
                  <div className="relative overflow-hidden bg-white rounded-card shadow-sm hover:shadow-card-hover transition-all duration-300">
                    <img
                      src={item.image.url}
                      alt={item.caption || 'Gallery image'}
                      className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      {item.caption && <p className="text-white font-medium font-serif italic border-l-2 border-secondary pl-3">{item.caption}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      {!loading && !error && images.length > 0 && (
        <section className="py-24 px-6 bg-primary text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Inspired by Our Work?
            </h2>
            <p className="text-lg text-gray-300 mb-10 font-light max-w-2xl mx-auto">
              Let's collaborate to create something extraordinary for your space.
            </p>
            <Link
              to="/contact"
              className="btn btn-secondary text-primary hover:bg-white hover:text-primary border-none shadow-lg shadow-black/20"
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-primary/95 p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <button
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors z-50"
            onClick={closeModal}
          >
            <X className="h-8 w-8" />
          </button>
          <div className="max-w-6xl max-h-[90vh] w-full h-full flex flex-col items-center justify-center relative p-4">
            <img
              src={selectedImage.image.url}
              alt={selectedImage.caption || 'Gallery image'}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            {selectedImage.caption && (
              <div className="mt-4 bg-black/50 backdrop-blur-md px-6 py-3 rounded-full">
                <p className="text-white text-center font-light">{selectedImage.caption}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;