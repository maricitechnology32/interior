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
    <section className="py-20 px-6 bg-surface-secondary">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-secondary mb-4">
            Our Process
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            From Concept to Completion
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto font-light leading-relaxed">
            Our proven 4-step process ensures a seamless journey from initial consultation to your dream space.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              {/* Icon */}
              <div className="relative inline-flex items-center justify-center w-20 h-20 bg-white mb-6 rounded-2xl shadow-sm group-hover:-translate-y-2 transition-transform duration-300">
                <step.icon className="h-9 w-9 text-primary" />
                {/* Number Badge */}
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-secondary text-primary text-xs font-bold flex items-center justify-center rounded-full shadow-md">
                  {step.number}
                </span>
              </div>

              <h3 className="text-xl font-serif font-bold text-primary mb-3">
                {step.title}
              </h3>
              <p className="text-text-secondary leading-relaxed text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <div className="inline-block bg-white p-8 md:p-12 rounded-card shadow-card border border-gray-100">
            <h3 className="text-2xl font-serif font-bold text-primary mb-2">
              Ready to Get Started?
            </h3>
            <p className="text-text-secondary mb-8">
              Let's transform your space together with our expert process.
            </p>
            <Link
              to="/contact"
              className="btn btn-primary"
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
