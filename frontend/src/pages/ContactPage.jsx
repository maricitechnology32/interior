import { useState, useEffect } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import InquiryForm from '../components/InquiryForm';
import { useAuth } from '../hooks/useAuth';
import api from '../api/apiSlice';

const defaultSettings = {
  heroImage: { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop' },
  heroTagline: 'Get In Touch',
  heroTitle: 'Contact Us',
  heroSubtitle: 'Ready to transform your space? Let\'s start the conversation.',
  phone: '+977 9851336903',
  email: 'contact@thespacestylers.com',
  address: 'Shankhamul, New Baneshwor, Kathmandu',
};

const ContactPage = () => {
  const { isAdmin } = useAuth();
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await api.get('/contact-settings');
        setSettings(data);
      } catch (err) {
        console.error('Failed to load contact settings:', err);
        setSettings(defaultSettings);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F4F0] flex items-center justify-center">
        <div className="animate-pulse text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F4F0]">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={settings.heroImage?.url}
            alt="Contact The Space Stylers"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[#182527]/80"></div>
        </div>

        <div className="relative z-10 text-center px-6">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[#D1B68A]">
            {settings.heroTagline}
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            {settings.heroTitle}
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            {settings.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Contact Info Row */}
      <section className="py-16 px-6 bg-[#182527]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <MapPin className="h-8 w-8 text-[#D1B68A] mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Office Address</h3>
            <p className="text-gray-400">{settings.address}</p>
          </div>
          <div>
            <Phone className="h-8 w-8 text-[#D1B68A] mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Phone</h3>
            <p className="text-gray-400">{settings.phone}</p>
          </div>
          <div>
            <Mail className="h-8 w-8 text-[#D1B68A] mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Email</h3>
            <p className="text-gray-400">{settings.email}</p>
          </div>
        </div>
      </section>

      {/* Inquiry Form Section - Hidden for Admin */}
      {!isAdmin && (
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[#D1B68A]">
                Send Us a Message
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-[#182527] mb-4">
                Let's Start Your Project
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>
            <InquiryForm />
          </div>
        </section>
      )}
    </div>
  );
};

export default ContactPage;