"use client"
import React from "react";
import { useRouter } from "next/navigation";

export default function PrivacyPolicy() {
    const router = useRouter();

    const goToHome = () => {
        router.push("/"); 
      };

  return (
    <div className="min-h-screen bg-gray-700 flex flex-col items-center">
        <div className="max-w-full w-full bg-gray-700 rounded-lg shadow-md p-8">
            <button
            onClick={goToHome}
            className="px-3 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
            >
            Go Back to Home
            </button>
            <h1 className="text-3xl font-bold text-white mb-6 mt-8">Contact Us</h1>

            <section className="mb-6">
            <p className="text-white">
                If you have any questions or concerns about this Privacy Policy, please contact us through any of the following methods:
            </p>
            <ul className="list-disc list-inside text-white mt-2">
                <li>Email: <a href="mailto:support@example.com" className="text-blue-500 underline">support@example.com</a></li>
                <li>Phone: <a href="tel:+1234567890" className="text-blue-500 underline">+1 (234) 567-890</a></li>
                <li>Mailing Address: 1234 Privacy Lane, City, State, ZIP Code</li>
            </ul>
            </section>
        </div>
    </div>

  );
}