export default function TrendingGenres({ genres }) {
  // Check if genres is defined and structured as expected
  const upwardGenres = genres?.[0]?.top5_upward_genres || [];
  const downwardGenres = genres?.[0]?.top5_downward_genres || [];

  // console.log("upwardGenres", upwardGenres);
  // console.log("downwardGenres", downwardGenres);

  return (
    <section className="ml-0 pt-6 bg-gray-50 flex flex-col items-center w-full">
      {/* Subheader */}
      <div className="bg-[#B795D4] text-white flex items-center justify-center text-center h-10 w-[90%] max-w-[800px]">
        <h2 className="text-base font-semibold">Music Genres Trends</h2>
      </div>
  
      {/* Content Space 1: Trending Upwards Section */}
      <div className="w-[90%] max-w-[800px] mx-auto bg-white border border-gray-300 p-4 rounded-md shadow-md">
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
                {item?.genre ? item.genre.charAt(0).toUpperCase() + item.genre.slice(1) : "General-Up"}
              </h4>
              <p className="text-green-500 text-xs text-center font-medium">
                {item?.trending_percent ? `↑ ${item.trending_percent}%` : "General-Up"}
              </p>
            </div>
          ))}
        </div>
      </div>
  
      {/* Content Space 2: Trending Downwards Section */}
      <div className="w-[90%] max-w-[800px] mx-auto mt-5 bg-white border border-gray-300 p-4 rounded-md shadow-md">
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
                {item?.genre ? item.genre.charAt(0).toUpperCase() + item.genre.slice(1) : "General-Down"}
              </h4>
              <p className="text-red-500 text-xs text-center font-medium">
                {item?.trending_percent ? `↓ ${item.trending_percent}%` : "General-Down"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
