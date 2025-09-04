// src/pages/TermsPage.tsx
import React from "react";

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen  bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="bg-indigo-600 text-white py-20 px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms & Conditions</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Please read these terms carefully before using WalletX services.
        </p>
      </section>

      {/* Terms Content */}
      <section className="px-8 lg:px-6 py-16 container mx-auto space-y-8">
        <h2 className="text-3xl font-semibold text-indigo-600">1. Acceptance of Terms</h2>
        <p className="text-gray-700">
          By accessing or using WalletX, you agree to be bound by these Terms & Conditions. 
          If you disagree with any part of the terms, you may not access the service.
        </p>

        <h2 className="text-3xl font-semibold text-indigo-600">2. Account Responsibilities</h2>
        <p className="text-gray-700">
          Users are responsible for maintaining the confidentiality of their account credentials 
          and are fully responsible for all activities under their account.
        </p>

        <h2 className="text-3xl font-semibold text-indigo-600">3. Payments & Wallet</h2>
        <p className="text-gray-700">
          All wallet transactions are final. Users must ensure sufficient balance before sending 
          or withdrawing funds. WalletX is not responsible for unauthorized transactions if 
          account credentials are compromised.
        </p>

        <h2 className="text-3xl font-semibold text-indigo-600">4. Privacy & Data</h2>
        <p className="text-gray-700">
          Your personal information is protected according to our Privacy Policy. We do not share 
          your data without consent, except as required by law.
        </p>

        <h2 className="text-3xl font-semibold text-indigo-600">5. Limitation of Liability</h2>
        <p className="text-gray-700">
          WalletX will not be liable for any indirect, incidental, or consequential damages arising 
          from the use of our services.
        </p>

        <h2 className="text-3xl font-semibold text-indigo-600">6. Changes to Terms</h2>
        <p className="text-gray-700">
          We may modify these Terms & Conditions at any time. Users will be notified of major 
          changes, and continued use constitutes acceptance of updated terms.
        </p>

        <h2 className="text-3xl font-semibold text-indigo-600">7. Contact</h2>
        <p className="text-gray-700">
          For any questions regarding these Terms & Conditions, please contact us at 
          <span className="text-indigo-600 font-medium"> support@walletx.com</span>.
        </p>
      </section>
    </div>
  );
};

export default TermsPage;
