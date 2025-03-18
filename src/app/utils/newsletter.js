import nodemailer from "nodemailer";
import { connectToDatabase } from "../utils/db.js";

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
// // Function to fetch music trends from the database
// async function fetchMusicTrendsFromDB() {
//   const db = await connectToDatabase();
//   const newsletter = db.collection("newsletter"); // Name of the collection
//   const trends = await newsletter.find().toArray(); // Fetch all music trends from the collection
//   return trends; // Return the fetched data
// }

// Function to fetch the latest music trend from the database
async function fetchMusicTrendsFromDB() {
  const db = await connectToDatabase();
  const newsletter = db.collection("newsletter"); // Name of the collection

  const trends = await newsletter.find().sort({ createdAt: -1 }).limit(1).toArray(); 
  trends[0].top_5_emerging_artists = sortBySocialGrowthAscending(trends[0].top_5_emerging_artists);
  trends[0].top_5_emerging_artists = formatMonthlyStreams(trends[0].top_5_emerging_artists);

  return trends;
}

// Functions
function sortBySocialGrowthAscending(data) {
  return data.sort((a, b) => b.social_growth - a.social_growth);
}

function formatMonthlyStreams(data) {
  return data.map((item) => {
    const monthlyStreams = item.monthly_streams;
    let formattedStreams;

    if (monthlyStreams >= 1_000_000) {
      formattedStreams = `${(monthlyStreams / 1_000_000).toFixed(1)}M`;
    } else if (monthlyStreams >= 1_000) {
      formattedStreams = `${(monthlyStreams / 1_000).toFixed(1)}k`;
    } else {
      formattedStreams = monthlyStreams.toString();
    }

    return {
      ...item,
      monthly_streams: formattedStreams,
    };
  });
}

function generateTrendsHtml(trends) {
  return trends.map(trend => {
  return `
    <div style="margin: 20px; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
      <h3 style="color: #2c3e50; font-family: Arial, sans-serif; margin-bottom: 10px;">Top Genres:</h3>
      <ul style="list-style-type: none; padding: 0; margin-bottom: 20px;">
        ${trend.top5_upward_genres.map(
          genre => `
            <li style="margin-bottom: 5px; font-size: 14px;">
              <span style="font-weight: bold;">${genre.genre}</span> 
              <span style="color: #27ae60;">${genre.trending_percent}%</span>
            </li>`
        ).join("")}
      </ul>
      <h3 style="color: #2c3e50; font-family: Arial, sans-serif; margin-bottom: 10px;">Downward Genres:</h3>
      <ul style="list-style-type: none; padding: 0; margin-bottom: 20px;">
        ${trend.top5_downward_genres.map(
          genre => `
            <li style="margin-bottom: 5px; font-size: 14px;">
              <span style="font-weight: bold;">${genre.genre}</span>
              <span style="color: #c0392b;">${genre.trending_percent}%</span>
            </li>`
        ).join("")}
      </ul>
      <h3 style="color: #2c3e50; font-family: Arial, sans-serif; margin-bottom: 10px;">Top Artists:</h3>
      <ul style="list-style-type: none; padding: 0; margin-bottom: 20px;">
        ${trend.top5_upward_artists.map(
          artist => `
            <li style="margin-bottom: 5px; font-size: 14px;">
              <span style="font-weight: bold;">${artist.artist}</span>
              <span style="color: #27ae60;">${artist.trending_percent}%</span>
            </li>`
        ).join("")}
      </ul>
      <h3 style="color: #2c3e50; font-family: Arial, sans-serif; margin-bottom: 10px;">Downward Artists:</h3>
      <ul style="list-style-type: none; padding: 0; margin-bottom: 20px;">
        ${trend.top5_downward_artists.map(
          artist => `
            <li style="margin-bottom: 5px; font-size: 14px;">
              <span style="font-weight: bold;">${artist.artist}</span>
              <span style="color: #c0392b;">${artist.trending_percent}%</span>
            </li>`
        ).join("")}
      </ul>
      <h3 style="color: #2c3e50; font-family: Arial, sans-serif; margin-bottom: 10px;">Emerging Artists:</h3>
      <ul style="list-style-type: none; padding: 0; margin-bottom: 20px;">
        ${trend.top_5_emerging_artists.map(artist => `
          <li style="margin-bottom: 10px; font-size: 14px;">
            <b style="font-size: 16px; color: #2980b9;">${artist.artist}</b>
            <br><span style="color: #34495e;">Social Growth:</span> ${artist.social_growth}%
            <br><span style="color: #34495e;">Monthly Streams:</span> ${artist.monthly_streams}
            <br><span style="color: #34495e;">Engagement:</span> ${artist.engagement}
          </li>
        `).join("")}
      </ul>
      <h3 style="color: #2c3e50; font-family: Arial, sans-serif; margin-bottom: 10px;">Established Artists for Film (Next 18 Months):</h3>
      <ul style="list-style-type: none; padding: 0; margin-bottom: 20px;">
        ${trend.established_artists_for_film.map(artist => `
          <li style="margin-bottom: 10px; font-size: 14px;">
            <b style="font-size: 16px; color: #2980b9;">${artist.name}</b>
            <br><span style="color: #34495e;">Projected Growth:</span> ${artist.projected_growth}%
            <br><span style="color: #34495e;">Genre:</span> ${artist.genre}
            <br><span style="color: #34495e;">Genre Compatibility:</span> ${artist.genre_compatibility}
          </li>
        `).join("")}
      </ul>
      <h3 style="color: #2c3e50; font-family: Arial, sans-serif; margin-bottom: 10px;">Emerging Artists for Film (Next 18 Months):</h3>
      <ul style="list-style-type: none; padding: 0; margin-bottom: 20px;">
        ${trend.emerging_artists_for_film.map(artist => `
          <li style="margin-bottom: 10px; font-size: 14px;">
            <b style="font-size: 16px; color: #2980b9;">${artist.name}</b>
            <br><span style="color: #34495e;">Projected Growth:</span> ${artist.projected_growth}%
            <br><span style="color: #34495e;">Genre:</span> ${artist.genre}
            <br><span style="color: #34495e;">Genre Compatibility:</span> ${artist.genre_compatibility}
          </li>
        `).join("")}
      </ul>
    </div>
  `;
}).join("");
}

