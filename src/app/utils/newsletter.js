import nodemailer from "nodemailer";
import { connectToDatabase } from "../utils/db.js";
import { generateNewsletterHtml } from "./generateNewsletterHtml.js";

// Email transporter setup
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,  // Use 587 instead of 465
  secure: false, // false for TLS, true for SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function fetchMusicTrendsFromDB() {
  const db = await connectToDatabase();
  const newsletter = db.collection("newsletter"); // Name of the collection

  const [trends] = await newsletter.find().sort({ createdAt: -1 }).limit(1).toArray();
  if (!trends) throw new Error("No newsletter data found.");

  trends.top_5_emerging_artists = formatMonthlyStreams(
    sortBySocialGrowthDescending(trends.top_5_emerging_artists)
  );

  return trends;
function sortBySocialGrowthDescending(data) {
  return [...data].sort((a, b) => b.social_growth - a.social_growth);
}

function formatMonthlyStreams(data) {
  return data.map((item) => ({
    ...item,
    monthly_streams:
      item.monthly_streams >= 1_000_000
        ? `${(item.monthly_streams / 1_000_000).toFixed(1)}M`
        : item.monthly_streams >= 1_000
        ? `${(item.monthly_streams / 1_000).toFixed(1)}k`
        : item.monthly_streams.toString(),
  }));
}

}

export async function sendNewsletterToUsers(message) {
    try {
      const db = await connectToDatabase();
      const collection = db.collection("subscribers");
      const users = await collection.find({subFlag: 1}).toArray();
      if (!users.length) return console.log("No active subscribers found.");

      const trends = await fetchMusicTrendsFromDB();

      const emailPromises = users.map(async (user) => {
      try {
        const unsubscribeUrl = `${process.env.FRONTEND}/unsubscribe?unsubToken=${user.unsubToken}`;
        const html = generateNewsletterHtml({ message, trends, unsubscribeUrl });
        await transporter.sendMail({
          from: `"Beatseer" <${process.env.EMAIL_USER}>`,
          to: user.email,
          subject: "Latest Newsletter",
          html,
        });
        console.log('email sent')
        await collection.updateOne(
          { email: user.email },
          { $push: { newsLetterSent: message } }
        );
        console.log('collection update')
        

      } catch (error) {
        console.error(`Error sending newsletter to ${user.email}:`, error);
        throw new Error("Failed to send newsletter");
      }
    });

    await Promise.all(emailPromises);
    console.log(`${users.length} newsletters sent successfully.`);

  } catch (error) {
    console.error("Error sending newsletters:", error);
    throw new Error("Failed to send newsletter to users");
  }
}


export async function sendNewsletterToUser(email, message) {
    try {
      const trends = await fetchMusicTrendsFromDB();
      const db = await connectToDatabase();
      const collection = db.collection('subscribers');
      const user = await collection.findOne({ email: email, subFlag: 1 });
      const unsubscribeUrl = `${process.env.FRONTEND}/unsubscribe?unsubToken=${user.unsubToken}`;
      const html = generateNewsletterHtml({ message, trends, unsubscribeUrl });
      await transporter.sendMail({
        from: `"Beatseer" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: "Latest Newsletter",
        html,
      });
      console.log('email sent');
      
      await collection.updateOne(
        { email: user.email },
        {
          $push: { newsLetterSent: message }
        }
      );
  
    //   console.log(`Newsletter sent to: ${user.email}`);
    } catch (error) {
      console.error('Error sending newsletter:', error);
      throw new Error('Failed to send newsletter');
    }
}
