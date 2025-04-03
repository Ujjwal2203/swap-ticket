import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";

const ResellTickets = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const nextStep = () => {
    if (selectedMovie || currentStep >= 2) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => setCurrentStep((prev) => (prev > 1 ? prev - 1 : prev));

  return (
    <div className="min-h-screen pt-8 flex items-start justify-center bg-gradient-to-br from-gray-100 to-gray-50">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg">
        {/* Step Content */}
        <div className="pb-6">
          {currentStep === 1 && <Step1 setSelectedMovie={setSelectedMovie} />}
          {currentStep === 2 && <Step2 selectedMovie={selectedMovie} />}
          {currentStep === 3 && <Step3 />}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            className={`bg-gray-300 text-gray-700 px-6 py-3 rounded-full text-lg font-semibold transition ${
              currentStep === 1 ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
            }`}
            disabled={currentStep === 1}
          >
            Back
          </button>
          <button
            onClick={nextStep}
            className={`px-6 py-3 rounded-full text-lg font-semibold transition ${
              selectedMovie || currentStep >= 2
                ? "bg-pink-500 text-white hover:bg-pink-600 hover:scale-105"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!selectedMovie && currentStep < 2}
          >
            {currentStep === 3 ? "Next" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

const Step1 = ({ setSelectedMovie }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/trending/all/day?api_key=d44c90a7e9d0bf546cab4bb5b5cbdb90"
        );
        if (!response.ok) throw new Error(`API request failed with status ${response.status}`);

        const data = await response.json();
        if (data.results && data.results.length > 0) {
          setMovies(data.results);
          setFilteredMovies(data.results.slice(0, 5));
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setShowDropdown(true);

    if (query.length === 0) {
      setFilteredMovies(movies.slice(0, 5));
      return;
    }

    const filtered = movies
      .filter((movie) =>
        movie.title?.toLowerCase().includes(query) ||
        movie.name?.toLowerCase().includes(query)
      )
      .slice(0, 5);

    setFilteredMovies(filtered);
  };

  const handleMovieSelection = (movie) => {
    setSearchQuery(movie.title || movie.name);
    setSelectedMovie(movie);
    setShowDropdown(false);
  };

  return (
    <div className="animate-fadeIn">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Sell Your Tickets Fast</h1>

      {/* Search Bar */}
      <div className="relative mb-6" ref={dropdownRef}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for a movie..."
            value={searchQuery}
            onChange={handleSearch}
            onClick={() => setShowDropdown(true)}
            className="w-full py-4 px-6 pl-12 pr-12 rounded-xl text-gray-800 focus:outline-none shadow-lg border-2 border-gray-300 transition-all duration-300 hover:border-gray-400 text-lg"
          />
        </div>

        {showDropdown && (
          <div className="absolute w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-y-auto max-h-60 z-50">
            <div className="divide-y divide-gray-100">
              {filteredMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="flex items-center p-4 hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => handleMovieSelection(movie)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title || movie.name}
                    className="w-16 h-24 rounded-lg object-cover shadow-md"
                  />
                  <h3 className="ml-4 font-semibold">{movie.title || movie.name}</h3>
                  <span className="ml-auto text-gray-500">⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}

                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <ul className="space-y-4 mb-6">
        <li className="flex items-start space-x-4">
          <span className="w-8 h-8 flex items-center justify-center bg-pink-500 text-white text-lg font-bold rounded-full">
            1
          </span>
          <p className="text-base font-medium text-gray-700">
            Forward your ticket confirmation email.
          </p>
        </li>
        <li className="flex items-start space-x-4">
          <span className="w-8 h-8 flex items-center justify-center bg-pink-500 text-white text-lg font-bold rounded-full">
            2
          </span>
          <p className="text-base font-medium text-gray-700">
            Click{" "}
            <span className="font-semibold text-pink-500">
              "I've forwarded my tickets"
            </span>{" "}
            button.
          </p>
        </li>
        <li className="flex items-start space-x-4">
          <span className="w-8 h-8 flex items-center justify-center bg-pink-500 text-white text-lg font-bold rounded-full">
            3
          </span>
          <p className="text-base font-medium text-gray-700">
            Set your price and sell quickly.
          </p>
        </li>
      </ul>
      
      <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md">
        <span className="text-gray-600 font-medium">
          Want to organize an event?
        </span>
        <Link to="/create-event">
          <button className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-700 transition">
            Create Event
          </button>
        </Link>
      </div>
    </div>
    
  );
};


const Step2 = ({ selectedMovie }) => {
  return (
    <div className="animate-fadeIn">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800">Step 2: Confirm Details</h1>
      <p className="text-xl text-gray-600 text-center mb-6">Please confirm your ticket details before proceeding.</p>

      {selectedMovie ? (
        <div className="bg-gray-100 p-6 rounded-xl shadow-md flex items-center justify-between">
          {/* Movie Details on Left */}
          <div className="flex-1">
            <p className="text-lg text-gray-700 font-medium">🎬 Movie: {selectedMovie.title || selectedMovie.name}</p>
            <p className="text-lg text-gray-700 font-medium">📅 Release Date: {selectedMovie.release_date || selectedMovie.first_air_date}</p>
            <p className="text-lg text-gray-700 font-medium">⭐ Rating: {selectedMovie.vote_average?.toFixed(1) || "N/A"}</p>
          </div>

          {/* Movie Image on Right */}
          <div className="ml-6">
            <img
              src={`https://image.tmdb.org/t/p/w200${selectedMovie.poster_path}`}
              alt={selectedMovie.title || selectedMovie.name}
              className="w-40 h-60 rounded-xl shadow-lg object-cover"
            />
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No movie selected.</p>
      )}
    </div>
  );
};

const Step3 = () => {
  return (
    <div className="animate-fadeIn bg-white p-8 rounded-2xl shadow-md">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800">🎟 Step 3: Select Ticket Platform</h1>
      <p className="text-xl text-gray-600 text-center mb-8">Choose where you purchased your ticket.</p>

      {/* Ticket Platforms */}
      <div className="flex flex-col gap-6">
        <button className="flex items-center justify-between bg-gray-100 px-6 py-4 rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition">
          <span className="text-lg font-semibold text-gray-800">🎟 BookMyShow</span>
          <img src="https://assets-in.bmscdn.com/static/2021/09/logo.svg" alt="BookMyShow" className="w-16 h-16 rounded-lg shadow-sm"/>
        </button>

        <button className="flex items-center justify-between bg-gray-100 px-6 py-4 rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition">
          <span className="text-lg font-semibold text-gray-800">🎟 Paytm Insider</span>
          <img src="https://assets.paytm.com/images/catalog/view/307196/1617697750163.png" alt="Paytm Insider" className="w-16 h-16 rounded-lg shadow-sm"/>
        </button>

        <button className="flex items-center justify-between bg-gray-100 px-6 py-4 rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition">
          <span className="text-lg font-semibold text-gray-800">🎟 District</span>
          <img src="https://districts.ec.europa.eu/themes/custom/eudistrict/images/logo.svg" alt="District" className="w-16 h-16 rounded-lg shadow-sm"/>
        </button>
      </div>
    </div>
  );
};



export default ResellTickets;
