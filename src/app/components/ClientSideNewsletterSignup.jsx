'use client'; // Mark this component as client-side

import { usePathname } from 'next/navigation'; // Use client-side hook to get pathname
import NewsletterSignup from './NewsletterSignup'; // Import your actual NewsletterSignup component

export default function ClientSideNewsletterSignup() {
  const pathname = usePathname();

  // Conditionally render NewsletterSignup if the current page is not "/unsubscribe"
  if (pathname === '/unsubscribe') return null; 

  return <NewsletterSignup />;
}
