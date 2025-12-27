import { useState, useEffect } from 'react';
import { ArrowRight, Home, Building2, UtensilsCrossed, Briefcase, Palette, Lamp } from 'lucide-react';
import { Link } from 'react-router-dom';
import InquiryForm from '../components/InquiryForm';
import { useAuth } from '../hooks/useAuth';
import api from '../api/apiSlice';

const iconMap = {
  home: Home,
  building: Building2,
  utensils: UtensilsCrossed,
  briefcase: Briefcase,
  palette: Palette,
  lamp: Lamp,
};

const ServicesPage = () => {
  const { isAdmin } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await api.get('/services');
        setServices(data);
      } catch (err) {
        console.error('Failed to load services:', err);
        // Fallback to defaults
        setServices([
          {
            _id: '1',
            title: "Residential Design",
            description: "Transform your home into a beautiful, functional living space that reflects your personality and lifestyle.",
            image: { url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1932&auto=format&fit=crop" },
            link: "/projects?category=Residential"
          },
          {
            _id: '2',
            title: "Commercial Spaces",
            description: "Create productive work environments that enhance your business image and optimize workflow.",
            image: { url: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" },
            link: "/projects?category=Commercial"
          },
          {
            _id: '3',
            title: "Hospitality Design",
            description: "Design unforgettable experiences for your guests with inviting and stylish interiors.",
            image: { url: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=2069&auto=format&fit=crop" },
            link: "/projects?category=Hospitality"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-surface-secondary">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop"
            alt="Interior design services"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/80"></div>
        </div>

        <div className="relative z-10 text-center px-6">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-secondary">
            What We Do
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6">
            Our Services
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-200 font-light">
            Comprehensive interior design solutions tailored to your unique needs
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6">
        <div className="container-custom">
          {loading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[4/3] bg-gray-200 rounded-card mb-4"></div>
                  <div className="p-6 bg-white rounded-card">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service) => (
                <Link
                  key={service._id}
                  to={service.link || '/projects'}
                  className="group block bg-white rounded-card overflow-hidden shadow-sm hover:shadow-card-hover transition-all duration-300 border border-gray-100"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={service.image?.url}
                      alt={service.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-serif font-bold text-primary mb-3 group-hover:text-secondary transition-colors">{service.title}</h3>
                    <p className="text-text-secondary mb-6 leading-relaxed font-light">{service.description}</p>
                    <span className="inline-flex items-center gap-2 text-secondary font-bold uppercase tracking-wider text-sm group/link">
                      View Projects
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-6 bg-primary text-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-secondary mb-4">How We Work</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">Our Design Process</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Consultation', desc: 'We discuss your vision and requirements' },
              { step: '02', title: 'Concept', desc: 'Creative concepts and mood boards' },
              { step: '03', title: 'Design', desc: 'Detailed plans and 3D visualizations' },
              { step: '04', title: 'Execution', desc: 'Professional implementation' },
            ].map((item, i) => (
              <div key={i} className="text-center group p-6 rounded-card hover:bg-white/5 transition-colors duration-300">
                <div className="text-6xl font-serif font-bold text-secondary/20 mb-4 group-hover:text-secondary transition-colors duration-300">{item.step}</div>
                <h3 className="text-xl font-bold text-white mb-3 font-serif">{item.title}</h3>
                <p className="text-gray-400 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form - Hidden for Admin */}
      {!isAdmin && (
        <section id="inquiry-form" className="py-24 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Get In Touch</h2>
              <p className="text-text-secondary font-light text-lg">Have a project in mind? Fill out the form below.</p>
            </div>
            <InquiryForm />
          </div>
        </section>
      )}
    </div>
  );
};

export default ServicesPage;