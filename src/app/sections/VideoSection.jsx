import { useState, useEffect } from "react";

const VideoSection = ({ video_id, track_image_url, album }) => {
  const [embedAllowed, setEmbedAllowed] = useState(true);
  const [youtubeApiKey, setYoutubeApiKey] = useState("");

  useEffect(() => {
    const fetchApiKeyAndCheckEmbedding = async () => {
      try {
        // Fetch YouTube API key from backend
        const keyResponse = await fetch("/admin/api/credentials"); // Adjust endpoint
        const keyData = await keyResponse.json();

        if (!keyData) throw new Error("API Key not found");

        setYoutubeApiKey(keyData.YouTube.YouTubeAPI);
        console.log(`https://www.googleapis.com/youtube/v3/videos?id=${video_id}&part=status&key=${youtubeApiKey}`);
        
        // Check if the video is embeddable
        const embedResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?id=${video_id}&part=status&key=${youtubeApiKey}`
        );
        const embedData = await embedResponse.json();

        if (!embedData.items || embedData.items.length === 0 || !embedData.items[0].status.embeddable) {
          setEmbedAllowed(false);
        }
      } catch (error) {
        console.error("Error:", error);
        setEmbedAllowed(false);
      }
    };

    fetchApiKeyAndCheckEmbedding();
  }, [video_id]);

  return (
    <div className="flex justify-center mt-5">
      {embedAllowed ? (
        <iframe
          className="w-full md:w-[640px] h-[180px] sm:h-[225px] md:h-[360px]"
          src={`https://www.youtube.com/embed/${video_id}`}
          title={album || "YouTube Video"}
          allowFullScreen
        ></iframe>
      ) : (
        <a href={`https://www.youtube.com/watch?v=${video_id}`} target="_blank" rel="noopener noreferrer">
          <img src={track_image_url} alt={album || "Track Image"} className="w-full md:w-[640px] h-auto rounded-lg" />
        </a>
      )}
    </div>
  );
};

export default VideoSection;
