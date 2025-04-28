'use client'
import { useState, useEffect } from 'react'
import {
  FaLinkedin,
  FaInstagram,
  FaSnapchatGhost,
  FaEnvelope,
  FaShareAlt,
  FaPrint,
  FaFacebook
} from 'react-icons/fa'
import { TbBrandX } from 'react-icons/tb'
export default function CustomShare() {
  const [shareUrl, setShareUrl] = useState('')
  const [showOptions, setShowOptions] = useState(false)

  useEffect(() => {
    setShareUrl(window.location.href)
  }, [])

  return (
    <div className="text-white justify-center w-[90%] max-w-[800px] py-4 shadow-md mx-auto bg-[#4682B4] text-center rounded">
      {/* Share button */}
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="bg-white text-[#4682B4] px-5 py-2 rounded-full font-semibold flex items-center justify-center gap-2 mx-auto hover:bg-gray-100 transition"
      >
        <FaShareAlt /> Share
      </button>

      {/* Share options */}
      {showOptions && (
        <div className="flex justify-center gap-4 flex-wrap mt-4">
          
          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition"
            aria-label="Share on Facebook"
          >
            <FaFacebook size={24} />
          </a>

          <a
            href={`https://x.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white p-3 rounded-full hover:bg-gray-900 transition"
            aria-label="Share on X"
          >
            <TbBrandX size={24} className="font-bold" />
          </a>

          {/* LinkedIn */}
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-700 text-white p-3 rounded-full hover:bg-blue-800 transition"
            aria-label="Share on LinkedIn"
          >
            <FaLinkedin size={24} />
          </a>
          

          {/* Instagram - Note: Limited sharing capability */}
          <a
            href={`https://instagram.com/?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full hover:from-purple-600 hover:to-pink-600 transition"
            aria-label="Share on Instagram"
          >
            <FaInstagram size={24} />
          </a>

          {/* Snapchat */}
          <a
            href={`https://www.snapchat.com/scan?attachmentUrl=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-400 text-white p-3 rounded-full hover:bg-yellow-500 transition"
            aria-label="Share on Snapchat"
          >
            <FaSnapchatGhost size={24} />
          </a>

          {/* Gmail */}
          <a
            href={`https://mail.google.com/mail/?view=cm&to=&body=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition"
            aria-label="Share via Email"
          >
            <FaEnvelope size={24} />
          </a>

          {/* Print */}
          <button
            onClick={() => window.print()}
            className="bg-slate-800 text-white p-3 rounded-full hover:bg-slate-900 transition"
            aria-label="Print page"
          >
            <FaPrint size={24} />
          </button>
        </div>
      )}
    </div>
  )
}