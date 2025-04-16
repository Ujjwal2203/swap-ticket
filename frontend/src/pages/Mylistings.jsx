import React, { useContext } from "react";
import { MyListingsContext } from "../MyListingsContext";

const MyListings = () => {
  const { listings } = useContext(MyListingsContext); // ⬅️ Correct key

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">My Listed Tickets</h1>
      {listings.length === 0 ? (
        <p className="text-center text-gray-600">You have no tickets listed yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((ticket, index) => {
            const movie = ticket.movie || {};
            const posterPath = movie.poster_path;
            const title = movie.title || movie.name || "Untitled";

            return (
              <div
                key={index}
                className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center"
              >
                {posterPath ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w300${posterPath}`}
                    alt={title}
                    className="rounded-xl w-48 mb-4"
                  />
                ) : (
                  <div className="w-48 h-72 bg-gray-300 rounded-xl mb-4 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
                <h3 className="text-xl font-semibold text-center text-gray-800">{title}</h3>
                <p className="text-lg mt-2 text-gray-600">Price: {ticket.price} Rs.</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyListings;
