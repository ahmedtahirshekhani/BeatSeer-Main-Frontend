import { connectToDatabase } from "../../utils/db.js";

export async function GET() {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('newsletter');

    const secondLastNewsletter = await collection
      .find()
      .sort({ _id: -1 })
      .skip(1) 
      .limit(1)
      .toArray();

    //   console.log("secondLastNewsletter", secondLastNewsletter[0]);
      
    if (secondLastNewsletter.length > 0) {
        const previousEmergingArtists = secondLastNewsletter[0]?.top_5_emerging_artists;
        const previousRisingStar = previousEmergingArtists.sort((a, b) => (b.video_views || 0) - (a.video_views || 0))[0] || {};
        // console.log("previousRisingStar",previousRisingStar);
        
        return new Response(JSON.stringify(previousRisingStar), { status: 200 });
    } else {
        return new Response(JSON.stringify({ message: 'Second to last newsletter not found' }), { status: 404 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: 'An error occurred', error: error.message }), { status: 500 });
  }
}
