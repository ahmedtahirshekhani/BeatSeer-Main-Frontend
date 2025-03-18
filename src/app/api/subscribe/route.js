import { connectToDatabase } from "../../utils/db.js";
import crypto from 'crypto';

export async function POST(req) {
  const { name, email } = await req.json();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return new Response(
      JSON.stringify({ error: "Invalid email format" }),
      { status: 400 }
    );
  }
  const subFlag = 1;
  if (!name || !email) {
    return new Response(
      JSON.stringify({ error: "Name and email are required" }),
      { status: 400 }
    );
  }

  try {
    const db = await connectToDatabase();
    const collection = db.collection("subscribers");

    const existingSubscriber = await collection.findOne({ email });
    if (existingSubscriber) {
      return new Response(
        JSON.stringify({ error: "This email is already subscribed" }),
        { status: 409 } // Conflict
      );
    }
    const hash = (input) => {
      return crypto.createHash('sha256').update(input).digest('hex');
    };
    
    const unsubToken = hash(email + subFlag);
    const result = await collection.insertOne({
      name,
      email,
      subFlag,
      unsubToken,
      newsLetterSent: []
    });

    return new Response(
      JSON.stringify({ message: "Subscription successful", result }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to save to database" }),
      { status: 500 }
    );
  }
}
