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
    <div className="min-h-screen bg-surface-secondary">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={settings.heroImage?.url}
            alt="Contact The Space Stylers"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/80"></div>
        </div>

        <div className="relative z-10 text-center px-6">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-secondary">
            {settings.heroTagline}
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6">
            {settings.heroTitle}
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-200 font-light">
            {settings.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Contact Info Row */}
      <section className="py-20 px-6 bg-primary text-white border-b border-white/10">
        <div className="container-custom grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          <div className="p-4">
            <MapPin className="h-10 w-10 text-secondary mx-auto mb-6 bg-secondary/10 p-2 rounded-full" />
            <h3 className="text-xl font-serif font-bold text-white mb-2">Office Address</h3>
            <p className="text-gray-300 font-light">{settings.address}</p>
          </div>
          <div className="p-4">
            <Phone className="h-10 w-10 text-secondary mx-auto mb-6 bg-secondary/10 p-2 rounded-full" />
            <h3 className="text-xl font-serif font-bold text-white mb-2">Phone</h3>
            <p className="text-gray-300 font-light">{settings.phone}</p>
          </div>
          <div className="p-4">
            <Mail className="h-10 w-10 text-secondary mx-auto mb-6 bg-secondary/10 p-2 rounded-full" />
            <h3 className="text-xl font-serif font-bold text-white mb-2">Email</h3>
            <p className="text-gray-300 font-light">{settings.email}</p>
          </div>
        </div>
      </section>

      {/* Inquiry Form Section - Hidden for Admin */}
      {!isAdmin && (
        <section className="py-24 px-6 bg-surface-secondary">
          <div className="container-custom max-w-4xl">
            <div className="text-center mb-16">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-secondary">
                Send Us a Message
              </p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
                Let's Start Your Project
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto font-light text-lg">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>
            <div className="bg-white p-8 md:p-12 rounded-card shadow-card border border-gray-100">
              <InquiryForm />
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ContactPage;