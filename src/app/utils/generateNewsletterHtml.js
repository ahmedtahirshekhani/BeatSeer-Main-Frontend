// generateNewsletterHtml.js
import { formatDate } from "../utils/date.js";
import { formatTrendsHtml } from "./newsletterHtml.js";

export function generateNewsletterHtml({ message, trends, unsubscribeUrl }) {
  const currentDate = formatDate(new Date());
  const trendsHtml = formatTrendsHtml([trends]);

  return `
    <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
      <!-- Header -->
      <div style="background-color: #1d374c; padding: 24px; text-align: center; border-radius: 8px 8px 0 0;">
        <img src="https://res.cloudinary.com/dmwl7yipj/image/upload/v1746914378/newlogoWithName_dizgws.png" alt="Beatseer Logo" style="height: 50px;">
        <h1 style="color: #ffffff; font-size: 24px; font-weight: 700; margin-top: 16px;">${message}</h1>
        <p style="color: #9ca3af; font-size: 14px; margin-top: 8px;">${currentDate}</p>
      </div>
      
      <!-- Main Content -->
      <div style="color: #1f2937;">
        <p style="font-size: 16px; line-height: 1.5; margin-bottom: 14px;">
          Here are the latest music trends for you
        </p>
        
        ${trendsHtml}
        
        <!-- CTA Section -->
        <div style="background-color: #eef2ff; border-radius: 8px; padding: 24px; text-align: center; margin: 14px 0;">
          <h2 style="font-size: 18px; font-weight: 700; margin-bottom: 12px; color: #1e40af;">
            The Week of ${currentDate} Beatseer Newsletter is now available online. Click below to access the latest insights and analysis.
          </h2>
          <p style="font-size: 14px; margin-bottom: 16px; color: #4b5563;">
            For maximum industry intelligence, consider visiting multiple times weekly. Unlike traditional newsletters, the Beatseer Newsletter pulls fresh recording artist data every time you open it, giving you a competitive edge with real-time insights.
          </p>
          <a href="${process.env.FRONTEND}" style="display: inline-block; background-color: #4f46e5; color: #ffffff; 
            font-weight: 600; padding: 12px 24px; border-radius: 6px; text-decoration: none;">
            Click Here
          </a>
        </div>
        
        <!-- Closing -->
        <p style="font-size: 15px; line-height: 1.6; color: #4b5563; margin-bottom: 24px;">
          Stay tuned for more updates!
        </p>
        
        <!-- Unsubscribe -->
        <div style="text-align: center; padding-top: 16px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
          <p style="margin-bottom: 8px;">
            If you no longer wish to receive updates, click the link below to unsubscribe:
            <a href="${unsubscribeUrl}" style="color: #4b5563; text-decoration: underline; font-weight: 500;">
              Unsubscribe
            </a>.
          </p>
        </div>
      </div>
    </div>
  `;
}
