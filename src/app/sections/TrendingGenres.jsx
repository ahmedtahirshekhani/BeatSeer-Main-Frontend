export default function TrendingGenres({ genres }) {
  // Check if genres is defined and structured as expected
  const upwardGenres = genres?.[0]?.top5_upward_genres || [];
  const downwardGenres = genres?.[0]?.top5_downward_genres || [];

  // console.log("upwardGenres", upwardGenres);
  // console.log("downwardGenres", downwardGenres);

  return (
    <section className="font-serif ml-0 pt-6 bg-gray-50 flex flex-col items-center w-full">
      <div className="bg-[#B795D4] text-white flex items-center justify-center text-center h-10 w-[90%] max-w-[800px]">
      <h2 className="text-base font-semibold ">Why Subscribe to Beatseer Newsletter</h2>
    </div>

    {/* Introduction Text */}
    <div className="w-[90%] max-w-[800px] mx-auto bg-white border border-gray-300 p-6 rounded-md shadow-md mt-2">
      <p className="text-base text-gray-700">
        What sets us apart isn’t just data—it’s actionable intelligence. While others report on yesterday, we’re forecasting tomorrow.
      </p>
      <p className="text-base text-gray-700 mt-4">
        Stay ahead of the curve with exclusive AI-generated insights no one else has. Our proprietary AI algorithms predict industry trends 18-24 months in advance, identifying breakthrough artists for upcoming media projects before they hit mainstream.
      </p>
      <p className="text-base text-gray-700 mt-4">
        Whether you’re a music supervisor seeking tomorrow’s sound, a producer tracking new trends, a singer seeking proprietary AI-assisted vocal coaching, or a fan discovering future hits, Beatseer doesn’t just inform—it transforms your entire approach to the music landscape.
      </p>
      <p className="text-base text-gray-700 mt-4">
        Visit <a href={process.env.NEXT_PUBLIC_BEATSEER_AI_URL} className="text-blue-500">www.Beatseer.com</a> for customized artist reports and AI vocal coaching that give you the competitive edge in today’s rapidly evolving industry.
      </p>
      <p className="text-base text-gray-700 mt-4">
        If you value these insights, please share this free subscription with colleagues and friends who deserve to be ahead of the curve.
      </p>
    </div>
      {/* Subheader */}
      {/* <div className="bg-[#B795D4] text-white flex items-center justify-center text-center h-10 w-[90%] max-w-[800px]">
        <h2 className="text-base font-semibold">Music Genres Trends</h2>
      </div> */}
  
      {/* Content Space 1: Trending Upwards Section */}
      {/* <div className="w-[90%] max-w-[800px] mx-auto bg-white border border-gray-300 p-4 rounded-md shadow-md">
        <h3 className="text-base font-semibold mb-2 text-green-600 text-center">
          Top Music Genres Trending Upwards
        </h3>
        <div className="flex gap-4 lg:gap-6 overflow-x-auto px-4 snap-x snap-mandatory sm:justify-start md:justify-center">
          {upwardGenres.map((item, index) => (
            <div
              key={index}
              className="pb-1 flex-none w-[50%] sm:w-[30%] md:w-[20%] lg:w-[15%] bg-gray-100 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300 p-2 snap-start"
            >
              <h4 className="font-semibold text-sm text-center">
                {item?.genre
                  ? item.genre
                      .split(' ')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                      .join(' ')
                  : "Classic-Up"}
              </h4>

              <p className="text-green-500 text-xs text-center font-medium">
                {item?.trending_percent ? `↑ ${item.trending_percent}%` : "Classic-Up"}
              </p>
            </div>
          ))}
        </div>
      </div> */}
  
      {/* Content Space 2: Trending Downwards Section */}
      {/* <div className="w-[90%] max-w-[800px] mx-auto mt-5 bg-white border border-gray-300 p-4 rounded-md shadow-md">
        <h3 className="text-base font-semibold mb-2 text-red-600 text-center">
          Music Genres Trending Downwards
        </h3>
        <div className="flex gap-4 lg:gap-6 overflow-x-auto px-4 snap-x snap-mandatory sm:justify-start md:justify-center">
          {downwardGenres.map((item, index) => (
            <div
              key={index}
              className="pb-1 flex-none w-[50%] sm:w-[30%] md:w-[20%] lg:w-[15%] bg-gray-100 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300 p-2 snap-start"
            >
              <h4 className="font-semibold text-sm text-center">
                {item?.genre
                  ? item.genre
                      .split(' ')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                      .join(' ')
                  : "Classic-Down"}
              </h4>

              <p className="text-red-500 text-xs text-center font-medium">
                {item?.trending_percent ? `↓ ${item.trending_percent}%` : "Classic-Down"}
              </p>
            </div>
          ))}
        </div>
      </div>  */}
    </section>
  );
}
