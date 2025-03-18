import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

const CredentialSchema = new mongoose.Schema({
  Spotify: {
    clientId: { type: String, required: true },
    clientSecret: { type: String, required: true },
  },
  YouTube: {
    YouTubeAPI: { type: String, required: true },
  },
  SoundCloud: {
    clientId: { type: String, required: true },
    clientSecret: { type: String, required: true },
  },
});

const Credential = mongoose.models.Credential || mongoose.model("Credential", CredentialSchema);

export async function GET(req) {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(uri);
  }

  const credentials = await Credential.findOne();
  return new Response(
    JSON.stringify(credentials || {}), 
    { status: 200 }
  );
}

export async function POST(req) {
  const { Spotify, YouTube, SoundCloud } = await req.json();

  if (!Spotify || !Spotify.clientId || !Spotify.clientSecret) {
    return new Response(
      JSON.stringify({ message: "Spotify credentials are required" }),
      { status: 400 }
    );
  }

  if (!YouTube || !YouTube.YouTubeAPI) {
    return new Response(
      JSON.stringify({ message: "YouTube credentials are required" }),
      { status: 400 }
    );
  }

  if (!SoundCloud || !SoundCloud.clientId || !SoundCloud.clientSecret) {
    return new Response(
      JSON.stringify({ message: "SoundCloud credentials are required" }),
      { status: 400 }
    );
  }
  // console.log('Received credentials:', { Spotify, YouTube, SoundCloud })
  if (!mongoose.connection.readyState) {
    await mongoose.connect(uri);
  }
  
  const result = await Credential.findOneAndUpdate(
    {},
    { Spotify, YouTube, SoundCloud },
    { upsert: true, new: true }
  );

  // console.log('Saved credentials:', result);

  return new Response(
    JSON.stringify({ message: 'Saved successfully', data: result }),
    { status: 200 }
  );
}