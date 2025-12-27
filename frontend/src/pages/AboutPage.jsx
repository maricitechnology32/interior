import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import InquiryForm from '../components/InquiryForm';
import { useAuth } from '../hooks/useAuth';
import api from '../api/apiSlice';

const defaultContent = {
  heroImage: { url: 'https://images.unsplash.com/photo-1519642918688-7e43b19245d8?q=80&w=2000&auto=format&fit=crop' },
  heroTagline: 'Our Story',
  heroTitle: 'About Us',
  heroSubtitle: 'Designing with heart, crafting with soul',
  stats: [
    { value: '500+', label: 'Projects Completed' },
    { value: '15+', label: 'Years Experience' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '50+', label: 'Design Awards' },
  ],
  aboutImage: { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop' },
  aboutTagline: 'Who We Are',
  aboutTitle: 'Transforming Spaces Since 2009',
  aboutParagraphs: [
    'At The Space Stylers, we believe that every space has a story to tell. Our passion is bringing that story to life through thoughtful, personalized design.',
    'Founded on principles of creativity, quality, and exceptional service, we are a team of designers and craftsmen dedicated to making your vision a reality.',
  ],
  mission: 'To create unique, functional, and beautiful spaces that enhance our clients\' lives and work.',
  vision: 'To be a leading name in the interior design industry, known for innovation, quality, and client satisfaction.',
  team: [
    { name: 'Karan Bohara', role: 'Senior Architect', image: { url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80' } },
    { name: 'Pratik Bhusal', role: 'Project Manager', image: { url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80' } },
    { name: 'Pawan Bhusal', role: 'Creative Director', image: { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' } },
    { name: 'Sita Sharma', role: 'Interior Designer', image: { url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80' } },
  ],
};

const AboutPage = () => {
  const { isAdmin } = useAuth();
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data } = await api.get('/about');
        setContent(data);
      } catch (err) {
        console.error('Failed to load about content:', err);
        setContent(defaultContent);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
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
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={content.heroImage?.url}
            alt="About The Space Stylers"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/80"></div>
        </div>

        <div className="relative z-10 text-center px-6">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-secondary">
            {content.heroTagline}
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6">
            {content.heroTitle}
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-200 font-light">
            {content.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Stats Row */}
      <section className="py-20 px-6 bg-primary text-white border-b border-white/10">
        <div className="container-custom grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
          {content.stats?.map((stat, index) => (
            <div key={index} className="px-4">
              <p className="text-4xl md:text-5xl font-serif font-bold text-secondary mb-2">{stat.value}</p>
              <p className="text-sm font-medium tracking-wide text-gray-400 uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-24 px-6 bg-surface-secondary">
        <div className="container-custom grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-secondary">
              {content.aboutTagline}
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8 leading-tight">
              {content.aboutTitle}
            </h2>
            <div className="space-y-6 text-text-secondary leading-relaxed font-light text-lg">
              {content.aboutParagraphs?.map((para, index) => (
                <p key={index}>{para}</p>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-secondary/10 rounded-card -z-10 transform rotate-3"></div>
            <img
              src={content.aboutImage?.url}
              alt="Modern interior"
              className="w-full h-[500px] object-cover rounded-card shadow-card"
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 px-6 bg-white">
        <div className="container-custom grid md:grid-cols-2 gap-12">
          <div className="p-10 border-l-4 border-secondary bg-surface-secondary/50 rounded-r-card">
            <h3 className="text-3xl font-serif font-bold text-primary mb-4">Our Mission</h3>
            <p className="text-text-secondary leading-relaxed font-light text-lg">{content.mission}</p>
          </div>
          <div className="p-10 border-l-4 border-primary bg-surface-secondary/50 rounded-r-card">
            <h3 className="text-3xl font-serif font-bold text-primary mb-4">Our Vision</h3>
            <p className="text-text-secondary leading-relaxed font-light text-lg">{content.vision}</p>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-24 px-6 bg-surface-secondary">
        <div className="container-custom">
          <div className="text-center mb-16">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-secondary mb-4">
              Meet Our Team
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">
              The Creative Minds
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {content.team?.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative overflow-hidden rounded-card mb-6 shadow-sm group-hover:shadow-card-hover transition-all duration-300">
                  <img
                    src={member.image?.url}
                    alt={member.name}
                    className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <p className="text-white font-serif italic">"Design is intelligence made visible."</p>
                  </div>
                </div>
                <h4 className="text-xl font-serif font-bold text-primary group-hover:text-secondary transition-colors">{member.name}</h4>
                <p className="text-sm font-medium text-text-muted uppercase tracking-wider mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-lg text-gray-300 mb-10 font-light max-w-2xl mx-auto">
            Let's discuss how we can transform your space into something extraordinary.
          </p>
          <Link
            to="/contact"
            className="btn btn-secondary text-primary hover:bg-white hover:text-primary border-none shadow-lg shadow-black/20"
          >
            Get In Touch
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Contact Form - Hidden for Admin */}
      {!isAdmin && (
        <section id="inquiry-form" className="py-24 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Get In Touch</h2>
              <p className="text-text-secondary font-light text-lg">Ready to transform your space? Let's start your design journey.</p>
            </div>
            <InquiryForm />
          </div>
        </section>
      )}
    </div>
  );
};

export default AboutPage;