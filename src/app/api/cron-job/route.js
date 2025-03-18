import { NextResponse } from "next/server";
import axios from "axios";
import { connectToDatabase } from "../../utils/db.js";

export async function GET() {
  try {
    const apiKey = await fetch(`${process.env.FRONTEND}/admin/api/credentials`);
    const data = await apiKey.json();

    const apiResponse = await axios.get(`${process.env.BACKEND}/news-letter`, {
      params: {
        youTubeApiKey: data?.YouTube?.YouTubeAPI,
        spotify_CLIENT_ID: data?.Spotify?.clientId,
        spotify_CLIENT_SECRET: data?.Spotify?.clientSecret,
      },
    });

    let newsletterData = apiResponse.data;

    if (apiResponse.status === 200 && newsletterData) {
      const db = await connectToDatabase();
      const collection = db.collection("newsletter");
      await collection.insertOne({
        ...newsletterData,
        createdAt: new Date(),
      });
      console.log("Data successfully inserted into the database.");
    } else {
      throw new Error("Invalid response from news-letter API");
    }

    // Send the newsletter
   const sendResponse = await fetch(`${process.env.FRONTEND}/admin/api/send-newsletter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "This Week Trendings",
        userId: null,
      }),
    });


    const result = await sendResponse.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in cron job API:", error);
  }
}
