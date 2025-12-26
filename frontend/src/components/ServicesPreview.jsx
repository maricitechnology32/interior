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
    <section className="py-20 px-6 bg-[#F5F4F0]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#D1B68A] mb-4">
            Our Services
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#182527] mb-4">
            Innovative Design for Every Need
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From residential homes to commercial spaces, we craft environments that inspire,
            function beautifully, and reflect your unique vision.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
            // Loading skeleton
            [1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-8 animate-pulse">
                <div className="w-14 h-14 bg-gray-200 mb-6"></div>
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
                <div key={service._id} className="bg-white p-8">
                  {/* Icon */}
                  <div className="mb-6 inline-flex items-center justify-center w-14 h-14 bg-[#D1B68A]/20">
                    <IconComponent className="h-7 w-7 text-[#D1B68A]" />
                  </div>

                  <h3 className="text-2xl font-bold text-[#182527] mb-3">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <Link
                    to={service.link || '/projects'}
                    className="inline-flex items-center gap-2 font-medium text-[#D1B68A] hover:text-[#b58e5a] transition-colors"
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4" />
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
            className="inline-flex items-center gap-2 bg-[#D1B68A] px-8 py-4 font-semibold text-[#182527] hover:bg-[#c4a87d] transition-colors"
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