import { sendNewsletterToUser } from "../../../../utils/newsletter.js";

export async function POST(req, { params }) {
  const { email } = await params;
  const { message } = await req.json();
  console.log("Email and message:", email);
  
  if (!email || !message) {
    return new Response(
      JSON.stringify({ error: "Email and message are required." }),
      { status: 400 }
    );
  }

  try {
    await sendNewsletterToUser(email, message);
    return new Response(
      JSON.stringify({ message: `Newsletter sent to ${email}.` }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to send the newsletter.", error }),
      { status: 500 }
    );
  }
}
