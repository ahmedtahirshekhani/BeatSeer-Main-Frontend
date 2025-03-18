import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
let cachedClient = null;

export async function connectToDatabase() {
  if (!cachedClient) {
    const client = new MongoClient(uri);
    await client.connect();
    cachedClient = client.db();
    console.log("Connected to database");
  }
  return cachedClient;
}
