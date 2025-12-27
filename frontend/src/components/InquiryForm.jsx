import { Send, Loader2, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../api/apiSlice';

const projectTypes = [
  'Residential Design',
  'Commercial Design',
  'Hospitality Design',
  'Office Space',
  'Other'
];

const budgetRanges = [
  'Below NPR 20,000',
  'NPR 20,000 - 50,000',
  'NPR 50,000 - 1,00,000',
  'NPR 1,00,000 - 5,00,000',
  'NPR 5,00,000 - 10,00,000',
  'NPR 10,00,000 - 20,00,000',
  'Above NPR 20,00,000',
];

const InquiryForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    projectType: '',
    budgetRange: '',
    projectDetails: '',
  });

  // State for dynamic contact info
  const [contactInfo, setContactInfo] = useState({
    email: 'hello@thespacestylers.com',
    phone: '+977 9800000000',
    address: 'Kathmandu, Nepal'
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);



  // Fetch contact settings from API
  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const { data } = await api.get('/contact-settings');
        if (data) {
          setContactInfo({
            email: data.email || 'hello@thespacestylers.com',
            phone: data.phone || '+977 9800000000',
            address: data.address || 'Kathmandu, Nepal'
          });
        }
      } catch (err) {
        console.error('Failed to fetch contact info:', err);
        // Fallback is already handled by initial state
      }
    };
    fetchContactInfo();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) setError(null);
  };



  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    if (!formData.projectType) {
      setError('Please select a project type.');
      setIsSubmitting(false);
      return;
    }
    if (!formData.budgetRange) {
      setError('Please select a budget range.');
      setIsSubmitting(false);
      return;
    }

    try {
      const { data } = await api.post('/inquiries', formData);
      setSuccess(data.message || 'Thank you! We will be in touch shortly.');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        projectType: '',
        budgetRange: '',
        projectDetails: '',
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-surface-secondary relative overflow-hidden" id="inquiry-form">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left Column: Text & Info */}
          <div className="space-y-10 lg:sticky lg:top-24">
            <div>
              <span className="text-secondary text-sm font-bold tracking-[0.2em] uppercase mb-4 block">Get In Touch</span>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-primary leading-tight mb-6">
                Let's Craft Your <br />
                <span className="italic text-secondary">Dream Space</span>
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed max-w-md">
                Ready to transform your environment? Fill out the form, and our design team will review your vision and get back to you within 24 hours.
              </p>
            </div>

            <div className="space-y-8 pt-8 border-t border-gray-200/60">
              <div className="flex items-start gap-4 group">
                <div className="bg-white p-3 rounded-full shadow-sm text-secondary group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-primary text-lg mb-1">Email Us</h4>
                  <p className="text-text-muted">{contactInfo.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="bg-white p-3 rounded-full shadow-sm text-secondary group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-primary text-lg mb-1">Call Us</h4>
                  <p className="text-text-muted">{contactInfo.phone}</p>
                  <p className="text-text-muted text-sm">Mon-Fri, 9am - 6pm</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="bg-white p-3 rounded-full shadow-sm text-secondary group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-primary text-lg mb-1">Visit Us</h4>
                  <p className="text-text-muted">{contactInfo.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: The Form */}
          <div className="card p-8 md:p-10 bg-white">
            <h3 className="text-2xl font-serif font-bold text-primary mb-8">Project Details</h3>

            <form onSubmit={submitHandler} className="space-y-8">
              {(success || error) && (
                <div className={`p-4 rounded-lg text-sm text-center font-medium ${success ? 'bg-green-50 text-status-success' : 'bg-red-50 text-status-error'}`}>
                  {success || error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="label">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="input"
                    placeholder="John"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="label">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="input"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="label">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input"
                    placeholder="+977"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="label">Project Type</label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="input"
                  >
                    <option value="" disabled>Select Type</option>
                    {projectTypes.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="label">Estimated Budget</label>
                  <select
                    name="budgetRange"
                    value={formData.budgetRange}
                    onChange={handleChange}
                    className="input"
                  >
                    <option value="" disabled>Select Range</option>
                    {budgetRanges.map(range => <option key={range} value={range}>{range}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="label">Tell us about your project</label>
                <textarea
                  name="projectDetails"
                  rows="4"
                  value={formData.projectDetails}
                  onChange={handleChange}
                  className="input resize-none"
                  placeholder="Style preferences, room dimensions, timeline..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn btn-primary py-4 text-base h-auto group shadow-lg shadow-primary/10"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending Request...
                  </>
                ) : (
                  <>
                    Send Inquiry
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InquiryForm;
