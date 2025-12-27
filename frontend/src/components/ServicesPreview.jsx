import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Home, Building2, UtensilsCrossed, Briefcase, Palette, Lamp } from 'lucide-react';
import api from '../api/apiSlice';

const iconMap = {
  home: Home,
  building: Building2,
  utensils: UtensilsCrossed,
  briefcase: Briefcase,
  palette: Palette,
  lamp: Lamp,
};

const defaultServices = [
  {
    _id: '1',
    title: 'Residential Design',
    description: 'Transform your home into a beautiful, functional living space with personalized interior solutions.',
    link: '/projects?category=Residential',
    icon: 'home',
  },
  {
    _id: '2',
    title: 'Commercial Design',
    description: 'Create professional, productive work environments that inspire creativity and efficiency.',
    link: '/projects?category=Commercial',
    icon: 'building',
  },
  {
    _id: '3',
    title: 'Hospitality Design',
    description: 'Design unforgettable experiences for your guests in hotels, restaurants, and resorts.',
    link: '/projects?category=Hospitality',
    icon: 'utensils',
  },
];

const ServicesPreview = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await api.get('/services');
        setServices(data.slice(0, 3)); // Show max 3 on homepage
      } catch (err) {
        console.error('Failed to load services:', err);
        setServices(defaultServices);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <section className="py-20 px-6 bg-surface-secondary">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-secondary mb-4">
            Our Services
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            Innovative Design for Every Need
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto font-light">
            From residential homes to commercial spaces, we craft environments that inspire,
            function beautifully, and reflect your unique vision.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
            // Loading skeleton
            [1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-8 rounded-card shadow-sm animate-pulse">
                <div className="w-14 h-14 bg-gray-200 mb-6 rounded-full"></div>
                <div className="h-6 bg-gray-200 rounded w-2/3 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))
          ) : (
            services.map((service) => {
              const IconComponent = iconMap[service.icon] || Home;
              return (
                <div key={service._id} className="card p-8 bg-white group hover:shadow-card-hover transition-all duration-300">
                  {/* Icon */}
                  <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-full bg-secondary/10 group-hover:bg-secondary group-hover:text-primary transition-colors duration-300">
                    <IconComponent className="h-7 w-7 text-secondary group-hover:text-primary transition-colors duration-300" />
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-primary mb-3">
                    {service.title}
                  </h3>

                  <p className="text-text-secondary mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <Link
                    to={service.link || '/projects'}
                    className="inline-flex items-center gap-2 font-medium text-secondary hover:text-primary transition-colors group/link"
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })
          )}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            to="/services"
            className="btn btn-primary"
          >
            View All Services
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;