import { MongoClient, ObjectId  } from 'mongodb';

const uri = process.env.MONGODB_URI;
let client;
let db;

async function connectToDatabase() {
  if (db) return { db };

  client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  db = client.db();
  return { db };
}

// Handle GET request
export async function GET() {
  try {
    const { db } = await connectToDatabase();
    // console.log("Fetching users...");

    const users = await db.collection('subscribers').find().toArray();
    // console.log("Fetched users:", users);
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return new Response('Error fetching users', { status: 500 });
  }
}

// Handle DELETE request
export async function DELETE(req) {
  try {
    const { db } = await connectToDatabase();
    const { id } = await req.json();  // Expecting the user id to be passed in the request body

    // Use the ObjectId imported from 'mongodb' to cast the string ID into an ObjectId
    const result = await db.collection('subscribers').deleteOne({ _id: new ObjectId(id) });
    // if (result.deletedCount === 0) {
    //   return new Response('User not found', { status: 404 });
    // }
    return new Response('User deleted successfully', { status: 200 });
  } catch (error) {
    console.error('Error deleting user:', error);
    return new Response('Error deleting user', { status: 500 });
  }
}
