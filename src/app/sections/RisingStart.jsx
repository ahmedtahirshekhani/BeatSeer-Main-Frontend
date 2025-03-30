"use client"
import React, { useState, useEffect } from 'react';
import VideoSection from './VideoSection';
const formatNumber = (num) => {
  if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + "M"; // Convert to millions
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + "K"; // Convert to thousands
  } else {
    return num.toString(); // Keep as-is for smaller numbers
  }
};

const RisingStar = ({ artists }) => {
  const [finalRisingStar, setFinalRisingStar] = useState(null);
  


  useEffect(() => {
    const choosingRisingStar = async () => {
      const sortedArtists = artists.sort((a, b) => (b.video_views || 0) - (a.video_views || 0));
      console.log("sortedArtists", sortedArtists);
  

      const response = await fetch(`/api/2ndLastEntry`);
      const previousRisingStar = await response.json();

      let selectedRisingStar = sortedArtists[0];


      if (selectedRisingStar.artist === previousRisingStar.artist) {
        selectedRisingStar = sortedArtists[1] || {};
        
      } else {
        // console.log("Different artist");
      }

      setFinalRisingStar(selectedRisingStar); 
    };

    choosingRisingStar();
  }, [artists]); // This effect runs whenever `artists` changes

  // Conditional rendering while waiting for data
  if (!finalRisingStar) {
    return <div>Loading...</div>;
  }

  const { artist_image_url, channel_image_url, artist, genre, track_image_url, album, release_date, views, video_views, social_growth, artist_followers, video_id } = finalRisingStar;

  return (
    <section className="ml-0 pt-6 bg-gray-50 flex flex-col items-center w-full">
      <div className="bg-gray-100 text-gray-700 px-4 py-2 w-[90%] max-w-[800px] mb-7">
          <h1 className="font-semibold">MediaMatch Artist of Your Choice at <a href={process.env.NEXT_PUBLIC_BEATSEER_AI_URL} className='underline'>www.Bearseer.com</a></h1>
        </div>
      <div className="bg-[#B795D4] text-white flex items-center justify-center text-center h-10 w-[90%] max-w-[800px]">
        <h2 className="text-base font-semibold">Meet This Week's Rising Star</h2>
      </div>
  
      <div className="w-[90%] max-w-[800px] mx-auto bg-white border border-gray-300 p-4 rounded-md shadow-md">
        <div className="flex flex-wrap items-start">
          {/* Artist Image */}
          <div className="w-full sm:w-1/3 md:w-1/4 p-3 flex justify-center">
            <img
              src={artist_image_url || channel_image_url}
              alt={artist}
              className="w-full h-full rounded-lg object-cover"
            />
          </div>
  
          {/* Artist Details */}
          <div className="w-full sm:w-2/3 md:w-3/4 p-3">
            <h3 className="text-lg font-bold text-green-500 mb-1">{artist}</h3>
            <p className="text-sm text-gray-500 mb-3">Genre: {genre || "Classic"}</p>
  
            {/* Most Popular Track */}
            <h4 className="font-semibold">Most Popular Track</h4>
            <div className="flex items-center mt-3">
              {/* Track Image */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 p-2">
                <img
                  src={track_image_url}
                  alt={album}
                  className="rounded-lg object-cover w-full h-full"
                />
              </div>
  
              {/* Track Details */}
              <div className="pl-4">
                <p className="font-bold">"{album}"</p>
                <p className="text-sm text-gray-500">Released: {release_date ? new Date(release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : "NA"}</p>
                <p className="text-sm">{formatNumber(video_views || 0)} plays</p>
              </div>
            </div>
          </div>
        </div>
  
        {/* Video Section */}
        <div className="flex justify-center mt-5">
          <iframe
            className="w-full md:w-[640px] h-[180px] sm:h-[225px] md:h-[360px]"
            src={`https://www.youtube.com/embed/${video_id}`}
            title={album || 'YouTube Video'}
            allowFullScreen
          ></iframe>
        </div>
  
        {/* Artist Metrics */}
        <h2 className="text-xl mt-6 font-semibold text-center">Artist Metrics</h2>
        <div className="flex justify-center items-center text-center mt-4 gap-5 sm:gap-10">
          <div className="text-center bg-gray-200 p-4 rounded-xl w-24 sm:w-32">
            <p className="font-bold text-green-500">{formatNumber(views || 0)}</p>
            <p className="text-sm text-gray-700">Total Plays</p>
          </div>
          <div className="text-center px-2 bg-gray-200 p-4 rounded-xl w-24 sm:w-32">
            <p className="font-bold text-green-500">{social_growth || "NA"}%</p>
            <p className="text-sm text-gray-700">Engagement Rate</p>
          </div>
          <div className="text-center bg-gray-200 p-4 rounded-xl w-24 sm:w-32">
            <p className="font-bold text-green-500">{formatNumber(artist_followers || 0)}</p>
            <p className="text-sm text-gray-700">Followers</p>
          </div>
        </div>
   
      </div>
    </section>
  );
};

export default RisingStar;
