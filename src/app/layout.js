import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from './components/Header';
import NewsletterSignup from "./components/NewsletterSignup";
import ClientSideNewsletterSignup from './components/ClientSideNewsletterSignup';

export const metadata = {
  title: "Beat Seer",
  description: "Music's AI Intelligence: Artist Trends & Long-Range Media Placement Recommendations",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <ClientSideNewsletterSignup />
      </body>
    </html>
  );
}
