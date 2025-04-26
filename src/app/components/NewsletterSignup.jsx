"use client";
import React, { useState } from "react";
import ShareButtons from "./ShareButtons";
export default function NewsletterSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !email) {
      setError("Please fill out both fields.");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to subscribe.");
      } else {
        setSuccess(data.message);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="bg-[#4682B4] text-white justify-center w-[90%] max-w-[800px] py-2 shadow-md mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold pb-1">Newsletter Sign Up</h2>
          <form className="flex flex-col items-center gap-3" onSubmit={handleSubmit}>
            <div className="w-full flex flex-col sm:flex-row justify-center gap-3">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full sm:w-1/3 p-2 rounded border border-gray-300 text-black placeholder-black"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:w-1/3 p-2 rounded border border-gray-300 text-black placeholder-black"
              />
            </div>
            {/* Button on the next line */}
            <div className="w-full flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-white text-[#4682B4] px-4 py-1 rounded-lg font-bold hover:bg-gray-200"
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
          </form>
          {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
          {success && <p className="mt-4 text-sm text-green-500">{success}</p>}
          <p className="mt-2">
            By subscribing, you agree to our{" "}
            <a href="/termsAndConditions" className="underline">
              Terms and Conditions
            </a>.
          </p>
        </div>
      </section>

      <ShareButtons />
      <div className="bg-gray-300 h-16 py-4 text-center w-[90%] max-w-[800px] mx-auto">
        <p className="text-sm text-white">Ad space</p>
      </div>

      <div className="bg-[#1d374c] text-white w-[90%] max-w-[800px] mx-auto">
        <div className="max-w-3xl mx-auto text-center py-4">
          <p className="text-sm">
            This newsletter contains AI-generated insights derived from music industry data sources. While powered by Beatseer's proprietary algorithms, this information should be used as supplementary guidance only and not as the sole basis for decisions.
          </p>
          <p className="text-sm mt-2">
            <a href="/contactUs" className="underline text-white">Contact Us</a>
            <span> | </span>
            <a href="/privacyPolicy" className="underline text-white">Privacy Policy</a>
          </p>
        </div>
        <footer className="text-center text-sm text-white py-4">
          © 2025 Beatseer. All Rights Reserved
        </footer>
      </div>
    </div>
  );
}
