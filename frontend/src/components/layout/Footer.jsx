import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import api from '../../api/apiSlice';

// Scroll to top function
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const defaultSettings = {
  phone: '+977 9851336903',
  email: 'contact@thespacestylers.com',
  address: 'Shankhamul, New Baneshwor, Kathmandu',
  footerTagline: 'Creating personalized, functional, and stylish interiors that reflect your unique vision and transform spaces into experiences.',
  copyrightText: 'The Space Stylers',
  developerName: 'Marici Technology',
  developerUrl: 'https://maricitechnology.com',
  socialLinks: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com',
  },
};

const Footer = () => {
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await api.get('/contact-settings');
        setSettings(data);
      } catch (err) {
        console.error('Failed to load footer settings:', err);
      }
    };
    fetchSettings();
  }, []);

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/services', label: 'Services' },
    { path: '/projects', label: 'Projects' },
    { path: '/blog', label: 'Blog' },
    { path: '/gallery', label: 'Gallery' },
  ];

  const serviceLinks = [
    { path: '/projects?category=Residential', label: 'Residential Design' },
    { path: '/projects?category=Commercial', label: 'Commercial Design' },
    { path: '/projects?category=Hospitality', label: 'Hospitality Design' },
    { path: '/contact', label: 'Contact Us' },
  ];

  return (
    <footer className="bg-[#182527] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div>
            <Link to="/" onClick={scrollToTop} className="inline-block mb-6">
              <span className="text-2xl font-bold text-[#D1B68A]">
                {settings.copyrightText}
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed mb-6">
              {settings.footerTagline}
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {settings.socialLinks?.facebook && (
                <a
                  href={settings.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-[#D1B68A] hover:text-[#182527] transition-colors"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
              )}
              {settings.socialLinks?.instagram && (
                <a
                  href={settings.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-[#D1B68A] hover:text-[#182527] transition-colors"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.148 3.227-1.669 4.771-4.919 4.919-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-3.227-.148-4.771-1.669-4.919-4.919-.058-1.265-.07-1.646-.07-4.85s.012-3.584.07-4.85c.148-3.227 1.669-4.771 4.919-4.919 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.059 1.689.073 4.948.073s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" />
                  </svg>
                </a>
              )}
              {settings.socialLinks?.linkedin && (
                <a
                  href={settings.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-[#D1B68A] hover:text-[#182527] transition-colors"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.98v16h4.98v-8.396c0-2.002.396-3.998 2.982-3.998 2.584 0 2.584 2.336 2.584 4.001v8.393h4.98v-8.73c0-4.66-1.042-8.27-6.48-8.27-2.95 0-4.502 1.637-5.26 3.003v-2.503z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={scrollToTop}
                    className="text-gray-400 hover:text-[#D1B68A] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={scrollToTop}
                    className="text-gray-400 hover:text-[#D1B68A] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#D1B68A]" />
                <span className="text-gray-400">{settings.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#D1B68A]" />
                <span className="text-gray-400">{settings.email}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#D1B68A] mt-0.5" />
                <span className="text-gray-400">{settings.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} {settings.copyrightText}. All Rights Reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <Link
                to="/privacy-policy"
                onClick={scrollToTop}
                className="hover:text-[#D1B68A] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-of-service"
                onClick={scrollToTop}
                className="hover:text-[#D1B68A] transition-colors"
              >
                Terms of Service
              </Link>
              {settings.developerName && (
                <span>
                  Developed by{' '}
                  <a
                    href={settings.developerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D1B68A] hover:text-white transition-colors"
                  >
                    {settings.developerName}
                  </a>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;