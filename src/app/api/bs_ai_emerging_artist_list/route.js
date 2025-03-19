import { connectToDatabase } from "../../utils/db.js";

export async function POST(request) {
    const db = await connectToDatabase();
    const collection = db.collection("bs_ai_emerging_artist_list");
    const collection2 = db.collection("newsletter");
    // last entry
    const lastEntry = await collection2
      .find()
      .sort({ _id: -1 })
      .limit(1)
      .toArray();

    
    const previousEmergingArtistsForFilm = lastEntry[0]?.emerging_artists_for_film;

    const data = await collection.findOne({});
    const emerging_artists_bs_ai_list = data.emerging_artists;
      // lower case
    const filter_list_index = emerging_artists_bs_ai_list.map(artist => artist.toLowerCase());

    const filtered_emerging_artists = previousEmergingArtistsForFilm
        .map((artist, index) => ({ artist, index })) // Keep original index
        .filter(({ artist }) => !filter_list_index.includes(artist.name.toLowerCase())); // Filter out unwanted artists


    // lower case

    const doc = await collection.findOne({});
    let emergingArtists = doc ? doc.emerging_artists : [];

    // Maintain FIFO behavior
    emergingArtists.push(filtered_emerging_artists[0].artist.name);
    if (emergingArtists.length > 4) {
      emergingArtists.shift(); // Remove oldest artist
    }
    console.log("emergingArtists", emergingArtists);

    // Update database
    await collection.updateOne({}, { $set: { emerging_artists: emergingArtists } }, { upsert: true });

    return new Response("Artist added successfully", { status: 200 });
}

export async function GET(request) {
    const db = await connectToDatabase();
    const collection = db.collection("bs_ai_emerging_artist_list");
    const doc = await collection.findOne({});
    return new Response(JSON.stringify(doc), { status: 200 });
}


  