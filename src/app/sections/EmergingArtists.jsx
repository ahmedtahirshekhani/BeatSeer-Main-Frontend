// import data from '../data/data.js';

export default function EmergingArtists({artists}) {
  // if (!artists || !artists.top_5_emerging_artists) {
  //   return <p>No Emerging Artist Data available</p>;
  // }
  const EmergingArtists = artists || [];
  return (
    <section className="ml-0 pt-6 bg-gray-50 flex flex-col items-center w-full">
      <div className="bg-[#B795D4] text-white flex items-center justify-center text-center h-10 w-[90%] max-w-[800px]">
        <h2 className="text-base font-semibold">Top 5 Emerging Artists</h2>
      </div>
  
      <div className="w-[90%] max-w-[800px] mx-auto bg-white border border-gray-300 p-4 rounded-md shadow-md">
        <div className="flex gap-4 lg:gap-6 overflow-x-auto px-4 snap-x snap-mandatory sm:justify-start md:justify-center">
          {EmergingArtists.map((item, index) => (
            <div
              key={index}
              className="flex-none w-[50%] sm:w-[30%] md:w-[20%] lg:w-[15%] bg-gray-100 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300 p-2 snap-start"
            >
              {/* Uncomment and use if artist images are available */}
              {/* <img
                src={item?.image || "/placeholder.jpg"}
                alt={item?.artist || "N/A"}
                className="rounded-md mb-2 h-30 w-full object-cover"
              /> */}
  
              <h4 className="font-semibold text-sm text-center">{item?.artist || "N/A"}</h4>
  
              {/* Additional Stats */}
              <div className="mt-2 text-xs text-center text-gray-500 pb-1">
                <p><span className="font-semibold">Social Growth:</span> {item?.social_growth || "N/A"}%</p>
                <p><span className="font-semibold">Monthly Streams:</span> {item?.monthly_streams || "N/A"}</p>
                <p><span className="font-semibold">Platform Engagement:</span> {item?.engagement || "N/A"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
