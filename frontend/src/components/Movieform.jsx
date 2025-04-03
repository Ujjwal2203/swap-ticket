import { useLocation, useNavigate } from "react-router-dom";

const MovieForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const movie = location.state?.movie;

  const ticketsAvailable = false; // Hardcoded to "Not Available"

  if (!movie) {
    return <div className="text-center text-gray-600">No movie selected.</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-8">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-4xl w-full flex items-center gap-8">
        
        {/* Movie Image (Full Display) */}
        <div className="w-1/2 rounded-lg overflow-hidden shadow-md">
          <img
            src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
            alt={movie.title || movie.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Event Details */}
        <div className="w-1/2 flex flex-col justify-center text-left">
          <h1 className="text-4xl font-extrabold text-gray-800">{movie.title || movie.name}</h1>
          <p className="text-lg font-semibold text-gray-600 mt-2">
            📅 {new Date(movie.release_date || movie.first_air_date).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", year: "numeric" })}
          </p>

          {/* Ticket Availability Section (Disabled) */}
          <div className="mt-6 p-4 bg-gray-200 rounded-lg flex items-center justify-between">
            <span className="text-lg font-bold text-gray-700">❌ No Tickets Available</span>
            <button
              className="px-4 py-2 rounded-lg text-lg font-bold bg-gray-400 text-gray-700 cursor-not-allowed"
              disabled
            >
              Get Tickets
            </button>
          </div>

          {/* Sell Tickets Section */}
          <div className="mt-6 p-4 bg-red-100 rounded-lg flex flex-col items-center shadow-md">
            <span className="text-lg font-bold text-red-700">🎫 Got Tickets to Sell?</span>
            <p className="text-gray-700 text-center mt-2">List your tickets now and sell them fast.</p>
            <button
              className="mt-3 px-6 py-2 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition"
              onClick={() => navigate("/resell-tickets")}
            >
              Sell Tickets
            </button>
          </div>

          {/* Navigation Button */}
          <div className="mt-6">
            <button
              className="bg-gray-700 text-white px-8 py-3 rounded-full text-lg font-bold hover:bg-gray-900 transition"
              onClick={() => navigate(-1)}
            >
              🔙 Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieForm;