export async function sendNewsletterToUsers(message) {
    try {
      const db = await connectToDatabase();
      const collection = db.collection("subscribers");
      const users = await collection.find({subFlag: 1}).toArray();
      if (users.length === 0) {
        console.log("No users found with subFlag = 1.");
        return;
      }
      // console.log("ALL subFlag1 users", users);

      const trends = await fetchMusicTrendsFromDB();
      const trendsHtml = generateTrendsHtml(trends);
      const emailPromises = users.map(async user => {
      try {
        const unsubscribeUrl = `${process.env.FRONTEND}/unsubscribe?unsubToken=${user.unsubToken}`;

        const htmlContent = `
        <h1>${message}</h1>
        <p>Here are the latest music trends for you:</p>
        ${trendsHtml}
        <p>Stay tuned for more updates!</p>

        <p>If you no longer wish to receive updates, click the link below to unsubscribe:</p>
        <a href="${unsubscribeUrl}" className="text-black underline">
            Unsubscribe
        </a>
      `;
        console.log('start sending email')
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: user.email,
          subject: "Latest Newsletter",
          html: htmlContent,
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
    console.log("Newsletter sent to all users.");

  } catch (error) {
    console.error("Error sending newsletters:", error);
    throw new Error("Failed to send newsletter to users");
  }
}


export async function sendNewsletterToUser(email, message, html) {
    try {
      const trends = await fetchMusicTrendsFromDB();
      const trendsHtml = generateTrendsHtml(trends);

      const db = await connectToDatabase();
      const collection = db.collection('subscribers');
      const user = await collection.findOne({ email: email, subFlag: 1 });
      const unsubToken = user.unsubToken
      

      const unsubscribeUrl = `${process.env.FRONTEND}/unsubscribe?unsubToken=${unsubToken}`;
      const htmlContent = `
      <h1>${message}</h1>
      <p>Here are the latest music trends for you:</p>
      ${trendsHtml}
      <p>Stay tuned for more updates!</p>

      <p>If you no longer wish to receive updates, click the link below to unsubscribe:</p>
      <a href="${unsubscribeUrl}" className="text-black underline">
        Unsubscribe
      </a>
    `;
      console.log('sending email')
      await transporter.sendMail({
        from: process.env.EMAIL_USER, 
        to: user.email,
        subject: "Latest Newsletter",
        html: htmlContent,
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
