// import data from "../data/data.js";

export default function MediaProjects({projects}) {
  // const { mediaProjects } = data;

  const emerging_artists_for_film = projects?.[0]?.emerging_artists_for_film || [];
  const established_artists_for_film = projects?.[0]?.established_artists_for_film || [];

  return (
    <section className="ml-0 pt-6 pb-6 bg-gray-50 flex flex-col items-center w-full">
      <div className="bg-[#B795D4] text-white flex items-center justify-center text-center h-10 w-[90%] max-w-[800px]">
        <h2 className="text-base font-semibold">Recording Artists for Media Projects</h2>
      </div>
  
      {/* Established Artists for Film */}
      <div className="w-[90%] max-w-[800px] mx-auto bg-white border border-gray-300 p-4 rounded-md shadow-md mb-6">
        <h3 className="text-xs sm:text-sm md:text-base font-semibold mb-2 text-green-600 text-center">
          Established Recording Artists: Recommendations for Consideration - Music Placement in Upcoming Film & Television Productions with Anticipated Release in 18 to 24 Months
        </h3>
        <div className="flex gap-4 lg:gap-6 overflow-x-auto px-4 snap-x snap-mandatory sm:justify-start md:justify-center">
          {established_artists_for_film.map((item, index) => (
            <div
              key={index}
              className="flex-none w-[50%] sm:w-[30%] md:w-[20%] lg:w-[15%] bg-gray-100 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300 p-2 snap-start"
            >
              <h4 className="font-semibold text-sm text-center">{item.name}</h4>
              <p className="text-gray-500 text-xs text-center">
                Projected Growth: <span className="font-semibold">{item.projected_growth}</span>
              </p>
              <p className="text-gray-500 text-xs text-center">
                Genre: <span className="font-semibold">{item.genre}</span>
              </p>
              <p className="text-gray-500 text-xs text-center">
                Genre Compatibility: <span className="font-semibold">{item.genre_compatibility}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
  
      {/* Emerging Artists for Film */}
      <div className="w-[90%] max-w-[800px] mx-auto bg-white border border-gray-300 p-4 rounded-md shadow-md">
        <h3 className="text-xs sm:text-sm md:text-base font-semibold mb-2 text-green-600 text-center">
          Emerging Artists: Recommendations for Consideration - Music Placement in Upcoming Film & Television Productions with Anticipated Release in 18 to 24 Months
        </h3>
        <div className="flex gap-4 lg:gap-6 overflow-x-auto px-4 snap-x snap-mandatory sm:justify-start md:justify-center">
          {emerging_artists_for_film.map((item, index) => (
            <div
              key={index}
              className="flex-none w-[50%] sm:w-[30%] md:w-[20%] lg:w-[15%] bg-gray-100 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300 p-2 snap-start"
            >
              <h4 className="font-semibold text-sm text-center">{item.name}</h4>
              <p className="text-gray-500 text-xs text-center">
                Projected Growth: <span className="font-semibold">{item.projected_growth}</span>
              </p>
              <p className="text-gray-500 text-xs text-center">
                Genre: <span className="font-semibold">{item.genre}</span>
              </p>
              <p className="text-gray-500 text-xs text-center">
                Genre Compatibility: <span className="font-semibold">{item.genre_compatibility}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}