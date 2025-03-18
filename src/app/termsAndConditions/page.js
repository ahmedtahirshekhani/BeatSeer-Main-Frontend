"use client"
import React from "react";
import { useRouter } from "next/navigation";

export default function TermsAndConditions() {
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
        <h1 className="text-3xl font-bold text-white mb-6 mt-8">
          Terms and Conditions
        </h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">1. Introduction</h2>
          <p className="text-white">
            Welcome to our website. By accessing our website or using our services, you agree to be bound by these terms and conditions.
            If you do not agree with any part of the terms, you must not use our services.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">2. User Responsibilities</h2>
          <p className="text-white">
            As a user, you agree to use our website and services in compliance with all applicable laws and regulations. You must not:
          </p>
          <ul className="list-disc list-inside text-white mt-2">
            <li>Engage in any unauthorized or illegal activities.</li>
            <li>Attempt to access restricted areas of the website.</li>
            <li>Distribute malware or harmful content.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">3. Intellectual Property</h2>
          <p className="text-white">
            All content on this website, including text, graphics, logos, and software, is the property of our company or its licensors and
            is protected by copyright laws. You may not copy, reproduce, or distribute any content without prior permission.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">4. Termination of Use</h2>
          <p className="text-white">
            We reserve the right to suspend or terminate your access to our website or services at any time, for any reason, without notice.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">5. Limitation of Liability</h2>
          <p className="text-white">
            We shall not be held responsible for any direct, indirect, incidental, or consequential damages resulting from your use of our
            website or services.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">6. Changes to Terms</h2>
          <p className="text-white">
            We reserve the right to update these terms and conditions at any time. You are advised to review this page periodically to stay
            informed about any changes.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">7. Contact Us</h2>
          <p className="text-white">
            If you have any questions or concerns about these terms, please contact us at <a href="/contactUs" className="text-blue-500 underline">support@example.com</a>.
          </p>
        </section>

        <div className="text-center mt-8">
          <p className="text-gray-50 text-sm">
            Last updated: January 11, 2025
          </p>
        </div>
      </div>
    </div>
  );
}
