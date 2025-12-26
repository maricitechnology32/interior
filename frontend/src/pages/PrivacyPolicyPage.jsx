import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Shield, Clock } from 'lucide-react';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-[#F5F4F0]">
      {/* Hero Section */}
      <section className="bg-[#182527] py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[#D1B68A]">
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-400">
            Learn how we collect, use, and protect your personal information
          </p>
        </div>
      </section>

      {/* Last Updated */}
      <section className="py-8 px-6 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Clock className="h-5 w-5 text-[#D1B68A]" />
          <span className="text-gray-600">Last updated: <strong>November 9, 2025</strong></span>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 md:p-12">
            {/* Introduction */}
            <p className="text-lg text-gray-700 mb-12 leading-relaxed">
              <strong>The Space Stylers</strong> ("us", "we", or "our") operates the{' '}
              <a href="https://thespacestylers.com" className="text-[#D1B68A] hover:underline">
                https://thespacestylers.com
              </a>{' '}
              website (the "Service"). This page informs you of our policies regarding the collection,
              use, and disclosure of personal data when you use our Service.
            </p>

            {/* Information Collection */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[#182527] mb-6 pb-4 border-b border-gray-200">
                Information Collection and Use
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                We collect several different types of information for various purposes to provide
                and improve our Service to you.
              </p>

              <h3 className="text-xl font-bold text-[#182527] mb-4">Personal Data</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                While using our Service, we may ask you to provide us with certain personally
                identifiable information:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Email address</li>
                <li>First name and last name</li>
                <li>Phone number</li>
                <li>Cookies and Usage Data</li>
              </ul>

              <h3 className="text-xl font-bold text-[#182527] mb-4">Inquiry Data</h3>
              <p className="text-gray-700 leading-relaxed">
                When you submit a "Get In Touch" form, we collect the information you provide
                (name, email, phone, message) in order to respond to your inquiry.
              </p>
            </div>

            {/* Use of Data */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[#182527] mb-6 pb-4 border-b border-gray-200">
                Use of Data
              </h2>
              <p className="text-gray-700 mb-4">The Space Stylers uses the collected data for:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>To provide and maintain the Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To respond to your inquiries and provide customer support</li>
                <li>To provide analysis or valuable information to improve the Service</li>
                <li>To monitor the usage of the Service</li>
                <li>To detect, prevent and address technical issues</li>
              </ul>
            </div>

            {/* Security */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[#182527] mb-6 pb-4 border-b border-gray-200">
                Security of Data
              </h2>
              <div className="bg-[#F5F4F0] p-6 border-l-4 border-[#D1B68A]">
                <div className="flex items-start gap-4">
                  <Shield className="h-6 w-6 text-[#D1B68A] flex-shrink-0 mt-1" />
                  <p className="text-gray-700 leading-relaxed">
                    The security of your data is important to us. We use industry-standard practices,
                    such as database encryption and secure password hashing, to protect your Personal Data.
                  </p>
                </div>
              </div>
            </div>

            {/* Changes */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[#182527] mb-6 pb-4 border-b border-gray-200">
                Changes to This Privacy Policy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes
                by posting the new Privacy Policy on this page. You are advised to review this Privacy
                Policy periodically for any changes.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-[#182527] p-8 -mx-8 md:-mx-12 -mb-8 md:-mb-12 mt-12">
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="text-gray-400 mb-6">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <a
                href="mailto:contact@thespacestylers.com"
                className="inline-flex items-center gap-2 bg-[#D1B68A] px-6 py-3 font-medium text-[#182527]"
              >
                <Mail className="h-5 w-5" />
                contact@thespacestylers.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              to="/terms-of-service"
              className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 bg-[#182527] text-white hover:bg-[#1e2d2f] transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;