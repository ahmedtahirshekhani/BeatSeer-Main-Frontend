'use client'
import { useEffect } from 'react'
import Script from 'next/script'

export default function ShareButtons() {

  return (
    <>
      <Script
        src="https://platform-api.sharethis.com/js/sharethis.js#property=680d18eec29a97001a8911ef&product=inline-share-buttons&source=platform"
        strategy="afterInteractive"
      />
      <div className="sharethis-inline-share-buttons bg-gray-200 h-16 py-4 text-center w-[90%] max-w-[800px] mx-auto"></div>
    </>
  )
}
