import { connectToDatabase } from "../../utils/db.js";

export async function PUT(req) {
  // Extract unsubToken from the URL parameter
  const url = new URL(req.url);
  const unsubToken = url.searchParams.get('unsubToken');

  if (!unsubToken) {
    return new Response(
      JSON.stringify({ error: "UnsubToken is required" }),
      { status: 400 }
    );
  }

  try {
    const db = await connectToDatabase();
    const collection = db.collection("subscribers");

    const result = await collection.findOneAndUpdate(
      { unsubToken },  // Filter condition
      { $set: { subFlag: 0 } },  // Update operation
    );

    // console.log("RESULT:", result);

    if (result) {
      // Simulate successful unsubscription
      return new Response(JSON.stringify({ message: 'Unsubscribed successfully!' }), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ message: 'Invalid token' }), { status: 400 });
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to unsubscribe" }),
      { status: 400 }
    );
  }
}

