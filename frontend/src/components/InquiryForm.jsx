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
    <section className="pt-10 pb-20 lg:pt-16 lg:pb-28 bg-[#F5F4F0] relative overflow-hidden" id="inquiry-form">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#D1B68A]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#182527]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left Column: Text & Info */}
          <div className="space-y-10 lg:sticky lg:top-24">
            <div>
              <span className="text-[#D1B68A] text-sm font-bold tracking-[0.2em] uppercase mb-4 block">Get In Touch</span>
              <h2 className="text-4xl lg:text-5xl font-serif text-[#182527] leading-tight mb-6">
                Let's Craft Your <br />
                <span className="italic text-[#D1B68A]">Dream Space</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed max-w-md">
                Ready to transform your environment? Fill out the form, and our design team will review your vision and get back to you within 24 hours.
              </p>
            </div>

            <div className="space-y-8 pt-8 border-t border-gray-200/60">
              <div className="flex items-start gap-4">
                <div className="bg-white p-3 rounded-full shadow-sm text-[#D1B68A]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-[#182527] text-lg mb-1">Email Us</h4>
                  <p className="text-gray-500">{contactInfo.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white p-3 rounded-full shadow-sm text-[#D1B68A]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-[#182527] text-lg mb-1">Call Us</h4>
                  <p className="text-gray-500">{contactInfo.phone}</p>
                  <p className="text-gray-500">Mon-Fri, 9am - 6pm</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white p-3 rounded-full shadow-sm text-[#D1B68A]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-[#182527] text-lg mb-1">Visit Us</h4>
                  <p className="text-gray-500">{contactInfo.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: The Form */}
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.03)] border border-gray-100">
            <h3 className="text-2xl font-serif text-[#182527] mb-8">Project Details</h3>

            <form onSubmit={submitHandler} className="space-y-8">
              {(success || error) && (
                <div className={`p-4 rounded-lg text-sm text-center ${success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  {success || error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full border-b border-gray-200 py-2 focus:border-[#D1B68A] outline-none transition-colors bg-transparent placeholder-gray-300 text-[#182527]"
                    placeholder="John"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full border-b border-gray-200 py-2 focus:border-[#D1B68A] outline-none transition-colors bg-transparent placeholder-gray-300 text-[#182527]"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border-b border-gray-200 py-2 focus:border-[#D1B68A] outline-none transition-colors bg-transparent placeholder-gray-300 text-[#182527]"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border-b border-gray-200 py-2 focus:border-[#D1B68A] outline-none transition-colors bg-transparent placeholder-gray-300 text-[#182527]"
                    placeholder="+977"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Project Type</label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full border-b border-gray-200 py-2 focus:border-[#D1B68A] outline-none transition-colors bg-transparent text-[#182527]"
                  >
                    <option value="" disabled>Select Type</option>
                    {projectTypes.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Estimated Budget</label>
                  <select
                    name="budgetRange"
                    value={formData.budgetRange}
                    onChange={handleChange}
                    className="w-full border-b border-gray-200 py-2 focus:border-[#D1B68A] outline-none transition-colors bg-transparent text-[#182527]"
                  >
                    <option value="" disabled>Select Range</option>
                    {budgetRanges.map(range => <option key={range} value={range}>{range}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tell us about your project</label>
                <textarea
                  name="projectDetails"
                  rows="4"
                  value={formData.projectDetails}
                  onChange={handleChange}
                  className="w-full border-b border-gray-200 py-2 focus:border-[#D1B68A] outline-none transition-colors bg-transparent placeholder-gray-300 text-[#182527] resize-none"
                  placeholder="Style preferences, room dimensions, timeline..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#182527] text-white py-4 px-8 rounded hover:bg-[#D1B68A] transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg shadow-[#182527]/10"
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
