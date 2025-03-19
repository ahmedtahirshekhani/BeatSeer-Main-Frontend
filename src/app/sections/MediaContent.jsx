"use client"
import { useState, useEffect } from "react";
import TrendingGenres from "./TrendingGenres";
import EstablishedArtists from "./EstablishedArtists";
import EmergingArtists from "./EmergingArtists";
import MediaProjects from "./MediaProjects";
import RisingStar from "./RisingStart";


export default function MediaContent() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [emerging_artists_bs_ai, setEmergingArtistsBsAi] = useState([]);


  // Fetch artists from the API
  const fetchArtists = async () => {
    const res = await fetch("/api/bs_ai_emerging_artist_list");
    const data_ea = await res.json();
    console.log("Fetched artists:", data_ea.emerging_artists);
    return data_ea.emerging_artists
  };





  useEffect(() => {
    const fetchData = async () => {
      try {
        const role = window.location.pathname.includes("admin") ? "admin" : "user"; // Determine role from URL
        console.log(role);
        
        const response = await fetch(`/api/data?role=${role}`);
        // console.log("RESPONSE::", response);
        
        const result = await response.json();
        // console.log("Result:", result);
        // console.log("Top5 Emerging data:", result?.[0]?.top_5_emerging_artists );
        result[0].top_5_emerging_artists = sortBySocialGrowthAscending(result[0]?.top_5_emerging_artists);
        result[0].top_5_emerging_artists = formatMonthlyStreams(result[0]?.top_5_emerging_artists);
        setEmergingArtistsBsAi(await fetchArtists());
        setData(result); 
        setLoading(false);


      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        {/* Loader: Tailwind-based spinning circle */}
        <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }
  
  // Functions
function sortBySocialGrowthAscending(data) {
  return data.sort((a, b) => b.social_growth - a.social_growth);
}

function formatMonthlyStreams(data) {
  return data.map((item) => {
    const monthlyStreams = item.monthly_streams;
    let formattedStreams;

    if (monthlyStreams >= 1_000_000) {
      formattedStreams = `${(monthlyStreams / 1_000_000).toFixed(1)}M`;
    } else if (monthlyStreams >= 1_000) {
      formattedStreams = `${(monthlyStreams / 1_000).toFixed(1)}k`;
    } else {
      formattedStreams = monthlyStreams.toString();
    }

    return {
      ...item,
      monthly_streams: formattedStreams,
    };
  });
}
  // if (data ) {
  //   console.log("Top 5 Upward Established Artists:", data[0].top5_upward_artists);
  // }
    
    return (
      <div className="items-center justify-center">
      {/* Pass the fetched data as props to child components */}
      {data && (
        <>
          <TrendingGenres genres={data} />
          <EstablishedArtists artists={data} />
          <EmergingArtists artists={data?.[0]?.top_5_emerging_artists} />
          {/* <MediaProjects /> */}
          <MediaProjects projects={data} emerging_artists_bs_ai_list={emerging_artists_bs_ai} />
          <RisingStar artists={data?.[0]?.top_5_emerging_artists} />
        </>
      )}
    </div>
  );
  // return <div>No data available.</div>; // Optionally handle case when there's no data
}
