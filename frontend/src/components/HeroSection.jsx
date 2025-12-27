import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../api/apiSlice';

const HeroSection = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await api.get('/settings');
        setSettings(data);
      } catch (err) {
        console.error('Failed to load hero settings:', err);
        // Use defaults on error
        setSettings({
          heroImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000',
          heroTagline: 'Interior Design Studio',
          heroHeading: 'The Space Stylers',
          heroSubheading: 'We create personalized, functional, and stylish interiors that reflect your unique vision.',
          heroCta1Text: 'Get Free Consultation',
          heroCta2Text: 'View Our Work',
          heroStats: [
            { value: '500+', label: 'Projects Completed' },
            { value: '15+', label: 'Years Experience' },
            { value: '50+', label: 'Design Awards' },
          ],
        });
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const scrollToInquiry = (e) => {
    e.preventDefault();
    document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="relative flex h-screen min-h-[700px] items-center justify-center overflow-hidden bg-[#182527]">
        <div className="relative z-10 max-w-6xl px-6 lg:px-8 animate-pulse">
          <div className="max-w-4xl">
            <div className="h-4 w-32 bg-gray-600 rounded mb-6"></div>
            <div className="h-16 w-96 bg-gray-600 rounded mb-4"></div>
            <div className="h-16 w-64 bg-gray-600 rounded mb-8"></div>
            <div className="h-6 w-full max-w-xl bg-gray-600 rounded mb-12"></div>
            <div className="flex gap-4">
              <div className="h-14 w-48 bg-gray-600 rounded"></div>
              <div className="h-14 w-48 bg-gray-600 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Split heading for two-line display
  const headingParts = settings?.heroHeading?.split(' ') || ['The Space', 'Stylers'];
  const firstPart = headingParts.slice(0, -1).join(' ') || headingParts[0];
  const lastPart = headingParts[headingParts.length - 1];

  return (
    <div className="relative flex h-screen min-h-[700px] items-center justify-center overflow-hidden">
      {/* Background Image - Dynamic */}
      <div className="absolute inset-0">
        <img
          src={settings?.heroImage?.url || settings?.heroImage}
          alt="Modern interior design"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Simple Dark Overlay */}
      <div className="absolute inset-0 bg-primary/80"></div>

      {/* Hero Content - Bold Typography */}
      <div className="relative z-10 max-w-6xl px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* Small Tagline - Dynamic */}
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-secondary">
            {settings?.heroTagline}
          </p>

          {/* Main Heading - Dynamic */}
          <h1 className="mb-8 text-5xl font-serif font-bold leading-[1.1] text-white md:text-6xl lg:text-7xl xl:text-8xl shadow-sm">
            {firstPart}
            <br />
            <span className="text-secondary">{lastPart}</span>
          </h1>

          {/* Subheading - Dynamic */}
          <p className="mb-12 max-w-xl text-lg leading-relaxed text-gray-200 md:text-xl font-light">
            {settings?.heroSubheading}
          </p>

          {/* CTA Buttons - Dynamic Text */}
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
            <a
              href="#inquiry-form"
              onClick={scrollToInquiry}
              className="btn btn-primary px-8 py-4 text-base h-auto"
            >
              {settings?.heroCta1Text}
              <ArrowRight className="h-5 w-5" />
            </a>

            <Link
              to="/projects"
              className="btn btn-outline border-white/30 text-white hover:bg-white/10 hover:border-white px-8 py-4 text-base h-auto"
            >
              {settings?.heroCta2Text}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          {/* Simple Stats Row - Dynamic */}
          {settings?.heroStats && settings.heroStats.length > 0 && (
            <div className="mt-16 flex flex-wrap gap-12 border-t border-white/20 pt-8">
              {settings.heroStats.map((stat, index) => (
                <div key={index}>
                  <p className="text-3xl font-bold text-white font-serif">{stat.value}</p>
                  <p className="mt-1 text-sm text-gray-400 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;