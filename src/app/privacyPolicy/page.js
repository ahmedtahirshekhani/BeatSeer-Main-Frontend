"use client"
import React from "react";
import { useRouter } from "next/navigation";

export default function PrivacyPolicy() {
    const router = useRouter(); // Next.js hook for routing

    const goToHome = () => {
        router.push("/"); // Navigate to the home page
      };

  return (
    <div className="min-h-screen bg-gray-700 flex flex-col items-center">
      <div className="max-w-full w-full bg-gray-700 rounded-lg shadow-md p-8">
        <div >
          <button
            onClick={goToHome}
            className="px-3 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            Go Back to Home
          </button>
        </div>
        <h1 className="text-3xl font-bold text-white mb-6 mt-8">Privacy Policy</h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">1. Introduction</h2>
          <p className="text-white">
            We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information
            when you use our services.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">2. Information We Collect</h2>
          <p className="text-white">
            We may collect the following types of information:
          </p>
          <ul className="list-disc list-inside text-white mt-2">
            <li><strong>Personal Information:</strong> Name, email address, phone number, etc.</li>
            <li><strong>Usage Data:</strong> Information about how you use our website, including IP address, browser type, and device data.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">3. How We Use Your Information</h2>
          <p className="text-white">
            The information we collect may be used to:
          </p>
          <ul className="list-disc list-inside text-white mt-2">
            <li>Provide and improve our services.</li>
            <li>Communicate with you regarding updates or support.</li>
            <li>Ensure the security of our platform.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">4. Sharing Your Information</h2>
          <p className="text-white">
            We do not sell or share your personal information with third parties, except as necessary to:
          </p>
          <ul className="list-disc list-inside text-white mt-2">
            <li>Comply with legal requirements.</li>
            <li>Protect the rights and safety of our company or users.</li>
            <li>Work with trusted service providers who assist us in operating our services.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">5. Security of Your Information</h2>
          <p className="text-white">
            We implement appropriate technical and organizational measures to protect your personal information from unauthorized access,
            disclosure, alteration, or destruction.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">6. Your Data Rights</h2>
          <p className="text-white">
            You have the right to:
          </p>
          <ul className="list-disc list-inside text-white mt-2">
            <li>Access and review your personal data.</li>
            <li>Request corrections to your personal information.</li>
            <li>Request deletion of your personal data.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">7. Cookies</h2>
          <p className="text-white">
            We may use cookies to improve your experience on our website. You can adjust your browser settings to decline cookies if you
            prefer.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">8. Changes to This Policy</h2>
          <p className="text-white">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated date.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">9. Contact Us</h2>
          <p className="text-white">
            {/* If you have any questions or concerns about this Privacy Policy, please contact us at <a href="mailto:privacy@example.com" className="text-blue-500 underline">privacy@example.com</a>. */}
            If you have any questions or concerns about this Privacy Policy, please contact us at <a href="/contactUs" className="text-blue-500 underline">privacy@example.com</a>.
          </p>
        </section>

        <div className="text-center mt-8">
          <p className="text-white text-sm">
            Last updated: January 11, 2025
          </p>
        </div>
      </div>
    </div>
  );
}
