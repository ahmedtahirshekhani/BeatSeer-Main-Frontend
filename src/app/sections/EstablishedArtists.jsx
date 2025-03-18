export default function EstablishedArtists({ artists }) {
  const upwardArtists = artists?.[0]?.top5_upward_artists || [];
  const downwardArtists = artists?.[0]?.top5_downward_artists || [];
  
  return (
    <section className="ml-0 pt-6 bg-gray-50 flex flex-col items-center w-full">
      <div className="bg-[#B795D4] text-white flex items-center justify-center text-center h-10 w-[90%] max-w-[800px]">
        <h2 className="text-base font-semibold">Established Artists Trends</h2>
      </div>
  
      {/* Trending Upwards Section */}
      <div className="w-[90%] max-w-[800px] mx-auto bg-white border border-gray-300 p-4 rounded-md shadow-md">
        <h3 className="text-base font-semibold mb-2 text-green-600 text-center">
          Top Established Artists Trending Up
        </h3>
        <div className="flex gap-4 lg:gap-6 overflow-x-auto px-4 snap-x snap-mandatory sm:justify-start md:justify-center">
          {upwardArtists.map((item, index) => (
            <div
              key={index}
              className="pb-1 flex-none w-[50%] sm:w-[30%] md:w-[20%] lg:w-[15%] bg-gray-100 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300 p-2 snap-start"
            >
              <h4 className="font-semibold text-sm text-center">{item?.artist || "N/A"}</h4>
              <p className="text-green-500 text-xs text-center font-medium">
                {item?.trending_percent ? `↑ ${item.trending_percent}%` : "N/A"}
              </p>
            </div>
          ))}
        </div>
      </div>
  
      {/* Trending Downwards Section */}
      <div className="w-[90%] max-w-[800px] mx-auto mt-5 bg-white border border-gray-300 p-4 rounded-md shadow-md">
        <h3 className="text-base font-semibold mb-2 text-red-600 text-center">
          Established Artists Trending Down
        </h3>
        <div className="flex gap-4 lg:gap-6 overflow-x-auto px-4 snap-x snap-mandatory sm:justify-start md:justify-center">
          {downwardArtists.map((item, index) => (
            <div
              key={index}
              className="pb-1 flex-none w-[50%] sm:w-[30%] md:w-[20%] lg:w-[15%] bg-gray-100 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300 p-2 snap-start"
            >
              <h4 className="font-semibold text-sm text-center">{item?.artist || "N/A"}</h4>
              <p className="text-red-500 text-xs text-center font-medium">
                {item?.trending_percent ? `↓ ${item.trending_percent}%` : "N/A"}
              </p>
              {/* {item.recovery_strategy && (
                <p className="text-xs text-center text-gray-800 mt-2 italic">
                  {item?.recovery_strategy || "N/A"}
                </p>
              )} */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
