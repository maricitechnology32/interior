import { MessageSquare, PenTool, Hammer, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    number: '01',
    title: 'Consultation',
    description: 'We start by understanding your vision, needs, and budget through an in-depth consultation.',
    icon: MessageSquare,
  },
  {
    number: '02',
    title: 'Design & Planning',
    description: 'Our team creates detailed 3D mockups and a comprehensive project plan tailored to you.',
    icon: PenTool,
  },
  {
    number: '03',
    title: 'Execution',
    description: 'Our skilled craftsmen bring the design to life with precision and attention to detail.',
    icon: Hammer,
  },
  {
    number: '04',
    title: 'Final Delivery',
    description: 'We do a final walkthrough to ensure perfection and hand over your stunning new space.',
    icon: CheckCircle,
  },
];

const WorkingProcess = () => {
  return (
    <section className="py-20 px-6 bg-[#F5F4F0]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#D1B68A] mb-4">
            Our Process
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#182527] mb-4">
            From Concept to Completion
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our proven 4-step process ensures a seamless journey from initial consultation to your dream space.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              {/* Icon */}
              <div className="relative inline-flex items-center justify-center w-20 h-20 bg-white mb-6">
                <step.icon className="h-10 w-10 text-[#182527]" />
                {/* Number Badge */}
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-[#D1B68A] text-[#182527] text-xs font-bold flex items-center justify-center">
                  {step.number}
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#182527] mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <div className="inline-block bg-white p-8 md:p-12">
            <h3 className="text-2xl font-bold text-[#182527] mb-2">
              Ready to Get Started?
            </h3>
            <p className="text-gray-600 mb-6">
              Let's transform your space together with our expert process.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#D1B68A] px-8 py-4 font-semibold text-[#182527] hover:bg-[#c4a87d] transition-colors"
            >
              Start Your Project
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkingProcess;
