// import data from "../../data/data.js"; // Correct path to your mock data
import { connectToDatabase } from "../../utils/db.js";
import axios from "axios";

// export async function GET() {
//   // This endpoint will serve the mock data as a JSON response
//   console.log("fetchingg");
  
//   return new Response(JSON.stringify(data), { status: 200 });
// }


export async function GET(request) {
  const url = new URL(request.url);
  const role = url.searchParams.get("role");

  try {
    // console.log("Processing request...");

    if (role === "admin") {
      try {
        const apiKey = await fetch(`${process.env.FRONTEND}/admin/api/credentials`);
        const data = await apiKey.json();
        // console.log("Youtube API:", data?.YouTube?.YouTubeAPI);
        // console.log("spotify_CLIENT_ID:", data?.Spotify?.clientId);
        // console.log("spotify_CLIENT_SECRET:", data?.Spotify?.clientSecret);
        const res = await axios.get(`${process.env.BACKEND}/news-letter`, {
          params: {
              youTubeApiKey: data?.YouTube?.YouTubeAPI, // Replace with your actual API key
              spotify_CLIENT_ID: data?.Spotify?.clientId, // Replace with your actual API key
              spotify_CLIENT_SECRET: data?.Spotify?.clientSecret, // Replace with your actual API key
          }
        });
        // console.log("API Response Data.:", res.data,);

        if (res && res.status === 200 && res.data) {
          const db = await connectToDatabase();
          const collection = db.collection("newsletter");
        
          await collection.insertOne({
            ...res.data,
            createdAt: new Date(),
          });
        
          console.log("Data successfully inserted into the database.");
        } else {
          console.error("Failed to fetch data or invalid response:", res);
        }

        // return new Response(JSON.stringify(res.data), { status: 200 });
          return new Response(
            JSON.stringify([
              {
                  top5_upward_genres: res.data.top5_upward_genres,
                  top5_downward_genres: res.data.top5_downward_genres,
                  top5_upward_artists: res.data.top5_upward_artists,
                  top5_downward_artists: res.data.top5_downward_artists,
                  top_5_emerging_artists: res.data.top_5_emerging_artists,
                  emerging_artists_for_film: res.data.emerging_artists_for_film,
                  established_artists_for_film: res.data.established_artists_for_film
                },
            ]),
            { status: 200 }
          );
      } catch (apiError) {
        console.error("API Error, falling back to DB:", apiError);
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Fetch from database as fallback
        const db = await connectToDatabase();
        const collection = db.collection("newsletter");

        const fallbackNewsletter = await collection.find().sort({ _id: -1 }).limit(1).toArray();
        // console.log("Fallback Newsletter Data:", fallbackNewsletter);

        return new Response(JSON.stringify(fallbackNewsletter), { status: 200 });
      }
    } else if (role === "user") {
        const db = await connectToDatabase();
        const collection = db.collection("newsletter");
        
        const newsletter = await collection.find().sort({ _id: -1 }).limit(1).toArray();
        // console.log("newsletter data:", newsletter);
      return new Response(JSON.stringify(newsletter), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: "Invalid role" }), { status: 400 });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}