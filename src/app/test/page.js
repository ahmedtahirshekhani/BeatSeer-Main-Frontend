"use client";

import { useState, useEffect } from "react";

export default function EJ() {
  const [artist, setArtist] = useState("");
  const [emergingArtists, setEmergingArtists] = useState([]);

  // Fetch artists from the API
  const fetchArtists = async () => {
    const res = await fetch("/api/bs_ai_emerging_artist_list");
    const data = await res.json();
    console.log("Fetched artists:", data.emerging_artists);
    setEmergingArtists(data.emerging_artists);
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  // Add artist function
  const addArtist = async () => {
    if (!artist.trim()) return;
    console.log("Adding artist:", artist);
    const res = await fetch("/api/bs_ai_emerging_artist_list", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ artist }),
    });

    if (res.ok) {
      fetchArtists(); // Refresh list
      setArtist("");  // Clear input
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">🎶 Emerging Artists</h1>

      {/* Input Box */}
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Enter artist name"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          className="border p-2 rounded-lg w-60"
        />
        <button
          onClick={addArtist}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Add Artist
        </button>
      </div>

      {/* Display Emerging Artists */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Top Emerging Artists:</h2>
        <ul className="bg-white p-4 rounded-lg shadow-md">
          {emergingArtists.length === 0 ? (
            <p>No artists yet.</p>
          ) : (
            emergingArtists.map((name, index) => (
              <li key={index} className="p-2 border-b">{name}</li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
