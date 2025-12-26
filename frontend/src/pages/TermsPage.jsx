import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Clock, AlertTriangle } from 'lucide-react';

const TermsPage = () => {
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
            Terms and Conditions
          </h1>
          <p className="text-gray-400">
            Please read these terms carefully before using our services
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

      {/* Important Notice */}
      <section className="py-8 px-6 bg-red-50 border-b border-red-200">
        <div className="max-w-4xl mx-auto flex items-start gap-4">
          <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
          <p className="text-red-800">
            <strong>Important:</strong> Your access to and use of the Service is conditioned on your
            acceptance of and compliance with these Terms. These Terms apply to all visitors, users,
            and others who access or use the Service.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 md:p-12">
            {/* Introduction */}
            <p className="text-lg text-gray-700 mb-12 leading-relaxed">
              Please read these terms and conditions ("Terms", "Terms and Conditions") carefully
              before using the{' '}
              <a href="https://thespacestylers.com" className="text-[#D1B68A] hover:underline">
                https://thespacestylers.com
              </a>{' '}
              website (the "Service") operated by <strong>The Space Stylers</strong> ("us", "we", or "our").
            </p>

            {/* Accounts */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[#182527] mb-6 pb-4 border-b border-gray-200">
                Accounts
              </h2>

              <h3 className="text-xl font-bold text-[#182527] mb-4">Account Information</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                When you create an account with us, you must provide us information that is accurate,
                complete, and current at all times. Failure to do so constitutes a breach of the Terms,
                which may result in immediate termination of your account on our Service.
              </p>

              <h3 className="text-xl font-bold text-[#182527] mb-4">Password Security</h3>
              <p className="text-gray-700 leading-relaxed">
                You are responsible for safeguarding the password that you use to access the Service
                and for any activities or actions under your password. You agree not to disclose your
                password to any third party.
              </p>
            </div>

            {/* Intellectual Property */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[#182527] mb-6 pb-4 border-b border-gray-200">
                Intellectual Property
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                The Service and its original content (excluding Content provided by users), features,
                and functionality are and will remain the exclusive property of The Space Stylers and
                its licensors.
              </p>
              <div className="bg-[#F5F4F0] p-6 border-l-4 border-[#D1B68A]">
                <p className="text-gray-700">
                  Our trademarks and content, including all images in our Gallery and Projects sections,
                  may not be used in connection with any product or service without the prior written
                  consent of The Space Stylers.
                </p>
              </div>
            </div>

            {/* Links to Other Websites */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[#182527] mb-6 pb-4 border-b border-gray-200">
                Links to Other Websites
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Our Service may contain links to third-party web sites or services that are not owned
                or controlled by The Space Stylers. We have no control over, and assume no responsibility
                for, the content, privacy policies, or practices of any third-party web sites or services.
              </p>
            </div>

            {/* Termination */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[#182527] mb-6 pb-4 border-b border-gray-200">
                Termination
              </h2>
              <div className="bg-red-50 p-6 border-l-4 border-red-500">
                <p className="text-red-800 font-medium">
                  We may terminate or suspend access to our Service immediately, without prior notice
                  or liability, for any reason whatsoever, including without limitation if you breach
                  the Terms.
                </p>
              </div>
            </div>

            {/* Governing Law */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[#182527] mb-6 pb-4 border-b border-gray-200">
                Governing Law
              </h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms shall be governed and construed in accordance with the laws of our
                jurisdiction, without regard to its conflict of law provisions.
              </p>
            </div>

            {/* Changes */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[#182527] mb-6 pb-4 border-b border-gray-200">
                Changes
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right, at our sole discretion, to modify or replace these Terms at
                any time. What constitutes a material change will be determined at our sole discretion.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-[#182527] p-8 -mx-8 md:-mx-12 -mb-8 md:-mb-12 mt-12">
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="text-gray-400 mb-6">
                If you have any questions about these Terms, please contact us:
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
              to="/privacy-policy"
              className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 bg-[#182527] text-white hover:bg-[#1e2d2f] transition-colors"
            >
              Contact Support
            </Link>
          </div>

          {/* Acceptance Notice */}
          <p className="mt-8 text-center text-sm text-gray-500">
            By using our website, you acknowledge that you have read and agree to these Terms and Conditions.
          </p>
        </div>
      </section>
    </div>
  );
};

export default TermsPage;