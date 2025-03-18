'use client';
import { useEffect, useState } from 'react';

export default function UnsubscribePage() {
  const [status, setStatus] = useState(null);
  const [unsubToken, setUnsubToken] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    // Extract unsubToken from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('unsubToken');
    setUnsubToken(token);

    if (!token) {
      setStatus('Invalid or missing unsubscribe token.');
    }
  }, []);

  const handleUnsubscribe = async () => {
    if (!unsubToken) return;

    try {
      const response = await fetch(`/api/unsubscribe?unsubToken=${unsubToken}`, {
        method: 'PUT',
      });

      const data = await response.json();
      if (response.ok) {
        setStatus('You have successfully unsubscribed from MusicTrends updates.');
      } else {
        setStatus(`Error: ${data.message}`);
      }
    } catch (error) {
      setStatus('Failed to unsubscribe. Please try again later.');
      console.error(error);
    }
  };

  const handleConfirm = () => {
    setIsConfirmed(true);
    handleUnsubscribe();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Unsubscribe from MusicTrends Updates
        </h1>
        {status ? (
          <p
            className={`text-center text-lg font-medium ${
              status.includes('Success')
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >
            {status}
          </p>
        ) : isConfirmed ? (
          <p className="text-center text-lg text-gray-600">Processing...</p>
        ) : (
          <button
            onClick={handleConfirm}
            disabled={!unsubToken}
            className="w-full px-4 py-2 bg-red-500 text-white font-semibold text-lg rounded-md hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Confirm Unsubscription
          </button>
        )}
      </div>
    </div>
  );
}
