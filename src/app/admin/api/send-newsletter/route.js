import { sendNewsletterToUsers } from "../../../utils/newsletter.js";

export async function POST(req) {
  const { message } = await req.json();

  if (!message) {
    return new Response(
      JSON.stringify({ error: "Message is required." }),
      { status: 400 }
    );
  }

  try {
    await sendNewsletterToUsers(message);
    
    return new Response(
      JSON.stringify({ message: "Newsletter sent to all users." }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to send the newsletter:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send the newsletter." }),
      { status: 500 }
    );
  }
}
