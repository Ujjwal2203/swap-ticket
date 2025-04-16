import { useState, useEffect, useContext, createContext } from "react";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Create a context for persisting movie selection
export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <MovieContext.Provider value={{ selectedMovie, setSelectedMovie }}>
      {children}
    </MovieContext.Provider>
  );
};

const SearchBar = ({ onExpandChange }) => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate(); // React Router navigation
  const { setSelectedMovie } = useContext(MovieContext); // Access the movie context

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/trending/all/day?api_key=d44c90a7e9d0bf546cab4bb5b5cbdb90"
        );
        const data = await response.json();
        setMovies(data.results);
        setFilteredMovies(data.results.slice(0, 5));
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = movies
      .filter((movie) =>
        movie.title?.toLowerCase().includes(query) ||
        movie.name?.toLowerCase().includes(query)
      )
      .slice(0, 5);

    setFilteredMovies(filtered);
  };

  const handleExpand = () => {
    setIsExpanded(true);
    onExpandChange?.(true);
  };

  const handleClose = () => {
    setIsExpanded(false);
    setSearchQuery("");
    onExpandChange?.(false);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    navigate('/movie-form', { state: { movie } }); 
  };
  

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="relative">
        <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Find your next big event"
          value={searchQuery}
          onChange={handleSearch}
          onClick={handleExpand}
          className="w-full py-4 px-6 pl-14 pr-12 rounded-xl text-gray-800 focus:outline-none shadow-lg border-2 border-gray-300 transition-all duration-300 hover:border-gray-400 text-lg"
        />
        {isExpanded && (
          <button
            onClick={handleClose}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {isExpanded && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-xl rounded-lg z-[1000] max-h-60 overflow-y-auto">
          <div className="divide-y divide-gray-100">
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer rounded-lg"
                  onClick={() => handleMovieClick(movie)}
                >
                  <div className="flex flex-col items-center justify-center w-14 h-16 bg-gray-200 rounded-lg shadow-md">
                    <span className="text-xs font-bold text-gray-600">{new Date(movie.release_date || movie.first_air_date).toLocaleDateString("en-US", { month: "short" })}</span>
                    <span className="text-lg font-bold text-gray-900">{new Date(movie.release_date || movie.first_air_date).toLocaleDateString("en-US", { day: "numeric" })}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title || movie.name}
                      className="w-14 h-20 rounded-lg object-cover shadow-md"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{movie.title || movie.name}</h3>
                      <span className="text-sm font-bold text-gray-600">⭐ {movie.vote_average?.toFixed(1) || "N/A"}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">No movies found.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
