"use client";

import React from "react";
import DateComponent from "./DateComponent";

// Helper function to format the current date
const formatDate = () => {
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  const currentDate = new Date();
  return currentDate.toLocaleDateString('en-US', options);
};
let date = formatDate();
export default function Header() {
  return (
    // <header className="bg-[#4682B4] text-white w-full top-0 z-50 shadow-md h-16 md:h-20 flex items-center justify-center overflow-hidden">
    <header className="bg-[#1d374c] text-white w-[90%] max-w-[800px] top-0 z-50 shadow-md h-30 md:h-36 flex items-center justify-center overflow-hidden mx-auto pb-2">
      <nav className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center max-w-xs md:max-w-none mx-auto">
          {/* <h1 className="text-base md:text-2xl font-extrabold">
            BeatSeer
          </h1> */}
          <img src="/images/newlogoWithName.png" alt="BeatSeer Logo" className="h-16 md:h-20 p-2" />
          {/* <h2 className="text-xs md:text-lg leading-tight md:leading-normal">
            AI-Powered Music & Artist Trends + Future Screen Placement Intelligence
          </h2> */}
          <DateComponent />
        </div>
      </nav>
    </header>
  );
}
