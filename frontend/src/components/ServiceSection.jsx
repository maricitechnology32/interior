import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ServiceSection = ({ title, description, imageUrl, linkTo, reverse = false }) => {
  return (
    <div
      className={`container mx-auto flex flex-col items-center gap-12 px-6 py-16 ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'
        }`}
    >
      {/* Image Column */}
      <div className="w-full md:w-1/2">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Text Column */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h2 className="mb-4 text-3xl font-bold text-[#182527]">
          {title}
        </h2>
        <p className="mb-6 text-gray-600 text-lg leading-relaxed">
          {description}
        </p>
        <Link
          to={linkTo}
          className="inline-flex items-center gap-2 bg-[#D1B68A] px-6 py-3 font-semibold text-[#182527] hover:bg-[#c4a87d] transition-colors"
        >
          View {title} Projects
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default ServiceSection;